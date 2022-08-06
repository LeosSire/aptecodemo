import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banding, CubeRequest, Dimension, Measure, SelectionModel, TableModel } from '../models/cubes/request';
import { CubeResponse } from '../models/cubes/response/cube-response.model';
import { CubeTable } from '../models/cubes/table.model';

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

  calculateSync(): Observable<CubeResponse> {
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
        } as Dimension,
        {
          id: "dimension-2",
          type: "DateBand",
          variableName: "boDate",
          banding: {
            type: "Years"
          } as Banding,
        } as Dimension,
      ],
      measures: [
        {
          id: "measure-1",
          displayName: "Count",
          resolveTableName: "People",
          function: "Count"
        } as Measure
      ],
      subTotals: "All"
    } as CubeRequest;
    return this.http.post<CubeResponse>('https://www.tealgreenholidays.co.uk/OrbitAPI/CloudDemo/Cubes/CloudDemo/CalculateSync', cubesQuery, { headers: this.headers })
  }

  mapCubeApiResponseToCubeTable(cubeResponse: CubeResponse, index = 0): CubeTable {
    const colDescription = cubeResponse.dimensionResults[index * 2].headerDescriptions.split('\t');
    const rowDescription = cubeResponse.dimensionResults[index * 2 + 1].headerDescriptions.split('\t');
    const data = cubeResponse.measureResults[index * 2].rows.map(row => { return row.split('\t')});
    
    const cubeTable = {
      data: data,
      columnDescriptions: colDescription,
      rowDescriptions: rowDescription,
    } as CubeTable

    return cubeTable;
  }
}
