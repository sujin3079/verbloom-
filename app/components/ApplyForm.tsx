"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DoneArt } from "./Art";

/* 상담신청서 (시제품: 실제로 전송되거나 저장되지 않습니다) */

type Question =
  | { id: string; title: string; help?: string; type: "info" }
  | { id: string; title: string; help?: string; type: "radio"; opts: string[]; extra?: { when: string; label: string } }
  | { id: string; title: string; help?: string; type: "check"; opts: string[] }
  | { id: string; title: string; help?: string; type: "kw"; opts: string[]; max: number }
  | { id: string; title: string; help?: string; type: "topics"; opts: string[] }
  | { id: string; title: string; help?: string; type: "text"; ph?: string }
  | { id: string; title: string; help?: string; type: "scale"; rows: string[]; opts: string[] };

const Q: Question[] = [
  { id: "info", title: "신청자 정보를 알려 주세요.", help: "이름은 꼭 적어 주세요. 나머지는 상담 안내를 위해 사용합니다.", type: "info" },
  { id: "job", title: "현재 직업 상태는 어떠신가요?", type: "radio", opts: ["학생", "직장인", "자영업", "구직 중", "가사", "기타"] },
  { id: "marry", title: "결혼 상태를 알려 주세요.", type: "radio", opts: ["미혼", "기혼", "이혼·별거", "사별", "답하지 않음"] },
  { id: "kids", title: "자녀가 있으신가요?", type: "radio", opts: ["없음", "있음"], extra: { when: "있음", label: "자녀 나이 (예: 7세, 12세)" } },
  { id: "prev", title: "이전에 심리·정신건강 서비스를 이용해 보신 적이 있나요?", help: "해당하는 것을 모두 골라 주세요.", type: "check", opts: ["없음", "심리상담", "정신건강의학과 진료", "심리검사", "기타"] },
  { id: "reason", title: "상담을 신청하신 이유를 알려 주세요.", type: "topics", opts: ["불안·우울", "자존감", "대인관계", "부부·가족", "자녀 양육", "진로·학업", "기타"] },
  { id: "expect", title: "상담을 통해 어떤 도움을 기대하시나요?", type: "text", ph: "예: 내 마음을 더 잘 이해하고 싶어요." },
  { id: "hard", title: "요즘 어려움이 어느 정도인가요?", help: "각 영역에서 가장 가까운 것을 골라 주세요.", type: "scale", rows: ["정서 (기분, 불안, 걱정)", "생활 (잠, 식사, 일·학업)", "관계 (가족, 친구, 동료)"], opts: ["없음", "조금", "보통", "많이", "매우 많이"] },
  { id: "safe", title: "최근 2주 동안, 죽고 싶다거나 스스로를 해치고 싶다는 생각이 든 적이 있나요?", help: "솔직하게 답해 주셔도 괜찮습니다. 안전하게 상담을 준비하기 위한 문항입니다.", type: "radio", opts: ["없음", "가끔 있음", "자주 있음"] },
  { id: "kw", title: "지금의 나를 표현하는 단어를 골라 주세요.", help: "세 개까지 고를 수 있습니다.", type: "kw", opts: ["지친", "불안한", "외로운", "답답한", "예민한", "무기력한", "열심히 사는", "다시 시작하고 싶은", "잘 모르겠는"], max: 3 },
  { id: "more", title: "더 하고 싶은 이야기가 있다면 자유롭게 적어 주세요.", type: "text", ph: "선택 사항입니다." },
];

type Info = { name: string; age: string; sex: string; tel: string; mail: string };
type Answers = {
  info: Info;
  radio: Record<string, { val: string; extra: string }>;
  list: Record<string, string[]>;
  text: Record<string, string>;
};

const EMPTY: Answers = {
  info: { name: "", age: "", sex: "", tel: "", mail: "" },
  radio: {},
  list: {},
  text: {},
};

