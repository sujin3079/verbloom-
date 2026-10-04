import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "상담분야 | 버블룸 심리상담소" };

const FIELDS = [
  {
    title: "아동·청소년",
    desc: "건강한 성장을 위한 마음의 힘",
    items: ["정서적 어려움", "또래관계", "가족 갈등", "학교생활 고민"],
  },
  {
    title: "청년·성인",
    desc: "지금의 나를 이해하고 더 나은 내일로",
    items: ["불안·우울", "자존감", "대인관계", "반복되는 삶의 어려움"],
  },
  {
    title: "부모",
    desc: "아이와 함께 성장하는 부모의 마음",
    items: ["자녀 이해", "양육 과정의 감정 및 관계 어려움"],
  },
  {
    title: "심리검사",
    desc: "MMPI-2, SCT, TCI를 활용할 수 있으며, 상담 내용과 함께 종합해 해석합니다.",
    items: [],
  },
];

export default function Fields() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>상담분야</h1>
        <div className="blocks">
          {FIELDS.map((f) => (
            <div className="block" key={f.title}>
              <h2>{f.title}</h2>
              <div className="txt">
                <p>{f.desc}</p>
                {f.items.length > 0 && (
                  <ul>
                    {f.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
