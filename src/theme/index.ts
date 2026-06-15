export { colors } from './colors';
export type { AppColors } from './colors';
export { fonts } from './typography';
export type { AppFonts } from './typography';

// Shared layout constants
export const layout = {
  screenPadding: 16,
  radiusCard: 18,
  radiusSmall: 8,
  radiusInput: 12,
  radiusButton: 14,
  radiusPill: 9999,
} as const;

// Reusable elevated-card shadow (iOS + Android)
export const cardShadow = {
  shadowColor: '#15402F',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.14,
  shadowRadius: 16,
  elevation: 4,
} as const;

export const ctaShadow = {
  shadowColor: '#15402F',
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.22,
  shadowRadius: 28,
  elevation: 10,
} as const;
