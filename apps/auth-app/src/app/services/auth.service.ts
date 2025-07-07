import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveToSessionStorage<T>(key: string, data: T): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getFromSessionStorage<T>(key: string): T | null {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  saveToLocalStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage<T>(key: string): T | null {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  getUserDetails(email: string, password: string): Observable<User[]> {
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
