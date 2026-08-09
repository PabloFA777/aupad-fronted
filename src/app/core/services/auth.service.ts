import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isAuthenticated = signal(false);

  login(email: string, password: string): boolean {
    const valid = email.trim().toLowerCase() === 'admin@aupad.com' && password === '123456';
    this.isAuthenticated.set(valid);
    return valid;
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}
