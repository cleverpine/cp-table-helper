import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";

import { TableSendDataParams, TableSettings } from "projects/table-helper/src/lib/utils/table.model";

import { COLUMN_TYPES, DEFAULT_TABLE_SETTINGS } from "../utilities/table";

@Component({
  selector: "example-table",
  templateUrl: "./example-table.component.html",
})
export class ExampleTableComponent implements OnInit {
    columns = [
    {
      field: 'type',
      propertyName: 'name',
      header: 'acType',
      type: COLUMN_TYPES.textField,
      sortable: true,
    },
    {
      field: 'msn',
      header: 'msn',
      type: COLUMN_TYPES.textField,
      sortable: true,
    },
  ]

  gridConfig: TableSettings = {
    ...DEFAULT_TABLE_SETTINGS,
    rows: 10,
    rowsPerPageConfig: [10, 20, 50],
    paginator: true,
    excelExport: true,
    isRowClickable: true,
    hideFilters: false,
  };

  ngOnInit(): void {
    this.loadDataService = this.loadDataService.bind(this);
  }

  loadDataService(
    tableSendDataParams: TableSendDataParams
  ): Observable<any> {
    // data that should be sent as a body including table params
    const sendData: any = {
      ...tableSendDataParams,
    };

    // should send request and pass body to it
    return this.getData();
  }

  // mock request
  getData(): Observable<any> {
    const mockData = {
      data: [
        {
          id: 1,
          msn: '123',
          type: {
            id: 1,
            name: 'A320',
          }
        }
      ],
      pageData: {
        totalPages: 1,
        totalElements: 1,
        size: 10,
        number: 0,
      }
    };

    return of(mockData)
  }
}