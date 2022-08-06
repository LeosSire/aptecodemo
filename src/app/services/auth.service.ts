/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginResponse } from '../models/user/login-response.model';
import { User } from '../models/user/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | undefined;
  loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private loginService: LoginService,
  ) {
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  postLoginCheck() {
    if (this.isLoggedIn && this.router.url === '/login') {
      this.router.navigate(['/dashboard']);
    }
  }

  getTokenData(key: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user[key];
  }

  getUserData(key: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user['user'][key];
  }

  getLicenceData(key: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user['licence'][key];
  }

  authLogin(username: string, password: string) {
    localStorage.removeItem('user');
    this.loginService.login(username, password).subscribe((user: LoginResponse) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log("Login Error", err);
      this.signOut();    
    })
  }

  signOut() {
    localStorage.setItem('user', '');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
