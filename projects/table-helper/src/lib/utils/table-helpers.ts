import { ColumnMultiAndSingleSelectFilterOptions, Filter, FilterValues, SortValues } from "./table.model";

export const transformSortForRequest = (criteria: SortValues[]) =>
  criteria.map(item => {
    const direction = item.order === 1 ? 'asc' : 'desc';
    return `${item.field}:${direction}`;
  });

export const getShorthandMatchMode = (matchMode: string): string => {
  switch (matchMode) {
    case 'startsWith':
      return 'sw';
    case 'contains':
      return 'like';
    case 'notContains':
      return 'neq';
    case 'endsWith':
      return 'ew';
    case 'equals':
      return 'eq';
    case 'notEquals':
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
  return filterOptions.map((filterOption: any) => ({
    label: filterOption.name,
    name: filterOption.name,
  }));
};
