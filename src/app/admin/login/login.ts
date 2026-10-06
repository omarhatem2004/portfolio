import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = signal('');
  password = signal('');
  error = signal('');

  submit() {
    this.error.set('');
    this.auth.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error.set('Wrong email or password'),
    });
  }
}