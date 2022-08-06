import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/user/login-response.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('accept', 'application/json');
  }  

  login(username: string, password: string): Observable<LoginResponse> {
    const userLogin = {UserLogin: username, Password: password } as UserLogin
    return this.http.post<LoginResponse>('https://www.tealgreenholidays.co.uk/OrbitAPI/CloudDemo/Sessions/SimpleLogin', `UserLogin=${username}&Password=${password}`, {headers: this.headers})
  }
}

export class UserLogin {
  UserLogin = "";
  Password = "";
}