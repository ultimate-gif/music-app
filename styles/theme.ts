import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive helpers
export const wp = (percent: number) => (SCREEN_WIDTH * percent) / 100;
export const hp = (percent: number) => (SCREEN_HEIGHT * percent) / 100;
export const SCREEN_W = SCREEN_WIDTH;
export const SCREEN_H = SCREEN_HEIGHT;

export const colors = {
  background: '#07070f',
  backgroundAlt: '#0d0d1a',

  // Gradient palette
  primaryStart: '#c19cff',
  primaryMid: '#a67ff0',
  primaryEnd: '#ff6a9d',
  accentBlue: '#6a9dff',

  // Text
  textMain: '#f5f5f5',
  textSecondary: '#8a8a9a',
  textMuted: '#55556a',

  // Glass layers
  glassBackground: 'rgba(255, 255, 255, 0.06)',
  glassBackgroundStrong: 'rgba(255, 255, 255, 0.10)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassBorderStrong: 'rgba(193, 156, 255, 0.25)',
  glassInner: 'rgba(255, 255, 255, 0.03)',

  // Surfaces
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceHover: 'rgba(255, 255, 255, 0.08)',
  card: 'rgba(255, 255, 255, 0.05)',

  // Glow / Shadow
  glowPrimary: 'rgba(193, 156, 255, 0.35)',
  glowPink: 'rgba(255, 106, 157, 0.30)',

  // Tab bar
  activeTab: '#c19cff',
  inactiveTab: '#55556a',
};

export const typography = {
  display: { fontSize: 36, fontWeight: '800' as const, color: colors.textMain, letterSpacing: -0.5 },
  h1: { fontSize: 28, fontWeight: '700' as const, color: colors.textMain, letterSpacing: -0.3 },
  h2: { fontSize: 20, fontWeight: '700' as const, color: colors.textMain, letterSpacing: -0.2 },
  h3: { fontSize: 16, fontWeight: '600' as const, color: colors.textMain },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.textMain },
  caption: { fontSize: 13, fontWeight: '400' as const, color: colors.textSecondary },
  small: { fontSize: 11, fontWeight: '400' as const, color: colors.textMuted },
  label: { fontSize: 11, fontWeight: '700' as const, color: colors.textSecondary, letterSpacing: 1.2, textTransform: 'uppercase' as const },
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const layout = {
  radiusXs: 8,
  radiusSmall: 12,
  radiusMain: 20,
  radiusLarge: 28,
  radiusFull: 999,
  tabBarHeight: 64,
  miniPlayerHeight: 72,
  headerPaddingTop: hp(6),
};

// Reusable shadow presets
export const shadows = {
  primary: {
    shadowColor: colors.primaryStart,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  pink: {
    shadowColor: colors.primaryEnd,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const globalStyles = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeTop: {
    paddingTop: layout.headerPaddingTop,
  },
  glassContainer: {
    backgroundColor: colors.glassBackground,
    borderRadius: layout.radiusMain,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden' as const,
  },
  glassContainerStrong: {
    backgroundColor: colors.glassBackgroundStrong,
    borderRadius: layout.radiusMain,
    borderWidth: 1,
    borderColor: colors.glassBorderStrong,
    overflow: 'hidden' as const,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
};
