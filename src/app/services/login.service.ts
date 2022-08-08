import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/user/response/login-response.model';
import { BaseService } from './base.service';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<LoginResponse> implements OnDestroy {

  headers: HttpHeaders;
  constructor(public override http: HttpClient) {
    super('Sessions/SimpleLogin', http)
    this.headers = new HttpHeaders()
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('accept', 'application/json');
  }  

  override ngOnDestroy(): void {
    // Required for AutoUnsubscribe
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.post(`UserLogin=${username}&Password=${password}`, this.headers)
  }
}
