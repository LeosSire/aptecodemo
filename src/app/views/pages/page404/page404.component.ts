import { Component } from '@angular/core';
import { cilMagnifyingGlass, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
})
export class Page404Component {

  constructor(
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { cilMagnifyingGlass, ...flagSet };
   }
}
