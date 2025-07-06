import { Component, effect, signal } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

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
  currentStep = signal(1);

  constructor() {
    effect(() => {
      console.log('Current step:', this.currentStep());
    });
  }

  setStep(index: number) {
    this.currentStep.set(index);
  }
}
