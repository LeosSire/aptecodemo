import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(public authService: AuthService) { }

  login(){
    if (this.username && this.password){
      this.authService.authLogin(this.username, this.password)
    }    
  }
}
