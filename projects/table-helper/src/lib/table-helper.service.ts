import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { TableLazyLoadEvent } from 'primeng/table';

import { transformFiltersForRequest, transformSortForRequest } from "./utils/table-helpers";
import { FilterValues } from "./utils/table.model";

@Injectable({
  providedIn: 'root'
})
export class TableHelperService {
  sendRequest(
    event: TableLazyLoadEvent,
    loadDataService: (params: any) => Observable<any>
  ): Observable<any> {
    const currentPage = (event.first as number) / (event.rows as number) + 1;

    const params = {
      filter: transformFiltersForRequest(event.filters as FilterValues),
      sort: event.multiSortMeta && transformSortForRequest(event.multiSortMeta),
      page: currentPage,
      size: event.rows,
    };

    return loadDataService(params);
  }
}
