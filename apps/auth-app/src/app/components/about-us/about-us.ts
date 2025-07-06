import { Component, EventEmitter, Output, signal } from '@angular/core';
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
export class AboutUsComponent {
  aboutUsForm = new FormGroup({
    aboutUs: new FormControl('', [Validators.required]),
  });

  @Output() formSubmitted = new EventEmitter<void>();

  submitted = signal(false);

  onSubmit(): void {
    if (this.aboutUsForm.valid) {
      this.submitted.set(true);
      // Reset form after submission
      this.aboutUsForm.reset();
      // Optionally clear the success message after a delay
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
