import { Component } from '@angular/core';
import { cilDrop, cilSpeedometer, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { cilSpeedometer, cilDrop, ...flagSet };
   }
}
