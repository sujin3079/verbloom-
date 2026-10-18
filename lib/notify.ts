import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/* 상담신청서가 저장되면 알림톡 2통(상담사용·내담자용)을 만들어 솔라피로 보냅니다. */

export type Applicant = {
  info?: { name?: string; age?: string; sex?: string; tel?: string; mail?: string };
  radio?: Record<string, { val?: string; extra?: string }>;
  list?: Record<string, string[]>;
  text?: Record<string, string>;
};

export type ApplicationRow = {
  created_at?: string;
  name?: string;
  phone?: string;
  email?: string;
  answers?: Applicant;
};

// 알림톡 본문은 변수가 채워진 뒤 전체 1,000자를 넘을 수 없어서, 직접 쓴 글은 앞부분만 보냅니다.
const LONG_TEXT_MAX = 70;
const MEMO_MAX = 60;

const dash = (v: string | undefined | null) => (v && v.trim() ? v.trim() : "-");

function oneLine(v: string | undefined, max: number): string {
  const t = (v ?? "").replace(/\s+/g, " ").trim();
  if (!t) return "-";
  return t.length > max ? `${t.slice(0, max)}…(이하 생략)` : t;
}

const cap = (v: string, max: number) => (v.length > max ? `${v.slice(0, max)}…` : v);

const join = (arr: string[] | undefined) => (arr && arr.length ? arr.join(", ") : "-");

export function formatKst(iso: string | undefined): string {
  const d = iso ? new Date(iso) : new Date();
  const date = Number.isNaN(d.getTime()) ? new Date() : d;
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/** 템플릿 ① (상담사가 받는 알림톡)의 #{빈칸} 값들 */
export function counselorVariables(row: ApplicationRow): Record<string, string> {
  const a = row.answers ?? {};
  const info = a.info ?? {};
  const r = a.radio ?? {};
  const l = a.list ?? {};
  const t = a.text ?? {};
  const kids = r.kids?.val ? `${r.kids.val}${r.kids.extra?.trim() ? ` (${cap(r.kids.extra.trim(), 20)})` : ""}` : "-";
  const days = join(l["time-days"]);
  const slots = join(l["time-slots"]);
  const memo = t["time"]?.trim() ? `\n메모: ${oneLine(t["time"], MEMO_MAX)}` : "";
  const hard = l["hard"] ?? [];

  const v: Record<string, string> = {
    접수시각: formatKst(row.created_at),
    이름: cap(dash(info.name ?? row.name), 20),
    나이: dash(info.age),
    성별: dash(info.sex),
    연락처: cap(dash(info.tel ?? row.phone), 20),
    이메일: cap(dash(info.mail ?? row.email), 40),
    희망시간: `${days} / ${slots}${memo}`,
    직업: dash(r.job?.val),
    결혼: dash(r.marry?.val),
    자녀: kids,
    이전경험: join(l["prev"]),
    주제: join(l["reason"]),
    신청이유: oneLine(t["reason"], LONG_TEXT_MAX),
    기대: oneLine(t["expect"], LONG_TEXT_MAX),
    정서: dash(hard[0]),
    생활: dash(hard[1]),
    관계: dash(hard[2]),
    안전확인: dash(r.safe?.val),
    키워드: join(l["kw"]),
    추가: oneLine(t["more"], LONG_TEXT_MAX),
  };
  // 알림톡 변수는 "#{이름}" 모양의 키로 보냅니다.
  return Object.fromEntries(Object.entries(v).map(([k, val]) => [`#{${k}}`, val]));
}

/** 템플릿 ② (내담자가 받는 알림톡)의 #{빈칸} 값들 */
export function clientVariables(row: ApplicationRow): Record<string, string> {
  return { "#{이름}": cap(dash(row.answers?.info?.name ?? row.name), 20) };
}

/** 휴대폰 번호에서 숫자만 남기고, 국내 휴대폰 번호(01로 시작 10~11자리)가 아니면 null */
export function normalizePhone(raw: string | undefined): string | null {
  const d = (raw ?? "").replace(/\D/g, "");
  const n = d.startsWith("82") ? `0${d.slice(2)}` : d;
  return /^01[016789]\d{7,8}$/.test(n) ? n : null;
}

/** 솔라피 인증 헤더 (HMAC-SHA256) */
export function solapiAuthHeader(apiKey: string, apiSecret: string, now = new Date(), salt = randomBytes(16).toString("hex")): string {
  const date = now.toISOString();
  const signature = createHmac("sha256", apiSecret).update(date + salt).digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

/** 홈페이지가 아닌 Supabase가 보낸 요청인지 확인 (미리 정해 둔 비밀 문구와 비교) */
export function isAuthorized(header: string | null, secret: string): boolean {
  const expected = Buffer.from(`Bearer ${secret}`);
  const got = Buffer.from(header ?? "");
  return got.length === expected.length && timingSafeEqual(got, expected);
}
