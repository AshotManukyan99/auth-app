import { Component, signal, inject } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from '../../components/register/register.component';
import { IndustryExperienceComponent } from '../../components/personal-info/personal-info.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';

interface ExperienceFormData {
  industry: string;
  years: string;
  role: string;
}

interface AboutUsFormData {
  aboutUs: string;
}

@Component({
  selector: 'app-auth-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    RegisterComponent,
    IndustryExperienceComponent,
    AboutUsComponent,
  ],
  templateUrl: './auth-stepper.html',
  styleUrls: ['./auth-stepper.scss'],
})
export class AuthStepperComponent {
  currentStep = signal(0);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private totalSteps = 3;

  constructor() {
    // initialize currentStep from URL query parameter
    this.route.queryParams.subscribe((params) => {
      const step = params['step'];
      if (step !== undefined && !isNaN(+step)) {
        const stepIndex = Math.max(0, Math.min(+step, this.totalSteps - 1));
        this.currentStep.set(stepIndex);
      }
    });
  }

  setStep(index: number) {
    this.currentStep.set(index);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: index },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onRegisterFormSubmitted() {
    const nextStep = Math.min(this.currentStep() + 1, this.totalSteps - 1);
    this.setStep(nextStep);
  }

  onAboutUsSubmitted() {
    const registeredUser =
      this.authService.getFromSessionStorage<RegisterPostData>(
        'registeredUser'
      );
    const experienceData =
      this.authService.getFromSessionStorage<ExperienceFormData>(
        'experienceData'
      );
    const aboutUsData =
      this.authService.getFromSessionStorage<AboutUsFormData>('aboutUsData');
    if (registeredUser) {
      this.authService.saveToLocalStorage('registeredUser', registeredUser);
    }
    if (experienceData) {
      this.authService.saveToLocalStorage('experienceData', experienceData);
    }
    if (aboutUsData) {
      this.authService.saveToLocalStorage('aboutUsData', aboutUsData);
    }
    this.router.navigate(['/user-card']);
  }
}
