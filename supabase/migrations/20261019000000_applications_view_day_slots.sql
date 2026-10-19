-- 상담 가능 시간을 요일별로 받도록 바뀌어서, 보기용 표의 시간 칸을 "요일별 가능한 시간"으로 바꿉니다.
drop view if exists public.applications_view;

create view public.applications_view
with (security_invoker = true) as
select
  created_at                                                                  as "신청일시",
  name                                                                        as "이름",
  answers->'info'->>'age'                                                     as "나이",
  answers->'info'->>'sex'                                                     as "성별",
  phone                                                                       as "연락처",
  email                                                                       as "이메일",
  (select string_agg(d || ' ' || array_to_string(array(select jsonb_array_elements_text(
            coalesce(answers->'list'->('time-' || d), answers->'list'->'time-slots', '[]'::jsonb))), ', '), ' / ')
     from jsonb_array_elements_text(coalesce(answers->'list'->'time-days', '[]'::jsonb)) as d)
                                                                              as "요일별 가능한 시간",
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
