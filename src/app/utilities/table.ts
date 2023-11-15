import { TableSettings } from "projects/table-helper/src/lib/utils/table.model";

export const TABLE_NAMES = {
  aircraftOverview: 'aircraftOverview',
  engines: 'engines',
  assets: 'assets',
  maintenanceEvents: 'maintenanceEvents',
};

export enum COLUMN_TYPES {
  textField = 'textField',
  number = 'number',
  date = 'date',
  dateTime = 'dateTime',
  icons = 'icons',
  status = 'status',
}

export const DEFAULT_ROWS_PER_PAGE_OPTIONS: number[] = [10, 20];
export const DEFAULT_ROWS_PER_PAGE: number = 20;

export const DEFAULT_TABLE_SETTINGS: TableSettings = {
  paginator: false,
  rows: DEFAULT_ROWS_PER_PAGE,
  rowsPerPageConfig: DEFAULT_ROWS_PER_PAGE_OPTIONS,
  totalRecords: 0,
  isRowClickable: false,
  hideFilters: true,
  excelExport: false,
};

export enum TABLE_MATCH_MODES {
  startsWith = 'startsWith',
  contains = 'contains',
  endsWith = 'endsWith',
  equals = 'equals',
  notEquals = 'notEquals',
  notContains = 'notContains',
}
