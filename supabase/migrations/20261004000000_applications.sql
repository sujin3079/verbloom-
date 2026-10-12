-- 상담신청서 저장용 표

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text,
  answers jsonb not null
);

-- 홈페이지 방문자는 "새 신청서 넣기"만 할 수 있고, 읽기·수정·삭제는 할 수 없습니다.
alter table public.applications enable row level security;

create policy "누구나 신청서를 제출할 수 있음"
  on public.applications
  for insert
  to anon
  with check (true);
