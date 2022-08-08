/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginResponse } from '../models/user/response/login-response.model';
import { User } from '../models/user/response/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User | undefined;
  loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(
    public router: Router,
    private loginService: LoginService,
  ) {
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('DemoUser')!);
    return user !== null;
  }

  postLoginCheck() {
    if (this.isLoggedIn && this.router.url === '/login') {
      this.router.navigate(['/dashboard']);
    }
  }

  getTokenData(key: string) {
    const user = JSON.parse(localStorage.getItem('DemoUser')!);
    return user[key];
  }

  getUserData(key: string) {
    const user = JSON.parse(localStorage.getItem('DemoUser')!);
    return user['user'][key];
  }

  getLicenceData(key: string) {
    const user = JSON.parse(localStorage.getItem('DemoUser')!);
    return user['licence'][key];
  }

  authLogin(username: string, password: string) {
    localStorage.removeItem('DemoUser');
    this.loginService.login(username, password).subscribe((user: LoginResponse) => {
      localStorage.setItem('DemoUser', JSON.stringify(user));
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      console.log("Login Error", err);
      this.signOut();    
    })
  }

  signOut() {
    localStorage.setItem('DemoUser', '');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
