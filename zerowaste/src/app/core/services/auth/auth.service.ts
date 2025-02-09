import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  login(email: string, password: string): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      return throwError(() => new Error('No users found in localStorage'));
    }

    try {
      const users: User[] = JSON.parse(storedUsers);
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        return of(foundUser);
      } else {
        return throwError(() => new Error('Invalid credentials'));
      }
    } catch (error) {
      return throwError(() => new Error('Error parsing users data'));
    }
  }
}
