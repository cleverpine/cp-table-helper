import { TABLE_MATCH_MODES } from "src/app/utilities/table";
import { ColumnMultiAndSingleSelectFilterOptions, Filter, FilterValues, SortValues } from "./table.model";

export const transformSortForRequest = (criteria: SortValues[]) =>
  criteria.map(item => {
    const direction = item.order === 1 ? 'asc' : 'desc';
    return `${item.field}:${direction}`;
  });

export const getShorthandMatchMode = (matchMode: string): string => {
  switch (matchMode) {
    case TABLE_MATCH_MODES.startsWith:
      return 'sw';
    case TABLE_MATCH_MODES.dateIs:
    case TABLE_MATCH_MODES.contains:
      return 'like';
    case TABLE_MATCH_MODES.notContains:
      return 'neq';
    case TABLE_MATCH_MODES.endsWith:
      return 'ew';
    case TABLE_MATCH_MODES.equals:
      return 'eq';
    case TABLE_MATCH_MODES.notEquals:
      return 'neq';
    default:
      return matchMode;
  }
};

export const transformFiltersForRequest = (filters: FilterValues): string[] => {
  const transformedArray: string[] = [];

  for (const key in filters) {
    const filterValue = filters[key];

    if (!filterValue) {
      continue;
    }

    (Array.isArray(filterValue) ? filterValue : [filterValue]).forEach(
      (filter: Filter) => {
        const shorthandMatchMode = getShorthandMatchMode(filter.matchMode);
        if (filter.value) {
          if (Array.isArray(filter.value)) {
            for (const value of filter.value) {
              transformedArray.push(`${key}:${shorthandMatchMode}:${value}`);
            }
          } else {
            transformedArray.push(
              `${key}:${shorthandMatchMode}:${filter.value}`
            );
          }
        }
      }
    );
  }

  return transformedArray;
};

export const buildMutliAndSingleSelectFilterOptions = (
  filterOptions: string[]
): ColumnMultiAndSingleSelectFilterOptions[] => {
  return filterOptions.map((filterOption: string) => ({
    label: filterOption,
    value: filterOption,
  }));
};
