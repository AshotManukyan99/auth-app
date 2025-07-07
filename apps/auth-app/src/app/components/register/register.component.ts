import {
  Component,
  inject,
  signal,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
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

// Define interface for form value
interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
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
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Output() formSubmitted = new EventEmitter<void>();

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

  ngOnInit() {
    const storedData =
      this.authService.getFromSessionStorage<RegisterPostData>(
        'registeredUser'
      );
    if (storedData) {
      this.registerForm.patchValue({
        email: storedData.email,
        password: storedData.password,
        confirmPassword: storedData.password,
      });
    }
  }

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

    if (this.registerForm.valid) {
      const { ...postData } = this.registerForm.value as RegisterFormData;
      this.authService.saveToSessionStorage<RegisterPostData>(
        'registeredUser',
        postData
      );
      this.formSubmitted.emit();
    }
  }

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
