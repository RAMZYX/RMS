type Props = { width?: number; height?: number };

/**
 * Golden lantern (fanoos) emblem standing in for the ITS golden logo.
 * The original brand asset lives in Figma; swap it in once egress is open.
 */
export function Logo({ width = 38, height = 60 }: Props) {
  return (
    <svg className="logo" width={width} height={height} viewBox="0 0 60 95" fill="none">
      <defs>
        <linearGradient id="rms-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0DDA8" />
          <stop offset="0.5" stopColor="#E3CD96" />
          <stop offset="1" stopColor="#C9A45C" />
        </linearGradient>
      </defs>
      <path d="M30 2 L34 9 L26 9 Z" fill="url(#rms-gold)" />
      <rect x="27.5" y="9" width="5" height="6" rx="1.5" fill="url(#rms-gold)" />
      <path d="M18 18 Q30 12 42 18 L38 23 L22 23 Z" fill="url(#rms-gold)" />
      <path d="M22 23 L38 23 L44 34 L44 62 L38 73 L22 73 L16 62 L16 34 Z" fill="url(#rms-gold)" />
      <path d="M26 30 L34 30 L38 38 L38 58 L34 66 L26 66 L22 58 L22 38 Z" fill="#1F5A44" opacity="0.92" />
      <path d="M33 40 a8 8 0 1 0 0 16 a6 6 0 1 1 0 -16 Z" fill="url(#rms-gold)" />
      <path d="M22 73 L38 73 L34 80 L26 80 Z" fill="url(#rms-gold)" />
      <ellipse cx="30" cy="83" rx="6" ry="2.4" fill="url(#rms-gold)" />
    </svg>
  );
}
