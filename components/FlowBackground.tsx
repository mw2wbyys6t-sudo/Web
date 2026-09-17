export default function FlowBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 极光色块 */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />

      {/* 赛博点阵 */}
      <div className="cyber-grid" />

      {/* 流水丝带 */}
      <div className="ribbon ribbon-1">
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ribbon-grad-a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--accent-pink)" stopOpacity="0.5" />
              <stop offset="65%" stopColor="var(--accent-blue)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,75 C150,20 300,130 450,75 C600,20 750,130 900,75 C1050,20 1200,130 1200,75 L1200,85 C1050,140 900,30 750,85 C600,140 450,30 300,85 C150,140 0,30 0,85 Z"
            fill="url(#ribbon-grad-a)"
          />
        </svg>
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path
            d="M0,75 C150,20 300,130 450,75 C600,20 750,130 900,75 C1050,20 1200,130 1200,75 L1200,85 C1050,140 900,30 750,85 C600,140 450,30 300,85 C150,140 0,30 0,85 Z"
            fill="url(#ribbon-grad-a)"
          />
        </svg>
      </div>

      <div className="ribbon ribbon-2">
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ribbon-grad-b" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity="0" />
              <stop offset="40%" stopColor="var(--accent-violet)" stopOpacity="0.45" />
              <stop offset="70%" stopColor="var(--accent-mint)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--accent-mint)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,75 C200,120 350,25 550,75 C750,125 900,30 1200,75 L1200,88 C900,42 750,138 550,88 C350,38 200,132 0,88 Z"
            fill="url(#ribbon-grad-b)"
          />
        </svg>
        <svg viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path
            d="M0,75 C200,120 350,25 550,75 C750,125 900,30 1200,75 L1200,88 C900,42 750,138 550,88 C350,38 200,132 0,88 Z"
            fill="url(#ribbon-grad-b)"
          />
        </svg>
      </div>
    </div>
  )
}
