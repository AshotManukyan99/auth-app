import { Component, signal, effect } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-auth-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    RegisterComponent,
    LoginComponent,
  ],
  templateUrl: './auth-stepper.html',
  styleUrl: './auth-stepper.scss',
})
export class AuthStepperComponent {
  currentStep = signal(0);

  constructor() {
    effect(() => {
      console.log('Current step:', this.currentStep());
    });
  }

  setStep(index: number) {
    this.currentStep.set(index);
  }
}
