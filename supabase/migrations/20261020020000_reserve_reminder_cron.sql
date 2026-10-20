-- 예약관리 알림 문자 자동 발송: 10분마다 예약관리 서버를 불러 보낼 문자가 있는지 확인합니다.
-- 호출용 비밀 문구는 Vault의 'reserve_cron_secret'에 따로 저장되어 있습니다(이 파일에는 넣지 않습니다).
create extension if not exists pg_cron;

select cron.schedule(
  'reserve-reminders',
  '*/10 * * * *',
  $$
  select net.http_post(
    url := 'https://reserve.verbloom.co.kr/api/cron/reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'reserve_cron_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $$
);
