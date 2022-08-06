import { Component, OnInit } from '@angular/core';
import { CubeResponse } from 'src/app/models/cubes/response/cube-response.model';
import { CubeTable } from 'src/app/models/cubes/table.model';
import { CubesService } from 'src/app/services/cubes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  cubesResponse: any;
  cubeTable: CubeTable | undefined;

  constructor(public cubesService: CubesService) {

  }

  ngOnInit(): void {
      this.cubesService.calculateSync().subscribe((resp: CubeResponse) => {
        this.cubesResponse = resp;
        this.cubeTable = this.cubesService.mapCubeApiResponseToCubeTable(resp);
      }, err => {
        console.log("Cubes Servuce Error", err);
      });
  }
}
