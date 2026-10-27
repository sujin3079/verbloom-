import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "상담료 및 환불정책 | 버블룸 심리상담소" };

// 예약관리(reserve.verbloom.co.kr)의 환불정책 페이지와 같은 내용을 유지합니다.
const BLOCKS = [
  {
    title: "상담료",
    items: ["회기별 결제: 1회 70,000원 (50분)", "4회기 선결제: 280,000원 (4회분)", "10회기 선결제: 700,000원 (10회분, 할인 행사 시 할인가 적용)"],
  },
  {
    title: "결제 방법",
    items: [
      "상담을 시작한 내담자는 예약관리 페이지(reserve.verbloom.co.kr)에서 카드 등으로 결제합니다.",
      "결제는 상담 시작 24시간 전까지 해 주세요. 결제(또는 선결제 이용권 적용)가 되어야 예약이 확정되며, 마감까지 결제하지 않은 회기는 자동 취소됩니다(다음 정기 예약은 유지).",
      "결제한 상담은 예약된 날짜에 진행되며, 4회기 선결제는 보통 4주, 10회기 선결제는 보통 10주에 걸쳐 이용합니다.",
      "선결제 이용권은 결제일로부터 6개월 안에 이용해 주세요. 기간 안에 이용하지 못한 회기는 아래 '선결제 중도 해지'와 같은 기준으로 환불해 드립니다.",
    ],
  },
  {
    title: "24시간 전까지 취소",
    items: [
      "회기별 결제: 결제 금액 전액 환불 또는 다음 회기로 이월 중 선택할 수 있습니다.",
      "4회기·10회기 선결제: 취소한 회기는 차감되지 않고 남은 이용권으로 유지됩니다.",
      "예약관리 페이지에서 직접 취소할 수 있습니다.",
    ],
  },
  {
    title: "24시간 이내 취소·불참",
    items: [
      "상담소로 연락해 주시면 사유를 확인한 뒤 환불 여부를 안내해 드립니다.",
      "질병, 사고 등 불가피한 사유가 있는 경우 일정 변경 또는 환불을 협의합니다.",
    ],
  },
  {
    title: "선결제 중도 해지",
    items: [
      "사용하지 않은 회기는 결제한 1회 단가(결제 금액 ÷ 회기 수) 기준으로 계산하여 환불합니다.",
      "예: 4회기(280,000원) 중 1회 이용 후 해지 시 210,000원 환불",
      "예: 10회기(700,000원) 중 3회 이용 후 해지 시 490,000원 환불",
    ],
  },
  {
    title: "환불 방법",
    items: ["카드 결제는 결제 취소로 환불되며, 카드사 사정에 따라 영업일 기준 3~7일이 걸릴 수 있습니다."],
  },
  {
    title: "문의",
    items: ["카카오톡 채널 pf.kakao.com/_TxoFxiX/chat", "전화 010-3030-7746", "이메일 verbloom0915@gmail.com"],
  },
];

export default function Refund() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>상담료 및 환불정책</h1>
        <div className="blocks">
          {BLOCKS.map((b) => (
            <div className="block" key={b.title}>
              <h2>{b.title}</h2>
              <div className="txt">
                <ul className="cred">
                  {b.items.map((i) => (
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
