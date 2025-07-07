import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AuthStepperComponent } from './layout/auth-stepper/auth-stepper';
import { UserCardComponent } from './components/user-card/user-card.component';

export const routes: Routes = [
  { path: 'auth', component: AuthStepperComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'user-card', component: UserCardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
