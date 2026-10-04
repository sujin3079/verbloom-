/* 색연필 느낌의 그림 모음 */

// 색연필 질감 필터와 꽃 모양 (모든 그림이 같이 씀)
export function CrayonDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="crayon" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="4" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="3" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 1.3" result="ga" />
          <feComposite in="d" in2="ga" operator="in" />
        </filter>
        <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="11" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <g id="flower">
          <g fill="#FFFDF7" stroke="#E9806A" strokeWidth="2.4">
            <circle cx="0" cy="-8" r="6.5" />
            <circle cx="7.6" cy="-2.5" r="6.5" />
            <circle cx="4.7" cy="6.5" r="6.5" />
            <circle cx="-4.7" cy="6.5" r="6.5" />
            <circle cx="-7.6" cy="-2.5" r="6.5" />
          </g>
          <circle r="4.2" fill="#F2B233" />
        </g>
      </defs>
    </svg>
  );
}

// 첫 화면: 집·정원·나무, 대화하는 두 사람과 강아지
export function HeroArt() {
  return (
    <svg
      className="art"
      viewBox="0 0 560 450"
      role="img"
      aria-label="집과 정원, 나무 아래에서 두 사람이 이야기를 나누고 강아지가 곁에 있는 그림"
    >
      <g filter="url(#crayon)">
        <ellipse cx="290" cy="235" rx="270" ry="205" fill="#EAF2DE" />
        <circle cx="470" cy="80" r="34" fill="#F7D98B" />
        <path d="M20 330 Q140 280 280 310 T560 300 L560 450 L20 450 Z" fill="#B9D29A" />
        <path d="M0 370 Q160 335 300 360 T560 350 L560 450 L0 450 Z" fill="#9CC07D" />
        {/* 집 */}
        <rect x="62" y="190" width="150" height="130" fill="#F6E7CB" />
        <path d="M48 196 L137 118 L226 196 Z" fill="#E59A7E" />
        <rect x="170" y="128" width="20" height="40" fill="#C9826A" />
        <rect x="120" y="250" width="38" height="70" rx="6" fill="#A97B57" />
        <rect x="80" y="215" width="32" height="30" fill="#BCDDF2" />
        <rect x="168" y="215" width="32" height="30" fill="#BCDDF2" />
        {/* 나무 */}
        <rect x="452" y="210" width="20" height="120" rx="6" fill="#8D6A4A" />
        <circle cx="462" cy="180" r="62" fill="#7FAE69" />
        <circle cx="420" cy="205" r="40" fill="#8DBB75" />
        <circle cx="505" cy="205" r="40" fill="#76A561" />
        {/* 벤치 */}
        <rect x="268" y="330" width="150" height="10" rx="4" fill="#B98A5E" />
        <rect x="278" y="340" width="8" height="26" fill="#9C7049" />
        <rect x="400" y="340" width="8" height="26" fill="#9C7049" />
        {/* 사람 A (왼쪽) */}
        <path d="M292 332 Q290 288 312 282 Q334 288 332 332 Z" fill="#F0A98E" />
        <circle cx="312" cy="262" r="17" fill="#F4D3B5" />
        <path d="M295 258 Q298 238 316 241 Q332 244 329 262 Q318 250 300 262 Z" fill="#5D4636" />
        <rect x="300" y="330" width="26" height="30" rx="6" fill="#6C88A6" />
        {/* 사람 B (오른쪽) */}
        <path d="M356 332 Q354 284 376 278 Q398 284 396 332 Z" fill="#8FB4A0" />
        <circle cx="376" cy="257" r="17" fill="#EBC6A4" />
        <path d="M359 262 Q356 236 378 238 Q398 240 394 266 Q394 252 380 250 Q366 250 359 262 Z" fill="#3F3A34" />
        <rect x="363" y="330" width="26" height="30" rx="6" fill="#7A6C5C" />
        {/* 강아지 */}
        <ellipse cx="200" cy="378" rx="34" ry="18" fill="#E2B985" />
        <circle cx="172" cy="362" r="15" fill="#E2B985" />
        <ellipse cx="164" cy="352" rx="6" ry="12" fill="#B98653" transform="rotate(-25 164 352)" />
        <path d="M232 372 Q248 356 244 348" stroke="#E2B985" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* 대화 버블 */}
        <circle cx="344" cy="222" r="14" fill="#D9ECF8" />
        <circle cx="324" cy="206" r="8" fill="#D9ECF8" />
        <circle cx="364" cy="200" r="10" fill="#D9ECF8" />
      </g>
      <g filter="url(#wobble)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M48 196 L137 118 L226 196" stroke="#B66D55" strokeWidth="3" />
        <rect x="62" y="190" width="150" height="130" stroke="#B49A72" strokeWidth="2.5" />
        <path d="M96 215 V245 M80 230 H112 M184 215 V245 M168 230 H200" stroke="#8FB2CC" strokeWidth="2" />
        <circle cx="150" cy="287" r="2.5" fill="#6B4B33" stroke="none" />
        <circle cx="344" cy="222" r="14" stroke="#9FC5E0" strokeWidth="2" />
        <circle cx="364" cy="200" r="10" stroke="#9FC5E0" strokeWidth="2" />
        <circle cx="324" cy="206" r="8" stroke="#9FC5E0" strokeWidth="2" />
        <path d="M318 266 Q322 270 326 266" stroke="#7A5440" strokeWidth="2" />
        <path d="M362 262 Q366 266 370 262" stroke="#7A5440" strokeWidth="2" />
        <circle cx="166" cy="360" r="2" fill="#4A3628" stroke="none" />
        <circle cx="158" cy="366" r="2.6" fill="#4A3628" stroke="none" />
      </g>
      <g filter="url(#wobble)">
        <path d="M60 400 v-22 M100 410 v-26 M250 412 v-20 M470 395 v-24 M512 408 v-22 M440 415 v-18" stroke="#4F7A45" strokeWidth="3" />
        <use href="#flower" x="60" y="372" />
        <use href="#flower" x="100" y="378" />
        <use href="#flower" x="250" y="388" />
        <use href="#flower" x="470" y="366" />
        <use href="#flower" x="512" y="382" />
        <use href="#flower" x="440" y="393" transform="translate(440 393) scale(.8) translate(-440 -393)" />
      </g>
    </svg>
  );
}

