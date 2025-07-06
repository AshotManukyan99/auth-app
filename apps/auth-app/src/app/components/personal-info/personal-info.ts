import {
  Component,
  signal,
  inject,
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
  years: string; // Changed to string to match form control
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
export class IndustryExperienceComponent implements OnInit {
  private authService = inject(AuthService);

  @Output() formSubmitted = new EventEmitter<void>();

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

    ngOnInit() {
    const storedData =
      this.authService.getFromSessionStorage<ExperienceFormData>(
        'experienceData'
      );
    if (storedData) {
      this.experienceForm.patchValue({
        industry: storedData.industry,
        years: storedData.years ? storedData.years.toString() : '', // Convert number to string
        role: storedData.role,
      });
    }
  }

  onSubmit() {
    this.experienceForm.markAllAsTouched();
    if (this.experienceForm.valid) {
      const formData: ExperienceFormData = {
        industry: this.experienceForm.value.industry || '',
        years: this.experienceForm.value.years || '',
        role: this.experienceForm.value.role || '',
      };
      this.authService.saveToSessionStorage<ExperienceFormData>(
        'experienceData',
        formData
      );
      this.submitted.set(true);
      this.formSubmitted.emit();
      setTimeout(() => {
        this.submitted.set(false);
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
