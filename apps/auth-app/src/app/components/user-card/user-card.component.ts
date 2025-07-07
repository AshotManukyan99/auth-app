import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interfaces/auth';
import { NgIf, TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface ExperienceFormData {
  industry: string;
  years: string;
  role: string;
}

interface AboutUsFormData {
  aboutUs: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf, RouterLink, TitleCasePipe],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userData: RegisterPostData | null = null;
  experienceData: ExperienceFormData | null = null;
  aboutUsData: AboutUsFormData | null = null;

  ngOnInit() {
    this.userData =
      this.authService.getFromSessionStorage<RegisterPostData>(
        'registeredUser'
      );
    this.experienceData =
      this.authService.getFromSessionStorage<ExperienceFormData>(
        'experienceData'
      );
    this.aboutUsData =
      this.authService.getFromSessionStorage<AboutUsFormData>('aboutUsData');
  }

  clearData() {
    sessionStorage.removeItem('registeredUser');
    sessionStorage.removeItem('experienceData');
    sessionStorage.removeItem('aboutUsData');

    localStorage.clear();

    this.userData = null;
    this.experienceData = null;
    this.aboutUsData = null;
    this.router.navigate(['/auth']);
  }

  logout() {
    sessionStorage.removeItem('registeredUser');
    sessionStorage.removeItem('experienceData');
    sessionStorage.removeItem('aboutUsData');
    this.userData = null;
    this.experienceData = null;
    this.aboutUsData = null;
    this.router.navigate(['login']);
  }
}
