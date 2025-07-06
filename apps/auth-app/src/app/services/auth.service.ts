import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, postData).pipe(
      tap((response) => {
        // Save relevant data to sessionStorage after successful registration
        this.saveToSessionStorage('isSessionSaved', postData);
      })
    );
  }

  saveToSessionStorage<T>(key: string, data: T): void {
    // Save any data to sessionStorage as JSON string
    sessionStorage.setItem(key, JSON.stringify(data));
    // this.authStepper.setStep()
  }

  getUserDetails(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}`
    );
  }
}
