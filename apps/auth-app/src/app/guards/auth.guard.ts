import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterPostData } from '../interfaces/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ExperienceFormData {
  industry: string;
  years: string;
  role: string;
}

interface AboutUsFormData {
  aboutUs: string;
}

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  // check if user is already logged in registeredUser exists in sessionStorage
  const isLoggedIn = !!authService.getFromSessionStorage<RegisterPostData>('registeredUser');

  if (isLoggedIn) {
    return true;
  }

  // check localStorage for all required fields
  const registeredUser = authService.getFromLocalStorage<RegisterPostData>('registeredUser');
  const experienceData = authService.getFromLocalStorage<ExperienceFormData>('experienceData');
  const aboutUsData = authService.getFromLocalStorage<AboutUsFormData>('aboutUsData');

  // if all three fields exist in localStorage copy to sessionStorage
  if (registeredUser && experienceData && aboutUsData) {
    authService.saveToSessionStorage('registeredUser', registeredUser);
    authService.saveToSessionStorage('experienceData', experienceData);
    authService.saveToSessionStorage('aboutUsData', aboutUsData);
    return true;
  }

  // ff not registered no registeredUser in localStorage show toast and redirect to auth
  if (!registeredUser) {
    snackBar.open('Please fill all fields switch tab and fill', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    }, );
  }

  router.navigate(['/auth']);
  return false;
};
