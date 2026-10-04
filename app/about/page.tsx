import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "버블룸 소개 | 버블룸 심리상담소" };

export default function About() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>버블룸 소개</h1>
        <div className="name-meaning" aria-label="버블룸 이름의 뜻">
          <span className="chip">
            ver<small>봄</small>
          </span>
          <span className="plus">+</span>
          <span className="chip">
            bloom<small>피어남</small>
          </span>
          <span className="plus">=</span>
          <span className="chip">
            버블룸<small>저마다의 때에 피어나는 곳</small>
          </span>
        </div>
        <div className="blocks">
          <div className="block">
            <h2>버블룸의 믿음</h2>
            <div className="txt">
              <p>누구나 자기만의 속도와 때가 있다고 믿습니다. 버블룸은 그 변화를 차분히 함께합니다.</p>
            </div>
          </div>
          <div className="block">
            <h2>버블룸의 상담</h2>
            <div className="txt">
              <p>상담은 이런 과정입니다.</p>
              <ul>
                <li>현재의 나를 이해합니다.</li>
                <li>반복되는 고민을 정리합니다.</li>
                <li>나에게 맞는 방향을 찾습니다.</li>
              </ul>
            </div>
          </div>
          <div className="block">
            <h2>비대면 상담</h2>
            <div className="txt">
              <p>익숙하고 사적인 공간에서, 거리와 이동시간의 제약 없이 상담을 이어갈 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
