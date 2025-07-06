import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AuthStepperComponent } from './layout/auth-stepper/auth-stepper';
import { IndustryExperienceComponent } from './components/personal-info/personal-info';

export const routes: Routes = [
  { path: 'auth', component: AuthStepperComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: IndustryExperienceComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
