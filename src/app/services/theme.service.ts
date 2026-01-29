import { Injectable, signal, effect } from '@angular/core';
import { Theme } from '../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme();

    // Watch for theme changes and apply them
    effect(() => {
      this.applyTheme();
    });
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getInitialTheme(): Theme {
    if (this.isBrowser()) {
      const saved = localStorage.getItem(this.THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  }

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
    if (this.isBrowser()) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  private applyTheme() {
    if (this.isBrowser()) {
      const currentTheme = this.theme();
      document.documentElement.setAttribute('data-theme', currentTheme);
      console.log(`Applied theme: ${currentTheme}`);

      // Update body background if needed
      if (currentTheme === 'dark') {
        document.body.style.backgroundColor = '#242424';
      } else {
        document.body.style.backgroundColor = '#ffffff';
      }
    }
  }
}
