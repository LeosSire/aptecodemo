import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableModule } from '@coreui/angular';
import { Observable } from 'rxjs';
import { CubeRequest, SelectionModel, TableModel } from '../models/cubes/cube-request.model';
import { Banding, Dimensions } from '../models/cubes/dimensions.model';
import { Measures } from '../models/cubes/measures.model';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CubesService {

  headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getTokenData('accessToken')}`);
  }

  calculateSync(): Observable<any> {
    const cubesQuery = {
      baseQuery: {
        selection: {          
          tableName: 'People'
        } as TableModel,
      } as SelectionModel,
      resolveTableName: 'People',
      storage: 'Full',
      leftJoin: false,
      dimensions: [
        {
          id: "dimension-1",
          type: "Selector",
          variableName: "boDest"
        } as Dimensions,
        {
          id: "dimension-2",
          type: "DateBand",
          variableName: "boDate",
          banding: {
            type: "Weeks"
          } as Banding,
        } as Dimensions,
      ],
      measures: [
        {
          id: "measure-1",
          displayName: "Count",
          resolveTableName: "People",
          function: "Count"
        } as Measures
      ],
      subTotals: "All"
    } as CubeRequest;
    return this.http.post<any>('https://www.tealgreenholidays.co.uk/OrbitAPI/CloudDemo/Cubes/CloudDemo/CalculateSync', cubesQuery, { headers: this.headers })
  }
}
