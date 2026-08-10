import { Injectable, signal } from '@angular/core';

const THEME_STORAGE_KEY = 'aupad-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDarkMode = signal(false);

  constructor() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    this.isDarkMode.set(savedTheme === 'dark');
    this.applyToDocument();
  }

  toggle() {
    this.isDarkMode.update(value => !value);
    this.applyToDocument();
  }

  private applyToDocument() {
    const dark = this.isDarkMode();
    document.documentElement.classList.toggle('dark-theme', dark);
    document.body.classList.toggle('dark-theme', dark);
    localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
  }
}