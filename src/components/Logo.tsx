import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Ellipse, Rect } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
};

/**
 * Golden lantern (fanoos) emblem standing in for the ITS golden logo.
 * The original brand asset lives in Figma and cannot be bundled, so this is a
 * faithful gold-gradient mark in the same silhouette family (lantern).
 */
export function Logo({ width = 38, height = 60 }: Props) {
  // Natural artboard 60 x 95, scaled to the requested box.
  return (
    <Svg width={width} height={height} viewBox="0 0 60 95" fill="none">
      <Defs>
        <LinearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F0DDA8" />
          <Stop offset="0.5" stopColor="#E3CD96" />
          <Stop offset="1" stopColor="#C9A45C" />
        </LinearGradient>
      </Defs>

      {/* Top finial */}
      <Path d="M30 2 L34 9 L26 9 Z" fill="url(#gold)" />
      <Rect x="27.5" y="9" width="5" height="6" rx="1.5" fill="url(#gold)" />

      {/* Top cap */}
      <Path d="M18 18 Q30 12 42 18 L38 23 L22 23 Z" fill="url(#gold)" />

      {/* Lantern body (hexagonal) */}
      <Path
        d="M22 23 L38 23 L44 34 L44 62 L38 73 L22 73 L16 62 L16 34 Z"
        fill="url(#gold)"
      />

      {/* Inner glow panel */}
      <Path
        d="M26 30 L34 30 L38 38 L38 58 L34 66 L26 66 L22 58 L22 38 Z"
        fill="#1F5A44"
        opacity={0.92}
      />
      {/* Crescent accent on the panel */}
      <Path
        d="M33 40 a8 8 0 1 0 0 16 a6 6 0 1 1 0 -16 Z"
        fill="url(#gold)"
      />

      {/* Base */}
      <Path d="M22 73 L38 73 L34 80 L26 80 Z" fill="url(#gold)" />
      <Ellipse cx="30" cy="83" rx="6" ry="2.4" fill="url(#gold)" />
    </Svg>
  );
}
