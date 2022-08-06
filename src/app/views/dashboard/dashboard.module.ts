import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CubesService } from 'src/app/services/cubes.service';


@NgModule({
  imports: [
    CommonModule,
    ChartjsModule,
    DashboardRoutingModule,
    IconModule
  ],
  declarations: [DashboardComponent],
  providers: [ CubesService, ]
})
export class DashboardModule {
}
