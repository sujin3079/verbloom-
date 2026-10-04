import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "상담절차 | 버블룸 심리상담소" };

const STEPS = [
  { title: "상담신청", desc: "온라인 신청서를 작성합니다." },
  { title: "초기상담", desc: "현재 어려움과 필요한 도움을 정리합니다." },
  { title: "상담진행", desc: "함께 정한 목표를 바탕으로, 자신의 속도에 맞춰 진행합니다." },
  { title: "종결 및 점검", desc: "변화를 돌아보고 이후 방향을 점검합니다." },
];

export default function Process() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>상담절차</h1>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="num">{i + 1}</span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link className="btn" href="/apply">
          상담신청하기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
