import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@coreui/icons-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CubesService } from 'src/app/services/cubes.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonComponentsModule } from 'src/app/components/component.module';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IconModule,
    NgxDatatableModule,
    NgSelectModule,
    CommonComponentsModule,
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    CubesService,
  ]
})
export class DashboardModule {
}
