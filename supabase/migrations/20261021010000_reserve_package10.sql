-- 예약관리: 10회기 선결제 추가 + 10회기 할인율(%) 설정 (기본 0% = 할인 없음)
alter table public.clients drop constraint clients_payment_pref_check,
  add constraint clients_payment_pref_check check (payment_pref in ('single', 'package', 'package10'));
alter table public.payments drop constraint payments_type_check,
  add constraint payments_type_check check (type in ('single', 'package', 'package10'));
alter table public.credits drop constraint credits_kind_check,
  add constraint credits_kind_check check (kind in ('single', 'package', 'package10'));
alter table public.payment_orders drop constraint payment_orders_type_check,
  add constraint payment_orders_type_check check (type in ('single', 'package', 'package10'));

alter table public.reserve_settings
  add column package10_discount integer not null default 0 check (package10_discount between 0 and 50);
