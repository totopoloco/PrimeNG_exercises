export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
}
