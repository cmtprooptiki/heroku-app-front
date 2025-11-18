

import { FilterMatchMode, FilterOperator } from 'primereact/api';
 // Custom Filter Function
 const customFilterFunction = (value, filter) => {
    if (!filter || filter.length === 0) {
        return true; // No filter applied, show all
    }
    const valueArray = value.split(','); // Split the cell value into an array
    return filter.some((f) => valueArray.includes(f)); // Check if any filter value matches
};

export const initFiltersConfig = () => ({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    name_of_selected_indicator_en: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    name_of_selected_indicator_gr: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    indicator_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    q4all_Ind_number: { value: null, matchMode: FilterMatchMode.IN },
    shortlist_indicators: { value: null, matchMode: FilterMatchMode.IN },
    health_system_functions: { value: null, matchMode: FilterMatchMode.IN },
    dimensions_of_Quality_QoCOfficeReport: { value: null, matchMode: FilterMatchMode.IN },
    data_collection: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    calculation_Formula: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    numerator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    numerator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    denominator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    denominator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    periodicity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    unit_of_Measurement: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    dpo_org_source1: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
});

  