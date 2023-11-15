export interface Filter {
  value: string;
  matchMode: string;
}

export interface FilterValues {
  [key: string]: Filter | Filter[];
}

export interface SortValues {
  field: string;
  order: number;
}

export interface ColumnMultiAndSingleSelectFilterOptions {
  label: string;
  value: string;
}

export interface TableSettings {
  rows?: number;
  rowsPerPageConfig?: number[];
  paginator?: boolean;
  excelExport?: boolean;
  totalRecords?: number;
  hideFilters?: boolean;
  isRowClickable?: boolean;
}

export interface TableSendDataParams {
  filter?: string[];
  sort?: string[];
  page?: number;
  size?: number;
}
