import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "상담자 소개 | 버블룸 심리상담소" };

const CRED = [
  { title: "학력", items: ["숙명여자대학교 교육대학원 상담교육전공 졸업"] },
  { title: "자격", items: ["청소년상담사 2급", "임상심리사 2급", "상담심리사 2급"] },
  {
    title: "학회 활동",
    items: ["한국상담학회 정회원", "한국상담심리학회 정회원", "한국상담심리교육복지학회 정회원"],
  },
];

export default function Counselor() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>여수진 상담사</h1>
        <div className="blocks">
          {CRED.map((c) => (
            <div className="block" key={c.title}>
              <h2>{c.title}</h2>
              <div className="txt">
                <ul className="cred">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
