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
