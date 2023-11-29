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
    case 'dateIs':
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
            // when multiple values are selected, we need to use 'in' operator
            const value = filter.value.join(';');  
            transformedArray.push(`${key}:in:${value}`);
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
