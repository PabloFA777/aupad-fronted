import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppBrandComponent } from '../../../../shared/components/app-brand/app-brand.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, AppBrandComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = 'admin@aupad.com';
  password = '123456';
  errorMessage = '';

  login() {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.errorMessage = '';
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Credenciales inválidas';
    }
  }
}
