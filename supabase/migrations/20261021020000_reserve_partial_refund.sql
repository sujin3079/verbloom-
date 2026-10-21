-- 예약관리: 선결제 중도 해지 시 남은 회기만큼 부분 환불한 금액을 기록합니다.
alter table public.payments add column refunded_amount integer not null default 0;