function Opts({
  type,
  name,
  opts,
  selected,
  onToggle,
}: {
  type: "radio" | "checkbox";
  name: string;
  opts: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="opts">
      {opts.map((o) => (
        <label className="opt" key={o}>
          <input type={type} name={name} value={o} checked={selected.includes(o)} onChange={() => onToggle(o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );
}

export default function ApplyForm() {
  const [step, setStep] = useState(-1); // -1: 동의 화면
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [a, setA] = useState<Answers>(EMPTY);
  const formRef = useRef<HTMLFormElement>(null);
  const shown = useRef("-1:false");

  // 문항이 바뀌면 신청서 맨 위가 보이도록 올려 줍니다.
  useEffect(() => {
    const key = `${step}:${done}`;
    if (shown.current === key) return;
    shown.current = key;
    formRef.current?.scrollIntoView({ block: "start" });
  }, [step, done]);

  const setInfo = (k: keyof Info, v: string) => setA((p) => ({ ...p, info: { ...p.info, [k]: v } }));
  const setRadio = (id: string, patch: Partial<{ val: string; extra: string }>) =>
    setA((p) => ({ ...p, radio: { ...p.radio, [id]: { ...(p.radio[id] ?? { val: "", extra: "" }), ...patch } } }));
  const setText = (id: string, v: string) => setA((p) => ({ ...p, text: { ...p.text, [id]: v } }));
  const toggleList = (id: string, v: string, max?: number) => {
    const cur = a.list[id] ?? [];
    if (cur.includes(v)) {
      setErr("");
      setA((p) => ({ ...p, list: { ...p.list, [id]: cur.filter((x) => x !== v) } }));
    } else if (max && cur.length >= max) {
      setErr(`최대 ${max}개까지 고를 수 있습니다.`);
    } else {
      setA((p) => ({ ...p, list: { ...p.list, [id]: [...cur, v] } }));
    }
  };
  const setScale = (id: string, row: number, v: string, rows: number) => {
    const cur = a.list[id] ?? Array(rows).fill("");
    setA((p) => ({ ...p, list: { ...p.list, [id]: cur.map((x, i) => (i === row ? v : x)) } }));
  };

  if (done) {
    return (
      <form className="panel" ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="done">
          <DoneArt />
          <h2>상담신청서 작성이 완료되었습니다.</h2>
          <p style={{ color: "var(--ink-soft)" }}>작성해 주셔서 고맙습니다.</p>
          <p className="note">
            지금 보고 계신 신청서는 시제품입니다. 입력하신 내용은 실제로 전송되거나 저장되지 않습니다.
          </p>
          <div className="nav-btns" style={{ justifyContent: "center" }}>
            <button className="btn ghost" type="button" onClick={() => { setDone(false); setStep(Q.length - 1); }}>
              답변 다시 보기
            </button>
            <Link className="btn" href="/">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </form>
    );
  }

  if (step < 0) {
    return (
      <form className="panel" ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
        <h2 style={{ fontSize: "var(--s2)" }}>시작하기 전에</h2>
        <p className="help" style={{ color: "var(--ink-soft)", marginTop: 6 }}>
          상담 준비를 위해 아래 정보를 받습니다. 읽어 보시고 동의해 주세요.
        </p>
        <div className="consent" style={{ marginTop: 18 }} tabIndex={0}>
          <p>
            <strong>개인정보 및 민감정보 수집·이용 안내 (초안)</strong>
          </p>
          <p>수집 항목: 이름, 나이, 성별, 연락처, 이메일, 상담 신청 이유와 현재 어려움에 관한 내용</p>
          <p>이용 목적: 상담 신청 확인, 초기상담 준비, 상담 일정 안내</p>
          <p>보관 기간과 파기 방법, 접근 권한은 정식 운영 전에 확정해 안내할 예정입니다.</p>
          <p>동의하지 않으실 수 있으며, 동의하지 않으면 신청서를 작성할 수 없습니다.</p>
        </div>
        <label className="check">
          <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErr(""); }} />
          <span>위 내용을 읽었고, 개인정보 및 민감정보 수집·이용에 동의합니다.</span>
        </label>
        {err && <p className="err">{err}</p>}
        <div className="nav-btns">
          <span />
          <button
            className="btn"
            type="button"
            onClick={() => {
              if (!agree) return setErr("동의해 주셔야 시작할 수 있습니다.");
              setErr("");
              setStep(0);
            }}
          >
            시작하기 →
          </button>
        </div>
      </form>
    );
  }

  const q = Q[step];
  const pct = Math.round(((step + 1) / Q.length) * 100);
  const last = step === Q.length - 1;
  const radio = a.radio[q.id];

  const next = () => {
    if (q.type === "info" && !a.info.name.trim()) {
      setErr("이름을 적어 주세요.");
      formRef.current?.querySelector<HTMLInputElement>("#f-name")?.focus();
      return;
    }
    setErr("");
    if (last) setDone(true);
    else setStep(step + 1);
  };

  return (
    <form className="panel" ref={formRef} noValidate onSubmit={(e) => e.preventDefault()}>
      <div className="progress">
        <span>
          {step + 1} / {Q.length}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="q">
        <h2>{q.title}</h2>
        {q.help && <p className="help">{q.help}</p>}

        {q.type === "info" && (
          <div className="fields">
            <label className="f">
              이름 *
              <input type="text" id="f-name" value={a.info.name} onChange={(e) => setInfo("name", e.target.value)} autoComplete="name" />
            </label>
            <div className="two">
              <label className="f">
                나이 (만)
                <input type="number" min={0} max={120} value={a.info.age} onChange={(e) => setInfo("age", e.target.value)} />
              </label>
              <label className="f">
                성별
                <select value={a.info.sex} onChange={(e) => setInfo("sex", e.target.value)}>
                  <option value="">선택</option>
                  <option>여성</option>
                  <option>남성</option>
                  <option>답하지 않음</option>
                </select>
              </label>
            </div>
            <div className="two">
              <label className="f">
                연락처
                <input type="tel" value={a.info.tel} onChange={(e) => setInfo("tel", e.target.value)} autoComplete="tel" />
              </label>
              <label className="f">
                이메일
                <input type="email" value={a.info.mail} onChange={(e) => setInfo("mail", e.target.value)} autoComplete="email" />
              </label>
            </div>
          </div>
        )}

        {q.type === "radio" && (
          <div className="fields">
            <Opts type="radio" name={q.id} opts={q.opts} selected={radio?.val ? [radio.val] : []} onToggle={(v) => setRadio(q.id, { val: v })} />
            {q.extra && radio?.val === q.extra.when && (
              <label className="f">
                {q.extra.label}
                <input type="text" value={radio.extra} onChange={(e) => setRadio(q.id, { extra: e.target.value })} />
              </label>
            )}
          </div>
        )}

        {(q.type === "check" || q.type === "kw") && (
          <div className="fields">
            <Opts
              type="checkbox"
              name={q.id}
              opts={q.opts}
              selected={a.list[q.id] ?? []}
              onToggle={(v) => toggleList(q.id, v, q.type === "kw" ? q.max : undefined)}
            />
          </div>
        )}

        {q.type === "topics" && (
          <div className="fields">
            <p style={{ fontSize: "var(--s-1)", color: "var(--ink-soft)" }}>다루고 싶은 주제 (여러 개 고를 수 있어요)</p>
            <Opts type="checkbox" name={q.id} opts={q.opts} selected={a.list[q.id] ?? []} onToggle={(v) => toggleList(q.id, v)} />
            <label className="f">
              신청하게 된 이유를 짧게 적어 주세요
              <textarea value={a.text[q.id] ?? ""} onChange={(e) => setText(q.id, e.target.value)} />
            </label>
          </div>
        )}

        {q.type === "text" && (
          <div className="fields">
            <textarea aria-label={q.title} placeholder={q.ph} value={a.text[q.id] ?? ""} onChange={(e) => setText(q.id, e.target.value)} />
          </div>
        )}

        {q.type === "scale" && (
          <div className="fields scale">
            {q.rows.map((r, i) => (
              <div className="row" role="radiogroup" aria-label={r} key={r}>
                <b>{r}</b>
                <Opts
                  type="radio"
                  name={`${q.id}-${i}`}
                  opts={q.opts}
                  selected={a.list[q.id]?.[i] ? [a.list[q.id][i]] : []}
                  onToggle={(v) => setScale(q.id, i, v, q.rows.length)}
                />
              </div>
            ))}
          </div>
        )}

        {q.id === "safe" && radio?.val && radio.val !== "없음" && (
          <div className="safe">
            <strong>지금 많이 힘드시군요. 말씀해 주셔서 고맙습니다.</strong>
            <span>위급하다고 느껴지면 신청서와 별개로 지금 바로 도움을 받아 주세요.</span>
            <span>
              자살예방상담전화 <b>109</b> (24시간) · 정신건강위기상담 <b>1577-0199</b> · 긴급 상황 <b>119</b>
            </span>
          </div>
        )}
        {err && <p className="err">{err}</p>}
      </div>
      <div className="nav-btns">
        <button className="btn ghost" type="button" onClick={() => { setErr(""); setStep(step - 1); }}>
          ← 이전
        </button>
        <button className="btn" type="button" onClick={next}>
          {last ? "작성 완료" : "다음 →"}
        </button>
      </div>
    </form>
  );
}
