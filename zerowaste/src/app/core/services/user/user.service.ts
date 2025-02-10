import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Helper function to get all users
  private getUsersFromStorage(): User[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Helper function to save the new collection of users
  private saveUsersToStorage(users: User[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  register(user: User): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const users = this.getUsersFromStorage();
    if (users.some(u => u.email === user.email)) {
      return throwError(() => new Error('User with this email already exists'));
    }

    users.push(user);
    this.saveUsersToStorage(users);
    return of(user);
  }

  // READ: Get all users
  getUsers(): Observable<User[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    return of(this.getUsersFromStorage());
  }

  getUserByEmail(email: string): Observable<User | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const users = this.getUsersFromStorage();
    const foundUser = users.find(u => u.email === email);
    return of(foundUser ? foundUser : null);
  }

  getUserById(id: string): Observable<User | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const users = this.getUsersFromStorage();
    const foundUser = users.find(u => u.id === id);
    return of(foundUser ? foundUser : null);
  }

  // UPDATE: Update a user's details
  updateUser(user: User): Observable<User> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const users = this.getUsersFromStorage();
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    // Update the user data
    users[index] = user;
    this.saveUsersToStorage(users);
    return of(user);
  }

  // DELETE: Remove a user by email
  deleteUser(email: string): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return throwError(() => new Error('Not running in a browser environment'));
    }

    const users = this.getUsersFromStorage();
    const updatedUsers = users.filter(u => u.email !== email);
    if (updatedUsers.length === users.length) {
      return throwError(() => new Error('User not found'));
    }

    this.saveUsersToStorage(updatedUsers);
    return of(true);
  }


}
