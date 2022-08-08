import { Component, Input, ViewChild } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
})
export class DatatableViewComponent {
  @ViewChild('mainTable') mainTable!: DatatableComponent;
  @ViewChild('totalTable') totalTable!: DatatableComponent;

  @Input() filteredRows: any[] | undefined;
  @Input() filteredColumns: TableColumn[] = [];
  @Input() totals: any[] | undefined;

  onScroll(event: any): void {
    this.mainTable.element.scrollLeft = event.offsetX; 
  }
}
