import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private usernameSubject = new BehaviorSubject<string | null>(null);
  private imageUrlSubject = new BehaviorSubject<string | null>(null);

  username$ = this.usernameSubject.asObservable();
  imageUrl$ = this.imageUrlSubject.asObservable();

  constructor() {
    // Initialize user data from localStorage on application startup
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.setUserData(parsedUserData);
    }
  }

  setUserData(userData: any) {
    this.usernameSubject.next(userData.username || null);
    this.imageUrlSubject.next(userData.profileImage || null);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clearUserData() {
    this.usernameSubject.next(null);
    this.imageUrlSubject.next(null);
    localStorage.removeItem('userData');
  }


}
