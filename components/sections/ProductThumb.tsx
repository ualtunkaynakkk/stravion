const gold = "#e9b44c";
const goldSoft = "#f2cd88";
const frame = { fill: "#0f1118", stroke: "#22242e" };

export default function ProductThumb({ variant }: { variant: number }) {
  const v = variant % 8;
  return (
    <svg viewBox="0 0 160 100" role="img" aria-hidden="true">
      <rect x="4" y="4" width="152" height="92" rx="6" {...frame} />
      {v === 0 && ( /* çizgi grafik + KPI kutuları */
        <>
          <rect x="12" y="14" width="42" height="20" rx="3" fill="#161923" />
          <rect x="60" y="14" width="42" height="20" rx="3" fill="#161923" />
          <polyline points="14,80 34,66 54,72 74,56 94,62 114,46 134,52 148,40" fill="none" stroke={gold} strokeWidth="2" />
          <line x1="12" y1="86" x2="148" y2="86" stroke="#22242e" />
        </>
      )}
      {v === 1 && ( /* donut + satırlar */
        <>
          <rect x="12" y="12" width="60" height="76" rx="3" fill="#12141c" />
          <circle cx="42" cy="42" r="16" fill="none" stroke={gold} strokeWidth="2" strokeDasharray="70 30" />
          <rect x="80" y="12" width="68" height="16" rx="3" fill="#161923" />
          <rect x="80" y="34" width="68" height="16" rx="3" fill="#161923" />
          <rect x="80" y="56" width="68" height="16" rx="3" fill="#161923" />
          <rect x="82" y="60" width="40" height="8" rx="2" fill={gold} opacity=".8" />
        </>
      )}
      {v === 2 && ( /* çubuk grafik */
        <>
          {[16, 34, 52, 70, 88, 106, 124].map((x, i) => (
            <rect key={x} x={x} y={66 - i * 8} width="12" height={20 + i * 8} fill={i > 4 ? goldSoft : gold} opacity={0.35 + i * 0.1} />
          ))}
        </>
      )}
      {v === 3 && ( /* AI çekirdek */
        <>
          <circle cx="80" cy="50" r="26" fill="none" stroke={gold} strokeWidth="1.5" opacity=".9" />
          <circle cx="80" cy="50" r="17" fill="none" stroke={gold} strokeWidth="1" opacity=".5" />
          <text x="80" y="55" fill={goldSoft} fontSize="14" fontFamily="monospace" textAnchor="middle">AI</text>
          <path d="M80 24v-8M80 84v-8M54 50h-8M114 50h-8" stroke="#57491f" />
        </>
      )}
      {v === 4 && ( /* radar */
        <>
          <circle cx="80" cy="50" r="34" fill="none" stroke="#22242e" />
          <circle cx="80" cy="50" r="22" fill="none" stroke="#22242e" />
          <circle cx="80" cy="50" r="10" fill="none" stroke="#22242e" />
          <path d="M80 50L108 26" stroke={gold} strokeWidth="1.5" />
          <circle cx="100" cy="36" r="3" fill={gold} />
          <circle cx="64" cy="62" r="3" fill="#cf9e2b" />
          <circle cx="92" cy="68" r="2.5" fill="#7d651f" />
        </>
      )}
      {v === 5 && ( /* gösterge (gauge) */
        <>
          <path d="M34 78 A46 46 0 0 1 126 78" fill="none" stroke="#22242e" strokeWidth="8" />
          <path d="M34 78 A46 46 0 0 1 100 36" fill="none" stroke={gold} strokeWidth="8" />
          <circle cx="80" cy="78" r="4" fill={goldSoft} />
          <line x1="80" y1="78" x2="102" y2="44" stroke={goldSoft} strokeWidth="2" />
        </>
      )}
      {v === 6 && ( /* segment matrisi */
        <>
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`${r}-${c}`} x={16 + c * 34} y={16 + r * 26} width="28" height="20" rx="3"
                fill={r === 1 && c === 2 ? gold : "#161923"} opacity={r === 1 && c === 2 ? 0.9 : 1} />
            ))
          )}
        </>
      )}
      {v === 7 && ( /* konsolide görünüm */
        <>
          <rect x="12" y="12" width="136" height="18" rx="3" fill="#161923" />
          <rect x="16" y="17" width="52" height="8" rx="2" fill={gold} opacity=".7" />
          <polyline points="14,82 40,70 66,76 92,58 118,64 146,48" fill="none" stroke={goldSoft} strokeWidth="1.6" />
          <polyline points="14,88 40,82 66,84 92,74 118,78 146,68" fill="none" stroke="#7d651f" strokeWidth="1.4" />
        </>
      )}
    </svg>
  );
}