// 두 번째 영역: 방에서 노트북으로 상담받는 한 사람과 강아지
export function RoomArt() {
  return (
    <svg
      className="art"
      viewBox="0 0 480 380"
      role="img"
      aria-label="창가 방에서 한 사람이 노트북으로 상담을 받고 강아지가 곁에 누워 있는 그림"
    >
      <g filter="url(#crayon)">
        <rect x="20" y="20" width="440" height="340" rx="28" fill="#F8EEDC" />
        <rect x="20" y="270" width="440" height="90" rx="0" fill="#E7D5B5" />
        <rect x="270" y="50" width="140" height="120" rx="8" fill="#CFE6F5" />
        <circle cx="380" cy="80" r="16" fill="#F7D98B" />
        <rect x="60" y="150" width="34" height="40" rx="6" fill="#D98B6A" />
        <circle cx="77" cy="128" r="22" fill="#7FAE69" />
        <circle cx="62" cy="140" r="15" fill="#8DBB75" />
        <circle cx="93" cy="140" r="15" fill="#76A561" />
        {/* 러그 + 낮은 탁자 */}
        <ellipse cx="230" cy="318" rx="170" ry="30" fill="#E8B8A2" />
        <rect x="200" y="240" width="150" height="12" rx="4" fill="#B98A5E" />
        <rect x="212" y="252" width="8" height="48" fill="#9C7049" />
        <rect x="330" y="252" width="8" height="48" fill="#9C7049" />
        {/* 노트북 */}
        <path d="M262 238 L330 238 L338 192 L274 192 Z" fill="#A8B3BC" />
        <path d="M279 199 L332 199 L327 230 L274 230 Z" fill="#DDEFFA" />
        <rect x="250" y="236" width="90" height="6" rx="3" fill="#8E9AA4" />
        {/* 사람 (방석 위) */}
        <ellipse cx="170" cy="306" rx="46" ry="12" fill="#9CC07D" />
        <path d="M138 300 Q132 236 168 226 Q202 236 198 300 Z" fill="#F2C18E" />
        <circle cx="170" cy="200" r="21" fill="#F4D3B5" />
        <path d="M149 198 Q146 172 172 174 Q196 176 192 204 Q184 188 166 190 Q156 192 149 198 Z" fill="#5D4636" />
        <path d="M196 262 Q226 258 252 240" stroke="#F2C18E" strokeWidth="12" fill="none" strokeLinecap="round" />
        <rect x="150" y="292" width="74" height="16" rx="8" fill="#6C88A6" />
        {/* 강아지 */}
        <ellipse cx="376" cy="318" rx="38" ry="17" fill="#E2B985" />
        <circle cx="406" cy="304" r="15" fill="#E2B985" />
        <ellipse cx="414" cy="296" rx="6" ry="12" fill="#B98653" transform="rotate(25 414 296)" />
      </g>
      <g filter="url(#wobble)" fill="none" strokeLinecap="round">
        <path d="M340 50 V170 M270 110 H410" stroke="#9FC5E0" strokeWidth="3" />
        <rect x="270" y="50" width="140" height="120" rx="8" stroke="#B49A72" strokeWidth="2.5" />
        <path d="M176 204 Q180 208 184 204" stroke="#7A5440" strokeWidth="2" />
        <path d="M398 304 Q402 300 406 304" stroke="#4A3628" strokeWidth="2" />
        <circle cx="420" cy="309" r="2.6" fill="#4A3628" stroke="none" />
        <path d="M338 316 Q326 306 330 296" stroke="#E2B985" strokeWidth="7" />
        <path d="M292 214 Q300 208 308 214 M312 214 Q318 208 324 214" stroke="#E9806A" strokeWidth="2" />
      </g>
    </svg>
  );
}

