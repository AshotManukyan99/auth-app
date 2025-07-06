// login.component.ts
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
      ],
    ],
    password: ['', Validators.required],
  });

  hidePassword = true;

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onLogin() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.getUserDetails(email, password).subscribe({
        next: (response) => {
          if (response.length >= 1) {
            sessionStorage.setItem('email', email);
            this.router.navigate(['home']);
          } else {
            this.snackBar.open('Something went wrong', 'Close', {
              duration: 3000,
            });
          }
        },
        error: () => {
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
