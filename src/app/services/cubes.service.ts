import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subject } from 'rxjs';
import { Banding, CubeRequest, Dimension, Measure, SelectionModel, TableModel } from '../models/cubes/request';
import { CubeResponse } from '../models/cubes/response/cube-response.model';
import { CubeTable } from '../models/cubes/table.model';

import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class CubesService extends BaseService<CubeResponse> implements OnDestroy {

  headers: HttpHeaders;
  data$: Subject<CubeResponse> = new Subject<CubeResponse>();
  constructor(public override http: HttpClient, private authService: AuthService) {
    super('Cubes/CloudDemo/CalculateSync', http) 
    this.headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${this.authService.getTokenData('accessToken')}`);
  }
  
  override ngOnDestroy(): void {
    // Required for AutoUnsubscribe
  }

  getDemoData(): Observable<CubeResponse> {
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

    this.post(cubesQuery, this.headers ).subscribe(response => {
      this.data$.next(response);
    });

    return this.data$.asObservable();
  }

  mapCubeApiResponseToCubeTable(cubeResponse: CubeResponse, index = 0): CubeTable {
    const colDescription = cubeResponse.dimensionResults[index * 2 + 1].headerDescriptions.split('\t');
    const rowDescription = cubeResponse.dimensionResults[index * 2].headerDescriptions.split('\t');
    const data = cubeResponse.measureResults[index * 2].rows.map(row => { return row.split('\t')});

    
    const temp = rowDescription.map((row, locationIndex) => {
      return colDescription.map((col, yearIndex) => {
        const year = col;
        const cellValue = data[yearIndex][locationIndex];
        return {[year]:cellValue}
      })
    })
    
    const cubeTable = {
      data: data,
      columnDescriptions: colDescription,
      rowDescriptions: rowDescription,
      cells: temp,
    } as CubeTable

    return cubeTable;
  }
}
