import { Component, effect, signal, inject } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterComponent } from '../../components/register/register.component';
import { IndustryExperienceComponent } from '../../components/personal-info/personal-info';
import { AboutUsComponent } from '../../components/about-us/about-us';

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
  styleUrl: './auth-stepper.scss',
})

export class AuthStepperComponent {
  currentStep = signal(0);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    // Initialize currentStep from URL query parameter
    this.route.queryParams.subscribe((params) => {
      const step = params['step'];
      if (step !== undefined && !isNaN(+step)) {
        const stepIndex = Math.max(0, Math.min(+step, 2));
        this.currentStep.set(stepIndex);
      }
    });

    // Log current step changes
    effect(() => {
      console.log('Current step:', this.currentStep());
    });
  }

  setStep(index: number) {
    this.currentStep.set(index);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: index },
      queryParamsHandling: 'merge',
      replaceUrl: true  ,
    });
  }
}
