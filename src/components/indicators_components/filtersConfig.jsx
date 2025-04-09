

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
    percentage: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    indicator_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    q4all_Ind_number: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.IN },
    indicator_cluster: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    catergory_of_Indicator: { value: null, matchMode: FilterMatchMode.IN },
    observations_from_meetings: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    shortlist_indicators: { value: null, matchMode: FilterMatchMode.IN },
    decision_and_next_steps: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    forPilot: { value: null, matchMode: FilterMatchMode.IN },
    publicationsoptions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    dimension: { value: null, matchMode: FilterMatchMode.IN },
    type_of_healthcare_providers_D1_D7: { value: null, matchMode: FilterMatchMode.IN },
    cross_Cutting_Dimensions_A_I: { value: null, matchMode: FilterMatchMode.CUSTOM },
    cross_Cutting_Dimensions_Inputs_Process_Outputs: { value: null, matchMode: FilterMatchMode.CUSTOM },
    dimensions_of_Quality_QoCOfficeReport: { value: null, matchMode: FilterMatchMode.IN },
    priority: { value: null, matchMode: FilterMatchMode.IN },
    data_collection: { value: null, matchMode: FilterMatchMode.IN },
    collecting_National_Organization: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    proponent_Organization_WG: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    rationale_Description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    objective: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    calculation_Formula: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    numerator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    numerator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    denominator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    denominator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    target_Population: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    periodicity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    data_Collection_Steps: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    legal_Requirements: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    responsible_for_Monitoring: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    deadline_Reporting: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    supervisor_Body: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    management_Entity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    applicable_period: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    unit_of_Measurement: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    it_System_Source: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    reference_Value_Target: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    base_Value: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    sources_and_Further_Reading: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    name_of_selected_indicator_en: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    name_of_selected_indicator_gr: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    observation_gr: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    opinion_from_ODIPY_Other_experts: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    pilot_outcome: { value: null, matchMode: FilterMatchMode.IN },
    pilot_success_criteria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //new filters
    internal_observations: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    dpolist: { value: null, matchMode: FilterMatchMode.IN },
    dpo_org_source1: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    dpo_org_source2: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    dpo_org_source3: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    idika: { value: null, matchMode: FilterMatchMode.IN },
    ketekny: { value: null, matchMode: FilterMatchMode.IN },
    eoppy: { value: null, matchMode: FilterMatchMode.IN },
    odipy: { value: null, matchMode: FilterMatchMode.IN },
    moh: { value: null, matchMode: FilterMatchMode.IN },
    data_fields_vk: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    early_demo_dash_Id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    early_demo_dash_ind_Id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    early_demo_dash_source: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    

});

  