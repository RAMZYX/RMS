// Font family keys match the names exported by @expo-google-fonts/* and
// registered in App.tsx via useFonts. Use these constants in StyleSheet.

export const fonts = {
  // Marcellus – serif display (headings, titles)
  serif: 'Marcellus_400Regular',

  // Mulish – sans body, multiple weights
  regular: 'Mulish_400Regular',
  medium: 'Mulish_500Medium',
  semibold: 'Mulish_600SemiBold',
  bold: 'Mulish_700Bold',
  extrabold: 'Mulish_800ExtraBold',
  italic: 'Mulish_400Regular_Italic',

  // Amiri – Arabic salawat
  arabic: 'Amiri_400Regular',
} as const;

export type AppFonts = typeof fonts;
