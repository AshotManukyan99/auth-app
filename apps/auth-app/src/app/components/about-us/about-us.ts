import {
  Component,
  EventEmitter,
  Output,
  signal,
  inject,
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
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface AboutUsFormData {
  aboutUs: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss'],
})
export class AboutUsComponent implements OnInit {
  private authService = inject(AuthService);

  aboutUsForm = new FormGroup({
    aboutUs: new FormControl('', [Validators.required]),
  });

  @Output() formSubmitted = new EventEmitter<void>();

  submitted = signal(false);

  ngOnInit() {
    const storedData =
      this.authService.getFromSessionStorage<AboutUsFormData>('aboutUsData');
    if (storedData) {
      this.aboutUsForm.patchValue({
        aboutUs: storedData.aboutUs,
      });
    }
  }

  onSubmit(): void {
    this.aboutUsForm.markAllAsTouched();
    if (this.aboutUsForm.valid) {
      const formData: AboutUsFormData = {
        aboutUs: this.aboutUsForm.value.aboutUs || '',
      };
      this.authService.saveToSessionStorage('aboutUsData', formData);
      this.submitted.set(true);
      // Reset form after submission
      this.aboutUsForm.reset();
      // Clear the success message and emit event after a delay
      setTimeout(() => {
        this.submitted.set(false);
        this.formSubmitted.emit();
      }, 3000);
    }
  }

  get aboutUs() {
    return this.aboutUsForm.get('aboutUs')!;
  }
}
