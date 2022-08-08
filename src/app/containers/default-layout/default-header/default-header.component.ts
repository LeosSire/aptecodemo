import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { AuthService } from 'src/app/services/auth.service';
import { cilBell, cilMenu, flagSet } from '@coreui/icons';


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId = "sidebar";

  userDisplayName: string;

  constructor(
    private classToggler: ClassToggleService,
    public iconSet: IconSetService,
    public authService: AuthService) {
    super();
    this.userDisplayName = `${authService.getUserData('firstname')} ${authService.getUserData('surname')}`;
    iconSet.icons = { cilBell, cilMenu, ...flagSet };
  }
}
