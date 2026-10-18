import {
  type ApplicationRow,
  clientVariables,
  counselorVariables,
  isAuthorized,
  normalizePhone,
  solapiAuthHeader,
} from "../../../lib/notify";

/*
  Supabase의 "applications" 표에 신청서가 새로 저장되면 Supabase가 이 주소로 알려 줍니다.
  알림톡 2통을 보냅니다: ① 상담사에게 신청서 내용, ② 내담자에게 접수 완료 안내.
  필요한 값은 모두 Vercel의 Environment Variables에 있습니다.
*/

const ENV_NAMES = [
  "NOTIFY_WEBHOOK_SECRET",
  "SOLAPI_API_KEY",
  "SOLAPI_API_SECRET",
  "SOLAPI_PFID",
  "SOLAPI_TEMPLATE_COUNSELOR",
  "SOLAPI_TEMPLATE_CLIENT",
  "SOLAPI_SENDER",
  "COUNSELOR_PHONE",
] as const;

export async function POST(request: Request) {
  const missing = ENV_NAMES.filter((n) => !process.env[n]);
  if (missing.length) {
    // 빠진 이름은 Vercel 로그에만 남기고, 밖에는 알리지 않습니다.
    console.error("알림톡 설정이 빠져 있습니다", { missing });
    return Response.json({ ok: false }, { status: 500 });
  }
  const env = Object.fromEntries(ENV_NAMES.map((n) => [n, process.env[n] as string])) as Record<(typeof ENV_NAMES)[number], string>;

  if (!isAuthorized(request.headers.get("authorization"), env.NOTIFY_WEBHOOK_SECRET)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  let payload: { type?: string; table?: string; record?: ApplicationRow };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "잘못된 요청" }, { status: 400 });
  }
  if (payload.type !== "INSERT" || payload.table !== "applications" || !payload.record) {
    return Response.json({ ok: true, skipped: true });
  }
  const row = payload.record;

  const counselorTo = normalizePhone(env.COUNSELOR_PHONE);
  if (!counselorTo) {
    return Response.json({ ok: false, error: "COUNSELOR_PHONE 형식 오류" }, { status: 500 });
  }
  const clientTo = normalizePhone(row.answers?.info?.tel ?? row.phone);

  const messages = [
    {
      to: counselorTo,
      from: env.SOLAPI_SENDER,
      kakaoOptions: { pfId: env.SOLAPI_PFID, templateId: env.SOLAPI_TEMPLATE_COUNSELOR, variables: counselorVariables(row) },
    },
    ...(clientTo
      ? [
          {
            to: clientTo,
            from: env.SOLAPI_SENDER,
            kakaoOptions: { pfId: env.SOLAPI_PFID, templateId: env.SOLAPI_TEMPLATE_CLIENT, variables: clientVariables(row) },
          },
        ]
      : []),
  ];

  const res = await fetch("https://api.solapi.com/messages/v4/send-many/detail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: solapiAuthHeader(env.SOLAPI_API_KEY, env.SOLAPI_API_SECRET),
    },
    body: JSON.stringify({ messages }),
  });
  const body = (await res.json().catch(() => ({}))) as {
    groupInfo?: { count?: { total?: number; registeredFailed?: number } };
    failedMessageList?: { statusCode?: string; statusMessage?: string }[];
    errorCode?: string;
    errorMessage?: string;
  };

  // 내담자 이름·연락처 같은 개인정보는 로그에 남기지 않습니다.
  if (!res.ok || body.errorCode || body.failedMessageList?.length) {
    console.error("알림톡 발송 실패", {
      http: res.status,
      errorCode: body.errorCode,
      errorMessage: body.errorMessage,
      failed: body.failedMessageList?.map((f) => ({ code: f.statusCode, message: f.statusMessage })),
    });
    return Response.json({ ok: false, clientSkipped: !clientTo }, { status: 502 });
  }
  return Response.json({ ok: true, sent: messages.length, clientSkipped: !clientTo });
}
