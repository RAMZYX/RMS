// Design tokens extracted from the Figma "Miqāt Registration" design.
// Colors are grouped semantically so screens read clearly.

export const colors = {
  // Brand greens
  greenDarkest: '#0E2D21', // hero gradient top
  greenDark: '#15402F', // headings, gradient mid
  green: '#1F5A44', // primary brand / buttons
  greenLight: '#2D6E54', // hero gradient bottom

  // Golds
  gold: '#E3CD96', // primary gold accent
  goldDark: '#A8843E', // divider headings / labels
  goldEdge: '#C9A45C', // gold gradient edge / checkbox border

  // Surfaces
  white: '#FFFFFF',
  cream: '#FFFDF8', // card / panel cream
  creamScrim: '#F8F4EA', // sticky CTA fade target
  cardBorder: '#E7DFC9',
  cardBorderLight: '#ECE4D2',
  inputBg: '#FBFBFB',

  // Text
  textOnGreen: '#F8F4EA',
  textName: '#23302A',
  textBody: '#5A6660',
  textMuted: '#8A938E',
  textNoticeBody: '#23302A',
  placeholder: '#757575',

  // Breadcrumb
  crumbInactive: '#8A938E',
  crumbActive: '#1F5A44',

  // Status / accents
  notifRed: '#B23B3B',

  // Badges
  registrantBg: '#E4EFE7',
  registrantText: '#276245',
  dependentBg: '#FBF2D8',
  dependentText: '#9F8127',
  linkedBg: '#E1EEF1',
  linkedText: '#2E6A7D',

  // Warning row
  warningBg: 'rgba(254,237,201,0.2)',
  warningBorder: 'rgba(222,124,0,0.3)',
  warningText: 'rgba(51,27,6,0.9)',
  assignText: '#0C3D22',
  assignBorder: 'rgba(12,61,34,0.2)',

  // Countdown – active (peach/gold) variant
  countPeachBg: '#FFF7F5',
  countPeachBorder: 'rgba(227,205,150,0.3)',
  countPeachNumber: '#993C1D',
  countPeachLabel: '#D85A30',

  // Countdown – upcoming (blue) variant
  countBlueBg: '#E1EEF1',
  countBlueNumber: '#2E6A7D',
  countBlueLabel: '#4D93A9',

  // Stat / value text
  statGreen: '#1F5A44',
  statGold: '#A8843E',
} as const;

export type AppColors = typeof colors;
