import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Table, TableLazyLoadEvent } from 'primeng/table';

import { buildMutliAndSingleSelectFilterOptions } from "projects/table-helper/src/lib/utils/table-helpers";
import { TableSendDataParams, TableSettings } from "projects/table-helper/src/lib/utils/table.model";
import { TableHelperService } from "projects/table-helper/src/public-api";

import { FormatDateService } from "../utilities/formatDate.service";
import { COLUMN_TYPES } from "../utilities/table";
import { LazyLoadTriggerService } from "../utilities/lazy-load-trigger.service";
import { GridColumn } from "../utilities/grid-column";

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
})
export class GridComponent {
  @ViewChild('grid') grid!: Table;

  _data: any[] | null = [];

  public get data() {
    return this._data;
  }

  @Input() set data(data: any) {
    if (!data) {
      this._data = null;
      return;
    }

    if (!data.length) {
      this._data = [];
      return;
    }

    this._data = data;
  }

  @Input() columns: GridColumn[] = [];

  @Input() tableName!: string;

  @Input() gridConfig!: TableSettings;

  @Input() errorText: string = '';

  @Input() gridMinWidth: string = '';

  @Input() loadDataService!: (params: TableSendDataParams) => Observable<any>;

  @Input() statusesCssClasses!: Record<string, string>;

  @Output() handleGridRowClick = new EventEmitter();

  @Output() handleGridIconClick = new EventEmitter();

  TYPES = COLUMN_TYPES;

  totalRecords!: number;

  sliderValuesMap: Map<string, number[]> = new Map();

  constructor(
    public formatDateService: FormatDateService,
    private triggerLazyLoad: LazyLoadTriggerService,
    private tableHelperService: TableHelperService
  ) {}

  handleRowClick(rowData: any): void {
    this.handleGridRowClick.emit(rowData.data);
  }

  handleIconClick(rowData: any, icon: string) {
    this.handleGridIconClick.emit({ rowData, icon });
  }

  getDropdownFilterValues(statuses: any): void {
    const columnWithFilters = this.columns.find(
      column =>
        (column.filterType === 'singleDropdown' ||
          column.filterType === 'multipleDropdown') &&
        column.header === Object.keys(statuses)[0]
    );

    if (columnWithFilters) {
      columnWithFilters.multiAndSingleFilterOptions =
        buildMutliAndSingleSelectFilterOptions(
          statuses[Object.keys(statuses)[0]]
        );
    }
  }

  loadData(event: TableLazyLoadEvent): void {
    if (!this.loadDataService) {
      return;
    }
    
    this.sendRequest(event);

    this.triggerLazyLoad.getLazyLoadTrigger().subscribe(() => {
      this.sendRequest(event);
    });
  }

  sendRequest(event: TableLazyLoadEvent): void {
    this.tableHelperService.sendRequest(event, this.loadDataService).subscribe({
      next: (result) => {        
        if (!result) {      
          this.data = [];
        } else {
          this.data = result.data;
          this.totalRecords = result.pageData.totalElements;
          this.gridConfig.totalRecords = this.totalRecords;
        }          
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
