-- 예약관리 프로그램(verbloom-reserve)용 표
-- 모든 표는 잠가 두고(RLS), 예약관리 서버만 비밀 열쇠로 읽고 씁니다. 브라우저에서 직접 접근할 수 없습니다.

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  weekday smallint not null check (weekday between 0 and 6),
  time text not null check (time ~ '^(09|1[0-9]|20|21):00$'),
  fee integer not null check (fee between 1000 and 2000000 and fee % 1000 = 0),
  payment_pref text not null default 'single' check (payment_pref in ('single', 'package')),
  active boolean not null default true,
  reminder_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (name, phone)
);

-- 정기 예약 중 "이번 회기만" 바뀐 것 (변경 또는 취소)
create table public.session_exceptions (
  session_id text primary key,               -- 내담자ID|원래날짜
  client_id uuid not null references public.clients (id) on delete cascade,
  origin text not null,
  status text not null check (status in ('active', 'cancelled')),
  date text,
  time text,
  updated_at timestamptz not null default now()
);
-- 같은 시간으로 두 사람이 동시에 옮기지 못하게 막습니다.
create unique index session_exceptions_one_per_slot
  on public.session_exceptions (date, time)
  where status = 'active' and date is not null;

-- 관리자가 열어 둔 "변경 가능" 시간
create table public.public_slots (
  id uuid primary key default gen_random_uuid(),
  date text not null,
  time text not null check (time ~ '^(09|1[0-9]|20|21):00$'),
  created_at timestamptz not null default now(),
  unique (date, time)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  type text not null check (type in ('single', 'package')),
  amount integer not null,
  status text not null check (status in ('paid', 'refunded')),
  at timestamptz not null default now()
);

-- 결제 1회분 = 이용권 1장
create table public.credits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  kind text not null check (kind in ('single', 'package')),
  value integer not null,
  source_payment_id uuid not null references public.payments (id) on delete cascade,
  status text not null check (status in ('available', 'used', 'refunded')),
  paid_at timestamptz not null,
  valid_from text,
  used_at timestamptz,
  session_id text,
  refund_at timestamptz
);

create table public.session_completions (
  session_id text primary key,
  credit_id uuid references public.credits (id) on delete set null,
  at timestamptz not null default now()
);

create table public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('change', 'cancel', 'payment', 'refund')),
  client_id uuid not null references public.clients (id) on delete cascade,
  title text not null,
  detail text not null,
  at timestamptz not null default now(),
  read_at timestamptz,
  session_id text,
  session_date text,
  payment_id uuid
);

create table public.reminder_logs (
  key text primary key,
  name text not null,
  h integer not null,
  date text not null,
  time text not null,
  at timestamptz not null default now(),
  type text not null
);

-- 설정은 한 줄만 둡니다.
create table public.reserve_settings (
  id smallint primary key default 1 check (id = 1),
  default_fee integer not null default 70000,
  reminder_mode text not null default 'both26' check (reminder_mode in ('both26', 'both25', '26', '25', '3', 'off'))
);
insert into public.reserve_settings (id) values (1);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor text not null,
  kind text not null,
  info text not null,
  at timestamptz not null default now()
);

-- 내담자 로그인 유지(최대 30일). 열쇠 자체는 저장하지 않고 해시만 저장합니다.
create table public.client_logins (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);

alter table public.clients enable row level security;
alter table public.session_exceptions enable row level security;
alter table public.public_slots enable row level security;
alter table public.payments enable row level security;
alter table public.credits enable row level security;
alter table public.session_completions enable row level security;
alter table public.admin_notifications enable row level security;
alter table public.reminder_logs enable row level security;
alter table public.reserve_settings enable row level security;
alter table public.audit_logs enable row level security;
alter table public.client_logins enable row level security;
