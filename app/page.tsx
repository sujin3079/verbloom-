import Image from "next/image";
import Link from "next/link";

// 메인 상담 대상 3분류 (확정 항목 — 빠뜨리지 않습니다)
const WHO = [
  {
    img: "/images/who-child.png",
    w: 463,
    title: "아동·청소년 상담",
    desc: "마음을 말로 다 꺼내기 어려운 시기, 아이의 속도에 맞춰 함께합니다.",
    tags: ["정서·불안", "학교생활", "또래관계", "자존감"],
  },
  {
    img: "/images/who-adult.png",
    w: 231,
    title: "청년·성인 상담",
    desc: "지치고 막막한 마음을 안전하게 꺼내 놓을 수 있는 시간입니다.",
    tags: ["우울·불안", "자존감", "대인관계", "스트레스", "삶의 어려움"],
  },
  {
    img: "/images/who-parent.png",
    w: 394,
    title: "부모 상담",
    desc: "아이를 더 깊이 이해하고, 부모인 나의 마음도 돌볼 수 있도록 돕습니다.",
    tags: ["양육 스트레스", "부모-자녀 관계", "자녀 이해", "양육상담"],
  },
];

const STEPS = [
  { img: "/images/step-1.png", w: 349, title: "상담신청", desc: "편한 방법으로 상담을 신청해 주세요." },
  { img: "/images/step-2.png", w: 340, title: "접수면접", desc: "지금의 어려움과 바라는 방향을 함께 살펴봅니다." },
  { img: "/images/step-3.png", w: 345, title: "상담진행", desc: "정해진 시간에 꾸준히 만나며 이야기를 나눕니다." },
  { img: "/images/step-4.png", w: 352, title: "종결 및 점검", desc: "달라진 마음을 함께 돌아보며 천천히 마무리합니다." },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="hand">ver bloom · 봄에, 피어나다</p>
            <h1>
              저마다
              <br />
              피어나는 때가
              <br />
              있습니다.
            </h1>
            <p className="lead">
              버블룸 심리상담소는 당신이 자신의 속도로, 자신만의 방식으로 피어날 수 있도록 곁에 있습니다.
            </p>
            <div className="cta">
              <Link className="btn" href="/apply">
                상담신청하기 <span aria-hidden="true">→</span>
              </Link>
              <Link className="btn ghost" href="/process">
                상담 안내 보기
              </Link>
            </div>
          </div>
          <div className="art-box">
            <Image
              src="/images/hero-bike.png"
              alt="언덕길을 자전거로 달리는 사람, 나무와 꽃, 작은 집과 해가 있는 풍경"
              width={1133}
              height={372}
              priority
            />
            {/* 상담 중인 내담자용 예약관리 (별도 사이트) — 그림 위 하늘, 상담절차 메뉴 아래 */}
            <a className="btn sky member-cta" href="https://reserve.verbloom.co.kr" aria-label="상담 중이신 분 예약관리">
              <span className="pc-only">상담 중이신 분 · </span>예약관리 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="who">
        <div className="wrap">
          <div className="sec-head">
            <p className="hand">상담 분야</p>
            <h2>누구의 마음이든, 함께 들여다봅니다</h2>
          </div>
          <div className="cards">
            {WHO.map((w) => (
              <Link className="card" href="/fields" key={w.title}>
                <Image src={w.img} alt="" width={w.w} height={280} />
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <ul className="tags">
                  {w.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="more">자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="online">
        <div className="wrap">
          <div className="art-box">
            <Image
              src="/images/online-room.png"
              alt="창가 방에서 노트북 앞에 앉아 있는 사람과 옆에 엎드린 강아지"
              width={854}
              height={700}
            />
          </div>
          <div>
            <p className="hand">버블룸 이야기</p>
            <h2>
              언제 어디서나,
              <br />
              당신의 이야기를 듣습니다.
            </h2>
            <div className="body">
              <p>
                버블룸은 평가하거나 서두르지 않습니다. 지금의 마음을 있는 그대로 바라보고, 당신이 원하는 방향으로
                나아갈 수 있도록 함께 고민하는 심리상담소입니다.
              </p>
              <Link className="more" href="/counselor">
                상담자 소개 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flow">
        <div className="wrap">
          <div className="sec-head center">
            <p className="hand">상담 진행 과정</p>
            <h2>이렇게 함께 걸어가요</h2>
          </div>
          <ol className="flow-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Image src={s.img} alt="" width={s.w} height={300} />
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
