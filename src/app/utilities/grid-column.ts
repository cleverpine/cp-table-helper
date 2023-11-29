import { ColumnMultiAndSingleSelectFilterOptions } from "projects/table-helper/src/lib/utils/table.model";
import { COLUMN_TYPES } from "./table";
import { FilterMatchMode } from "primeng/api";

export interface GridColumn {
  field: string;
  header: string;
  type?: COLUMN_TYPES;
  width?: number;
  icons?: string[];
  propertyName?: string;
  sortable?: boolean;
  multiAndSingleFilterOptions?: ColumnMultiAndSingleSelectFilterOptions[];
  filterType?: string;
  matchModeOptions?: FilterMatchMode;
}
