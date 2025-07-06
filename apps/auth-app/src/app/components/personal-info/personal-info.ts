import { Component, signal, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

export enum UserRole {
  Developer = 'developer',
  Manager = 'manager',
  Designer = 'designer',
}

export enum Industry {
  Marketing = 'marketing',
  IT = 'it',
  'Financial services' = 'financial_services',
}

interface ExperienceFormData {
  industry: string;
  years: number | null;
  role: string;
}

@Component({
  selector: 'app-industry-experience',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
    NgForOf,
  ],
  templateUrl: './personal-info.html',
  styleUrls: ['./personal-info.scss'],
})
export class IndustryExperienceComponent {
  private authService = inject(AuthService);

  experienceForm = new FormGroup({
    industry: new FormControl('', [Validators.required]),
    years: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(50),
    ]),
    role: new FormControl('', [Validators.required]),
  });

  submitted = signal(false);

  roles = [
    { value: UserRole.Developer, label: 'Developer' },
    { value: UserRole.Manager, label: 'Manager' },
    { value: UserRole.Designer, label: 'Analyst' },
  ];

  industries = [
    { value: Industry.Marketing, label: 'Marketing' },
    { value: Industry.IT, label: 'IT' },
    { value: Industry['Financial services'], label: 'Financial Services' },
  ];

  onSubmit() {
    this.experienceForm.markAllAsTouched();
    if (this.experienceForm.valid) {
      const formData: ExperienceFormData = this.experienceForm
        .value as ExperienceFormData;
      // Save form data to sessionStorage
      this.authService.saveToSessionStorage<ExperienceFormData>(
        'experienceData',
        formData
      );
      this.submitted.set(true);
      setTimeout(() => {
        this.submitted.set(true);
        this.experienceForm.reset();
      }, 2000);
    }
  }

  get industry() {
    return this.experienceForm.get('industry')!;
  }

  get years() {
    return this.experienceForm.get('years')!;
  }

  get role() {
    return this.experienceForm.get('role')!;
  }
}
