import { Component, OnInit } from '@angular/core';
import { CubesService } from 'src/app/services/cubes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  cubesResponse: any;

  constructor(public cubesService: CubesService) {

  }

  ngOnInit(): void {
      this.cubesService.calculateSync().subscribe(resp => {
        this.cubesResponse = resp;
      }, err => {
        console.log("Cubes Servuce Error", err);
      });
  }
}
