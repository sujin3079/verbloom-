import Link from "next/link";
import { CardIcon, HeroArt, RoomArt } from "./components/Art";

// 메인 상담 대상 3분류 (확정 항목 — 빠뜨리지 않습니다)
const WHO = [
  { kind: "sprout", title: "아동·청소년 상담", desc: "건강한 성장을 위한 마음의 힘" },
  { kind: "flower", title: "청년·성인 상담", desc: "지금의 나를 이해하고 더 나은 내일로" },
  { kind: "pair", title: "부모 상담", desc: "아이와 함께 성장하는 부모의 마음" },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="hand">버블룸 심리상담소</p>
            <h1>
              저마다 <em>피어나는 때</em>가 있습니다.
            </h1>
            <p className="lead">
              버블룸 심리상담소는 당신이 자신의 속도로, 자신만의 방식으로 피어날 수 있도록 곁에 있습니다.
            </p>
            <div className="cta">
              <Link className="btn" href="/apply">
                상담신청하기 <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn ghost" href="/about">
                버블룸 소개
              </Link>
            </div>
          </div>
          <div className="art-box">
            <HeroArt />
          </div>
        </div>
      </section>

      <section className="online">
        <div className="wrap">
          <div className="art-box">
            <RoomArt />
          </div>
          <div>
            <p className="hand">비대면 상담</p>
            <h2>언제 어디서나, 당신의 이야기를 듣습니다.</h2>
            <div className="body">
              <p>먼 거리를 오가지 않아도 됩니다. 가장 편안하고 익숙한 공간에서 상담을 시작할 수 있습니다.</p>
              <p>
                버블룸은 당신의 이야기를 평가하거나 서두르지 않습니다. 지금 겪고 있는 고민을 천천히 함께
                들여다봅니다.
              </p>
              <ul>
                <li>이동시간 없이 내 공간에서 상담</li>
                <li>거리에 상관없이 꾸준히 이어가는 만남</li>
                <li>평가하지 않고, 서두르지 않는 대화</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="who">
        <div className="wrap">
          <div className="sec-head">
            <p className="hand">상담 대상</p>
            <h2>누구의 이야기든 들을 준비가 되어 있습니다.</h2>
          </div>
          <div className="cards">
            {WHO.map((w) => (
              <Link className="card" href="/fields" key={w.title}>
                <CardIcon kind={w.kind} />
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <span className="more">자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="box">
            <div>
              <h2>나만의 속도로, 천천히 시작해도 괜찮습니다.</h2>
              <p>온라인 신청서를 작성하면 상담이 시작됩니다.</p>
            </div>
            <Link className="btn" href="/apply">
              상담신청하기 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