// 상담 대상 카드 아이콘: 새싹 → 꽃 한 송이 → 큰 꽃과 작은 꽃
export function CardIcon({ kind }: { kind: "sprout" | "flower" | "pair" }) {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <g filter="url(#crayon)">
        <circle cx="36" cy="36" r="32" fill="#D9ECF8" />
      </g>
      {kind === "sprout" && (
        <g filter="url(#wobble)">
          <path d="M36 58 V36" stroke="#4F7A45" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 46 Q26 44 24 36 Q34 36 36 46 Z" fill="#7FAE69" />
          <path d="M36 42 Q46 40 48 32 Q38 32 36 42 Z" fill="#7FAE69" />
        </g>
      )}
      {kind === "flower" && (
        <g filter="url(#wobble)">
          <path d="M36 60 V34" stroke="#4F7A45" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 50 Q24 48 22 40 Q34 40 36 50 Z" fill="#7FAE69" />
          <use href="#flower" x="36" y="28" />
        </g>
      )}
      {kind === "pair" && (
        <g filter="url(#wobble)">
          <path d="M30 60 V30 M44 60 V42" stroke="#4F7A45" strokeWidth="3" strokeLinecap="round" />
          <use href="#flower" x="30" y="26" />
          <use href="#flower" x="44" y="38" transform="translate(44 38) scale(.7) translate(-44 -38)" />
        </g>
      )}
    </svg>
  );
}

// 신청서 작성 완료 그림
export function DoneArt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g filter="url(#crayon)">
        <circle cx="60" cy="60" r="54" fill="#D9ECF8" />
      </g>
      <g filter="url(#wobble)">
        <path d="M60 100 V62" stroke="#4F7A45" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 84 Q44 82 40 70 Q56 70 60 84 Z" fill="#7FAE69" />
        <path d="M60 78 Q76 76 80 64 Q64 64 60 78 Z" fill="#7FAE69" />
        <use href="#flower" x="60" y="50" transform="translate(60 50) scale(1.5) translate(-60 -50)" />
      </g>
    </svg>
  );
}
