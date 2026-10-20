import type { Metadata } from "next";
import { Gowun_Batang, Gowun_Dodum, Nanum_Pen_Script } from "next/font/google";
import Image from "next/image";
import Header from "./components/Header";
import { CrayonDefs } from "./components/Art";
import "./globals.css";

const batang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-batang",
  display: "swap",
});

const dodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dodum",
  display: "swap",
});

const pen = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pen",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.verbloom.co.kr"),
  title: "버블룸 심리상담소",
  verification: {
    google: "KtsrkPTU7cy4JRC3ITNmOy3lJeIWR7GvtGyhJLDdsK4",
    other: { "naver-site-verification": "65477318a312238817d9a946c8a320b3015e6024" },
  },
  description:
    "저마다 피어나는 때가 있습니다. 버블룸 심리상담소는 당신이 자신의 속도로, 자신만의 방식으로 피어날 수 있도록 곁에 있습니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${batang.variable} ${dodum.variable} ${pen.variable}`}
    >
      <body>
        <CrayonDefs />
        <Header />
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <span className="f-brand">
              <Image src="/logo.png" alt="" width={32} height={32} />
              버블룸 심리상담소
            </span>
            <div className="f-info">
              <span>상호 버블룸 심리상담소 · 대표 여수진</span>
              <span>사업자등록번호 109-30-83095 · 이메일 verbloom0915@gmail.com</span>
              <span>© 버블룸 심리상담소</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
