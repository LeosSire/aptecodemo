import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@coreui/icons-angular';
import { CubesService } from 'src/app/services/cubes.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatatableViewComponent } from './datatable/datatable.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    NgxDatatableModule,
    NgSelectModule,
  ],
  declarations: [
      DatatableViewComponent,
    ],
  providers: [
      CubesService,
    ],
  exports:[
      DatatableViewComponent,
    ]
})
export class CommonComponentsModule {
}
