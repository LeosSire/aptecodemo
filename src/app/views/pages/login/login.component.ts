import { Component } from '@angular/core';
import { cilLockLocked, cilUser, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(
    public authService: AuthService,
    public iconSet: IconSetService,
    ) {
      iconSet.icons = { cilLockLocked, cilUser, ...flagSet };
     }

  login(){
    if (this.username && this.password){
      this.authService.authLogin(this.username, this.password)
    }    
  }
}
