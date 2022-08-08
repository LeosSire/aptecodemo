import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CubeResponse } from 'src/app/models/cubes/response/cube-response.model';
import { CubeTable } from 'src/app/models/cubes/table.model';
import { CubesService } from 'src/app/services/cubes.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

// As this application is single use, the dashboard component contains a lot of functionallity. If this 
// was part of a larger app, this would be placed in appropriate services or components. 

@AutoUnsubscribe()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  cubeTable: CubeTable | undefined;
  columns: any[] = [];
  @ViewChild('mainTable') mainTable!: DatatableComponent;
  @ViewChild('totalTable') totalTable!: DatatableComponent;

  rows: any[] = []; // With more time create objects for type safety.
  totals: any[] = []; // With more time create objects for type safety.
  filteredRows: any[] = []; // With more time create objects for type safety.
  filteredColumns: TableColumn[] = [];
  countryFilterOptions: any; // With more time create objects for type safety.
  yearFilterOptions:any; // With more time create objects for type safety.
  loaded = false; // No need to declate type as linting rules confirm 'type by inference'
  
  constructor(public cubesService: CubesService) { }
  
  ngOnDestroy(): void {
    // Required for AutoUnsubscribe
  }

  ngOnInit(): void {
    this.subs();
    this.getServerData();
  }

  onScroll(event: any): void {
    this.mainTable.element.scrollLeft = event.offsetX; 
  }

  filterByCountry(term: string): void {
    this.filteredRows = this.rows.filter(row => row.country.contains(term))
  }

  selectCountry(countries:any): void {
    console.log(countries);
  }

  setCountrySelectOptions(): void {
      this.countryFilterOptions = this.cubeTable?.rowDescriptions.map((row) => { return {id: row, name: row }; })
  }

  setYearsOptions(): void {
    this.yearFilterOptions = this.columns
    .filter(column => column.name !== "Country")
    .map(column => { return column.name; });
  }

  onCountrySelect(countries: string[]): void {
    if (countries.length == 0) {
      this.filteredRows = this.rows;
    } else {
      this.filteredRows = this.rows.filter(row => countries.includes(row.country))
    }
  }

  onYearSelect(years: string[]): void {
    if (years.length == 0) {
      this.filteredColumns = this.columns;
    } else {
      this.filteredColumns =  [ { name: "Country", prop: 'country' }].concat(this.columns.filter(column => years.includes(column.name)));
    }
  }

  setTableData(cubeTable: CubeTable){

    this.columns = [
      { name: "Country", prop: 'country' },
    ].concat(cubeTable.columnDescriptions.map(col => { return { prop: col, name: col } }))

    const rows: any[] = [];
    cubeTable.cells.forEach((row: any[], index) => {
      if (this.cubeTable?.rowDescriptions[index] !== undefined) {
        row.unshift({ country: this.cubeTable?.rowDescriptions[index] });
      }
      rows.push(row.reduce((accumulator, obj) => ({ ...accumulator, ...obj }), {}));
    });

    // With more time look about off setting these to the component and only send the cubeTable object.
    this.rows = rows.filter(row => row.country !== "iTOTAL");
    this.totals = rows.filter(row => row.country === "iTOTAL");
    this.filteredRows = this.rows;
    this.filteredColumns = this.columns;
  }

  subs(){
    this.cubesService.data$.subscribe((resp: CubeResponse) => {
      this.cubeTable = this.cubesService.mapCubeApiResponseToCubeTable(resp);
      this.setTableData(this.cubeTable);
      this.setCountrySelectOptions();
      this.setYearsOptions();
      this.loaded = true;
    }, err => {
      console.log("Cubes Servuce Error", err);
    })
  }

  getServerData(): void{
    this.loaded = false;   
    this.cubesService.getDemoData()
  }
}
