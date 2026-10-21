import type { Metadata } from "next";
import Link from "next/link";
import PolicyDoc from "../components/PolicyDoc";
import { PRIVACY, PRIVACY_EFFECTIVE } from "@/lib/privacy";

export const metadata: Metadata = { title: "개인정보 처리방침 | 버블룸 심리상담소" };

export default function Privacy() {
  return (
    <div className="page">
      <div className="wrap">
        <Link className="back" href="/">
          ← 메인으로
        </Link>
        <h1>개인정보 처리방침</h1>
        <p className="intro">시행일 {PRIVACY_EFFECTIVE}</p>
        <PolicyDoc sections={PRIVACY} />
      </div>
    </div>
  );
}
