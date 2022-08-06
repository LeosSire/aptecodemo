import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId = "sidebar";

  userDisplayName:string;

  constructor(
    private classToggler: ClassToggleService,
    public authService: AuthService) {
    super();
    this.userDisplayName = `${authService.getUserData('firstname')} ${authService.getUserData('surname')}`;
  }
}
