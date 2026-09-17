interface WaveDividerProps {
  flip?: boolean
}

export default function WaveDivider({ flip = false }: WaveDividerProps) {
  return (
    <div className={`wave-divider ${flip ? 'wave-flip' : ''}`} aria-hidden="true">
      <div className="wave-track">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0.35" />
              <stop offset="33%" stopColor="var(--accent-violet)" stopOpacity="0.35" />
              <stop offset="66%" stopColor="var(--accent-blue)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 C100,15 200,75 300,45 C400,15 500,75 600,45 C700,15 800,75 900,45 C1000,15 1100,75 1200,45 L1200,46 C1100,76 1000,16 900,46 C800,76 700,16 600,46 C500,76 400,16 300,46 C200,76 100,16 0,46 Z"
            fill="url(#wave-grad)"
          />
        </svg>
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path
            d="M0,45 C100,15 200,75 300,45 C400,15 500,75 600,45 C700,15 800,75 900,45 C1000,15 1100,75 1200,45 L1200,46 C1100,76 1000,16 900,46 C800,76 700,16 600,46 C500,76 400,16 300,46 C200,76 100,16 0,46 Z"
            fill="url(#wave-grad)"
          />
        </svg>
      </div>
    </div>
  )
}
