import { Component } from '@angular/core';
import { cilMagnifyingGlass, flagSet } from '@coreui/icons';
import { IconSetService } from '@coreui/icons-angular';

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
})
export class Page500Component {

  constructor(
    public iconSet: IconSetService,
  ) {
    iconSet.icons = { cilMagnifyingGlass, ...flagSet };
   }

}
