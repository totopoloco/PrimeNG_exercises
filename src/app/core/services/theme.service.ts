import { Injectable, signal, effect } from '@angular/core';
import type { ThemeMode, ThemeState } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme-mode';
  private readonly mediaQuery: MediaQueryList;

  private readonly themeState = signal<ThemeState>({
    mode: this.getStoredTheme(),
    effectiveTheme: 'light'
  });

  readonly currentTheme = this.themeState.asReadonly();

  constructor() {
    this.mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    this.updateEffectiveTheme();
    this.setupMediaQueryListener();

    effect(() => {
      const state = this.themeState();
      this.applyTheme(state.effectiveTheme);
    });
  }

  setTheme(mode: ThemeMode): void {
    localStorage.setItem(this.STORAGE_KEY, mode);
    this.themeState.update(state => ({
      ...state,
      mode
    }));
    this.updateEffectiveTheme();
  }

  private getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  private updateEffectiveTheme(): void {
    const state = this.themeState();
    let effectiveTheme: 'light' | 'dark';

    if (state.mode === 'system') {
      effectiveTheme = this.mediaQuery.matches ? 'dark' : 'light';
    } else {
      effectiveTheme = state.mode;
    }

    this.themeState.update(s => ({
      ...s,
      effectiveTheme
    }));
  }

  private setupMediaQueryListener(): void {
    this.mediaQuery.addEventListener('change', () => {
      if (this.themeState().mode === 'system') {
        this.updateEffectiveTheme();
      }
    });
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('app-dark');
      root.classList.remove('app-light');
    } else {
      root.classList.add('app-light');
      root.classList.remove('app-dark');
    }
  }
}
