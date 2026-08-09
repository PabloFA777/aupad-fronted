import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('aupad-frontend');
  readonly isDarkMode = signal(false);

  ngOnInit() {
    const savedTheme = localStorage.getItem('aupad-theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode.update(value => !value);
    this.applyTheme();
  }

  private applyTheme() {
    const dark = this.isDarkMode();
    document.documentElement.classList.toggle('dark-theme', dark);
    document.body.classList.toggle('dark-theme', dark);
    localStorage.setItem('aupad-theme', dark ? 'dark' : 'light');
  }
}
