-- 상담신청서 답변을 항목별 칸으로 펼쳐 보는 표 (보기 전용)
-- 원래 applications 표는 그대로 두고, 답변(answers)을 문항마다 칸으로 나눠 보여 줍니다.
-- security_invoker: 홈페이지 방문자는 이 표도 읽을 수 없습니다 (원래 표의 보안 규칙을 그대로 따름).

create or replace view public.applications_view
with (security_invoker = true) as
select
  created_at                                                                  as "신청일시",
  name                                                                        as "이름",
  answers->'info'->>'age'                                                     as "나이",
  answers->'info'->>'sex'                                                     as "성별",
  phone                                                                       as "연락처",
  email                                                                       as "이메일",
  array_to_string(array(select jsonb_array_elements_text(answers->'list'->'time-days')), ', ')  as "가능한 요일",
  array_to_string(array(select jsonb_array_elements_text(answers->'list'->'time-slots')), ', ') as "가능한 시간대",
  answers->'text'->>'time'                                                    as "시간 관련 메모",
  answers->'radio'->'job'->>'val'                                             as "직업 상태",
  answers->'radio'->'marry'->>'val'                                           as "결혼 상태",
  answers->'radio'->'kids'->>'val'                                            as "자녀",
  answers->'radio'->'kids'->>'extra'                                          as "자녀 나이",
  array_to_string(array(select jsonb_array_elements_text(answers->'list'->'prev')), ', ')       as "이전 서비스 이용",
  array_to_string(array(select jsonb_array_elements_text(answers->'list'->'reason')), ', ')     as "다루고 싶은 주제",
  answers->'text'->>'reason'                                                  as "신청 이유",
  answers->'text'->>'expect'                                                  as "기대하는 도움",
  answers->'list'->'hard'->>0                                                 as "어려움: 정서",
  answers->'list'->'hard'->>1                                                 as "어려움: 생활",
  answers->'list'->'hard'->>2                                                 as "어려움: 관계",
  answers->'radio'->'safe'->>'val'                                            as "안전 확인 (최근 2주)",
  array_to_string(array(select jsonb_array_elements_text(answers->'list'->'kw')), ', ')         as "나를 표현하는 단어",
  answers->'text'->>'more'                                                    as "더 하고 싶은 이야기",
  id
from public.applications
order by created_at desc;

revoke all on public.applications_view from anon, authenticated;
