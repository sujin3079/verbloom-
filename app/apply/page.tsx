import type { Metadata } from "next";
import Link from "next/link";
import ApplyForm from "../components/ApplyForm";

export const metadata: Metadata = { title: "상담신청 | 버블룸 심리상담소" };

export default function Apply() {
  return (
    <div className="page apply-page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 홈으로 돌아가기
        </Link>
        <h1>상담신청서</h1>
        <p className="intro">
          한 문항씩 천천히 답해 주세요. 답하기 어려운 문항은 비워 두셔도 괜찮습니다.
        </p>
        <ApplyForm />
      </div>
    </div>
  );
}
