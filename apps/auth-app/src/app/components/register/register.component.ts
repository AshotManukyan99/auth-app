import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-material',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMismatchValidator,
      updateOn: 'change',
    }
  );

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  togglePassword(event: MouseEvent): void {
    event.preventDefault();
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPassword(event: MouseEvent): void {
    event.preventDefault();
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  onRegister(): void {
    this.registerForm.markAllAsTouched();

    const { confirmPassword, ...postData } = this.registerForm.value as any;
    if (this.registerForm.valid) {
      this.authService.registerUser(postData as RegisterPostData).subscribe({
        next: () => this.router.navigate(['login']),
        error: (err) => console.error(err),
      });
    }
  }

  // get passwordMismatch() {
  //   return (
  //     this.registerForm.hasError('passwordMismatch') &&
  //     this.confirmPassword.touched
  //   );
  // }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }
}
