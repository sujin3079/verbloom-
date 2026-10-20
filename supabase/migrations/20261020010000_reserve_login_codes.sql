-- 예약관리 내담자 문자 인증번호. 번호 자체는 저장하지 않고 해시만 저장합니다.
create table public.login_codes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  code_hash text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  attempts smallint not null default 0,
  used_at timestamptz
);
create index login_codes_client_recent on public.login_codes (client_id, created_at desc);

alter table public.login_codes enable row level security;
