import { Injectable } from '@angular/core';
import { RegisterPostData } from '../interfaces/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUser(postData: RegisterPostData): Observable<any> {
    // Save email and password to localStorage
    this.saveToLocalStorage('registeredUser', postData);
    return of({ success: true }); // Simulate successful registration
  }

  saveToSessionStorage<T>(key: string, data: T): void {
    // Save any data to sessionStorage as JSON string
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getFromSessionStorage<T>(key: string): T | null {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  saveToLocalStorage<T>(key: string, data: T): void {
    // Save any data to localStorage as JSON string
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage<T>(key: string): T | null {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  getUserDetails(email: string, password: string): Observable<any> {
    const storedUser =
      this.getFromLocalStorage<RegisterPostData>('registeredUser');
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      return of([{ email, password }]);
    }
    return of([]);
  }
}
