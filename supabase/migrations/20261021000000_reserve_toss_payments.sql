-- 예약관리 토스페이먼츠 카드 결제
-- 결제창을 열기 전에 서버가 주문(금액)을 먼저 만들어 두고, 결제 후 금액이 같을 때만 승인합니다.
create table public.payment_orders (
  order_id text primary key,
  client_id uuid not null references public.clients (id) on delete cascade,
  type text not null check (type in ('single', 'package')),
  count smallint not null,
  unit_fee integer not null,
  amount integer not null,
  valid_from text,
  status text not null default 'pending' check (status in ('pending', 'confirming', 'paid', 'failed')),
  payment_id uuid references public.payments (id),
  created_at timestamptz not null default now()
);
alter table public.payment_orders enable row level security;

-- 기존 결제 기록에 토스 결제 정보를 붙입니다. (provider: demo = 예전 시연 결제)
alter table public.payments
  add column provider text not null default 'demo' check (provider in ('demo', 'toss')),
  add column payment_key text unique,
  add column order_id text,
  add column method text,
  add column receipt_url text;
