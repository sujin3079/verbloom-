import { createHmac, randomBytes } from "node:crypto";

/*
  새 상담신청서 알림톡 보내기
  Supabase(applications 표에 새 줄이 생길 때) → 이 주소로 신호 → 솔라피로 상담사에게 알림톡 발송
  승인된 템플릿의 칸 이름(#{이름} 등)과 정확히 같아야 발송됩니다.
*/

type Answers = {
  info?: { age?: string; sex?: string };
  radio?: Record<string, { val?: string; extra?: string }>;
  list?: Record<string, string[]>;
  text?: Record<string, string>;
};

type Application = {
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  answers: Answers;
};

// 빈 칸은 "-"로, 긴 글은 잘라서 알림톡 길이 제한(1,000자)을 넘지 않게 합니다.
const show = (v: string | undefined | null, max = 80) => {
  const s = (v ?? "").trim();
  if (!s) return "-";
  return s.length > max ? `${s.slice(0, max)}…` : s;
};
const join = (v: string[] | undefined) => show((v ?? []).filter(Boolean).join(", "));
const digits = (v: string | undefined) => (v ?? "").replace(/\D/g, "");

function variables(r: Application) {
  const a = r.answers ?? {};
  const radio = a.radio ?? {};
  const list = a.list ?? {};
  const text = a.text ?? {};
  const hard = list.hard ?? [];
  const kids = radio.kids?.val ? `${radio.kids.val}${radio.kids.extra ? ` (${radio.kids.extra})` : ""}` : "";
  const time = [
    (list["time-days"] ?? []).join(", "),
    (list["time-slots"] ?? []).join(", "),
    text.time ? `메모: ${text.time}` : "",
  ]
    .filter(Boolean)
    .join(" / ");

  return {
    "#{접수시각}": new Date(r.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    "#{이름}": show(r.name),
    "#{나이}": show(a.info?.age),
    "#{성별}": show(a.info?.sex),
    "#{연락처}": show(r.phone),
    "#{이메일}": show(r.email),
    "#{희망시간}": show(time, 120),
    "#{직업}": show(radio.job?.val),
    "#{결혼}": show(radio.marry?.val),
    "#{자녀}": show(kids),
    "#{이전경험}": join(list.prev),
    "#{주제}": join(list.reason),
    "#{신청이유}": show(text.reason),
    "#{기대}": show(text.expect),
    "#{정서}": show(hard[0]),
    "#{생활}": show(hard[1]),
    "#{관계}": show(hard[2]),
    "#{안전확인}": show(radio.safe?.val),
    "#{키워드}": join(list.kw),
    "#{추가}": show(text.more),
  };
}

// 솔라피 인증: HMAC-SHA256(시크릿, 시각 + 임의 문자열)
function solapiAuth() {
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", process.env.SOLAPI_API_SECRET ?? "")
    .update(date + salt)
    .digest("hex");
  return `HMAC-SHA256 apiKey=${process.env.SOLAPI_API_KEY}, date=${date}, salt=${salt}, signature=${signature}`;
}

export async function POST(request: Request) {
  // Supabase 웹훅에 넣은 암호가 맞을 때만 보냅니다.
  if (!process.env.NOTIFY_WEBHOOK_SECRET || request.headers.get("x-webhook-secret") !== process.env.NOTIFY_WEBHOOK_SECRET) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { type?: string; table?: string; record?: Application };
  if (body.type !== "INSERT" || body.table !== "applications" || !body.record) {
    return Response.json({ ok: true, skipped: true });
  }

  const res = await fetch("https://api.solapi.com/messages/v4/send-many/detail", {
    method: "POST",
    headers: { Authorization: solapiAuth(), "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          to: digits(process.env.COUNSELOR_PHONE),
          from: digits(process.env.SOLAPI_SENDER),
          kakaoOptions: {
            pfId: process.env.SOLAPI_PFID,
            templateId: process.env.SOLAPI_TEMPLATE_ID,
            variables: variables(body.record),
          },
        },
      ],
    }),
  });

  const result = (await res.json().catch(() => ({}))) as { failedMessageList?: unknown[] };
  if (!res.ok || (result.failedMessageList?.length ?? 0) > 0) {
    console.error("알림톡 발송 실패", res.status, JSON.stringify(result));
    return Response.json({ ok: false, status: res.status, result }, { status: 502 });
  }
  return Response.json({ ok: true });
}
