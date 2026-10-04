"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 상단 메뉴 5개 (확정 항목 — 순서와 이름을 바꾸지 않습니다)
const MENU = [
  { href: "/about", label: "버블룸 소개" },
  { href: "/counselor", label: "상담자 소개" },
  { href: "/fields", label: "상담분야" },
  { href: "/process", label: "상담절차" },
  { href: "/apply", label: "상담신청", apply: true },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="버블룸 심리상담소 메인으로">
          <Image src="/logo.png" alt="" width={44} height={44} priority />
          <span>버블룸 심리상담소</span>
        </Link>
        <nav className="menu" aria-label="주요 메뉴">
          {MENU.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={m.apply ? "apply" : undefined}
              aria-current={pathname === m.href ? "page" : undefined}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
