import React from "react";
import FilterIndicators from "./FilterIndicators";
import HelperIndicators from "./HelperIndicators";
import { headers } from './headersConfig';  // Import the header configuration
import { initFiltersConfig } from './filtersConfig';
// import "./datatable-custom.css"; // Your custom styles
import { 
    statuses,
    domains, 
    QoCOfficeReportlist, 
    prioritylist, 
    data_collection_list, 
    type_of_healthcare_providers_D1_D7list,
    category_of_indicators,
    dimensions,
    classification_dimension,
    cross_Cutting_Dimensions_Inputs_Process_Outputlist,
    legal_Organizational_Requirements_list, 
    selected_indicator_list, 
    piloting_list, 
    pilot_outcome_list,
    forPilotlist ,
    dpoList,
    idikaList,
    keteknyList,
    eoppyList,
    odipyList,
    mohList,
    shortlist_indicators
} from './IndicatorUtils';  // Adjust the path as necessary


//hint custom

const ColumnsConfig = (filteredIndicators, indicators, statusValue, dpolist, cross_Cutting_Dimensions_A_I, 
    Cross_Cutting_Dimensions_Inputs_Outputs, filledRows, category_of_Indicator) =>
{

    const {customHeader, renderColumnHeader, onCellEditComplete, 
        cellEditor, generalBodyTemplate, 
        ItemTemplate, q4all_Ind_number_BodyTemplate} = HelperIndicators(indicators, filledRows, category_of_Indicator);
    return {
     
        q4all_Ind_number: {
            field: "q4all_Ind_number",
            header: customHeader(headers.q4all_Ind_number.label, headers.q4all_Ind_number.description, "q4all_Ind_number"),
            filter: true,
            filterField: "q4all_Ind_number",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.q4all_Ind_number)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            body: q4all_Ind_number_BodyTemplate,
            style: { minWidth: '14rem' },
            frozen:true        
        },
        indicator_name: {
            field: "indicator_name",
            header: customHeader(headers.indicator_name.label, headers.indicator_name.description, "indicator_name"),
            filter: true,
            filterPlaceholder: "Search by Indicator Name",
            style: { minWidth: '16rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            // frozen: selectedFrozenColumnNames.includes("indicator_name") // Always define frozen
            frozen:true
        },
        status: {
            field: "status",
            header: customHeader(headers.status.label, headers.status.description, "status"),
            filter: true,
            filterField: "status",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.status)} itemTemplate={ItemTemplate} />),
            style: { minWidth: '6rem',textAlign:"center" },
            showFilterMatchModes: false,
            body: generalBodyTemplate(indicators, statusValue, 'status'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        indicator_cluster: {
            field: "indicator_cluster",
            header: customHeader(headers.indicator_cluster.label, headers.indicator_cluster.description, "indicator_cluster"),
            filter: true,
            filterPlaceholder: "Search by Indicator Cluster",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        internal_observations:
        {
            field: "internal_observations",
            header: customHeader(headers.internal_observations.label, headers.internal_observations.description, "internal_observations"),
            filter: true,
            filterPlaceholder: "Search by Internal Observation",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // feedback_from_ODIPY: {
        //     field: "feedback_from_ODIPY",
        //     header: customHeader(headers.feedback_from_ODIPY.label, headers.feedback_from_ODIPY.description, "feedback_from_ODIPY"),
        //     filter: true,
        //     filterPlaceholder: "Search by feedback_from_ODIPY",
        //     style: { minWidth: '8rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // feedback_from_EOPYY: {
        //     field: "feedback_from_EOPYY",
        //     header: customHeader(headers.feedback_from_EOPYY.label, headers.feedback_from_EOPYY.description, "feedback_from_EOPYY"),
        //     filter: true,
        //     filterPlaceholder: "Search by feedback_from_EOPYY",
        //     style: { minWidth: '8rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // feedback_from_IDIKA: {
        //     field: "feedback_from_IDIKA",
        //     header: customHeader(headers.feedback_from_IDIKA.label, headers.feedback_from_IDIKA.description, "feedback_from_IDIKA"),
        //     filter: true,
        //     filterPlaceholder: "Search by feedback_from_IDIKA",
        //     style: { minWidth: '8rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // ind_Merge: {
        //     field: "ind_Merge",
        //     header: customHeader(headers.ind_Merge.label, headers.ind_Merge.description, "ind_Merge"),
        //     filter: true,
        //     filterPlaceholder: "Search by Indicator Merge",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        dpolist:
        {
            field: "dpolist",
            header: customHeader(headers.dpolist.label, headers.dpolist.description, "dpolist"),
            filter: true,
            filterField: "dpolist",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.dpolist)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            body: generalBodyTemplate(indicators, dpolist, 'dpolist'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete

        },
        dpo_org_source1:
        {
            field: "dpo_org_source1",
            header: customHeader(headers.dpo_org_source1.label, headers.dpo_org_source1.description, "dpo_org_source1"),
            filter: true,
            filterPlaceholder: "Search by dpo org source1",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        dpo_org_source2:
        {
            field: "dpo_org_source2",
            header: customHeader(headers.dpo_org_source2.label, headers.dpo_org_source2.description, "dpo_org_source2"),
            filter: true,
            filterPlaceholder: "Search by dpo org source2",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        dpo_org_source3:
        {
            field: "dpo_org_source3",
            header: customHeader(headers.dpo_org_source3.label, headers.dpo_org_source3.description, "dpo_org_source3"),
            filter: true,
            filterPlaceholder: "Search by dpo org source3",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        idika:
        {
            field: "idika",
            header: customHeader(headers.idika.label, headers.idika.description, "idika"),
            filter: true,
            filterField: "idika",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.idika)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            body: generalBodyTemplate(indicators, idikaList, 'idika')
        },
        ketekny:
        {
            field: "ketekny",
            header: customHeader(headers.ketekny.label, headers.ketekny.description, "ketekny"),
            filter: true,
            filterField: "ketekny",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.ketekny)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            body: generalBodyTemplate(indicators, keteknyList, 'ketekny')
        },
        eoppy:
        {
            field: "eoppy",
            header: customHeader(headers.eoppy.label, headers.eoppy.description, "eoppy"),
            filter: true,
            filterField: "eoppy",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.eoppy)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            body: generalBodyTemplate(indicators, eoppyList, 'eoppy')
        },
        odipy:
        {
            field: "odipy",
            header: customHeader(headers.odipy.label, headers.odipy.description, "odipy"),
            filter: true,
            filterField: "odipy",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.odipy)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            body: generalBodyTemplate(indicators, odipyList, 'odipy')
        },
        moh:
        {
            field: "moh",
            header: customHeader(headers.moh.label, headers.moh.description, "moh"),
            filter: true,
            filterField: "moh",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.moh)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            style: { minWidth: '11rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete,
            body: generalBodyTemplate(indicators, mohList, 'moh')
        },
        catergory_of_Indicator: {
            field: "catergory_of_Indicator",
            header: customHeader("Category of Indicator", "The origin or source of inspiration for the KPI, such as whether it is adapted from another country's indicator, an international standard, or developed internally.", "catergory_of_Indicator"),
            filter: true,
            filterField: "catergory_of_Indicator",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.catergory_of_Indicator)} itemTemplate={ItemTemplate} />),
            showFilterMatchModes: false,
            body: generalBodyTemplate(indicators, category_of_indicators, 'catergory_of_Indicator'),
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        observations_from_meetings: {
            field: "observations_from_meetings",
            header: customHeader(headers.observations_from_meetings.label, headers.observations_from_meetings.description, "observations_from_meetings"),
            filter: true,
            filterPlaceholder: "Search by observations_from_meetings",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
    
        shortlist_indicators: {
            field: "shortlist_indicators",
            header: customHeader(headers.shortlist_indicators.label, headers.shortlist_indicators.description, "shortlist_indicators"),
            filter: true,
            filterField: "shortlist_indicators",
            showFilterMatchModes: false,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.shortlist_indicators)} itemTemplate={ItemTemplate} />),
            body: generalBodyTemplate(indicators, shortlist_indicators, 'shortlist_indicators'),
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        decision_and_next_steps: {
            field: "decision_and_next_steps",
            header: customHeader(headers.decision_and_next_steps.label, headers.decision_and_next_steps.description, "decision_and_next_steps"),
            filter: true,
            filterPlaceholder: "Search by decision_and_next_steps",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        forPilot: {
            field: "forPilot",
            header: customHeader(headers.forPilot.label, headers.forPilot.description, "forPilot"),
            filter: true,
            filterField: "forPilot",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.forPilot)} itemTemplate={ItemTemplate}/>),
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, forPilotlist, 'forPilot'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        publicationsoptions: {
            field: "publicationsoptions",
            header: customHeader(headers.publicationsoptions.label, headers.publicationsoptions.description, "publicationsoptions"),
            filter: true,
            filterPlaceholder: "Search by publicationsoptions",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
    
        dimension: {
            field: "dimension",
            header: customHeader(headers.dimension.label, headers.dimension.description, "dimension"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.dimension)} itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            filterField: "dimension",
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, dimensions, 'dimension'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // type_of_healthcare: {
        //     field: "type_of_healthcare",
        //     header: customHeader(headers.type_of_healthcare.label, headers.type_of_healthcare.description, "type_of_healthcare"),
        //     filter: true,
        //     filterField: "type_of_healthcare",
        //     filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.type_of_healthcare)} itemTemplate={ItemTemplate}/>),
        //     showFilterMatchModes: false,
        //     style: { minWidth: '10rem' },
        //     body: generalBodyTemplate(indicators, domains, 'type_of_healthcare'),
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        type_of_healthcare_providers_D1_D7: {
            field: "type_of_healthcare_providers_D1_D7",
            header: customHeader(headers.type_of_healthcare_providers_D1_D7.label, headers.type_of_healthcare_providers_D1_D7.description, "type_of_healthcare_providers_D1_D7"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.type_of_healthcare_providers_D1_D7)} itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, type_of_healthcare_providers_D1_D7list, 'type_of_healthcare_providers_D1_D7'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
    
    
        
        cross_Cutting_Dimensions_A_I: {
            field: "cross_Cutting_Dimensions_A_I",
            header: customHeader(headers.cross_Cutting_Dimensions_A_I.label, headers.cross_Cutting_Dimensions_A_I.description, "cross_Cutting_Dimensions_A_I"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={cross_Cutting_Dimensions_A_I} itemTemplate={ItemTemplate}/>),
            filterField: "cross_Cutting_Dimensions_A_I",
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, classification_dimension, 'cross_Cutting_Dimensions_A_I'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        cross_Cutting_Dimensions_Inputs_Process_Outputs: {
            field: "cross_Cutting_Dimensions_Inputs_Process_Outputs",
            header: customHeader(headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.label, headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.description, "cross_Cutting_Dimensions_Inputs_Process_Outputs"),
            filter: true,
            filterField: "cross_Cutting_Dimensions_Inputs_Process_Outputs",
            filterElement: (option) => (<FilterIndicators options={option} data={Cross_Cutting_Dimensions_Inputs_Outputs}  itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, cross_Cutting_Dimensions_Inputs_Process_Outputlist, 'cross_Cutting_Dimensions_Inputs_Process_Outputs'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
    
        dimensions_of_Quality_QoCOfficeReport: {
            field: "dimensions_of_Quality_QoCOfficeReport",
            header: customHeader(headers.dimensions_of_Quality_QoCOfficeReport.label, headers.dimensions_of_Quality_QoCOfficeReport.description, "dimensions_of_Quality_QoCOfficeReport"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.dimensions_of_Quality_QoCOfficeReport)}  itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            filterPlaceholder: "Search by Dimensions of Quality",
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, QoCOfficeReportlist, 'dimensions_of_Quality_QoCOfficeReport'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        priority: {
            field: "priority",
            header: customHeader(headers.priority.label, headers.priority.description, "priority"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.priority)}  itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, prioritylist, 'priority'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        data_collection: {
            field: "data_collection",
            header: customHeader(headers.data_collection.label, headers.data_collection.description, "data_collection"),
            filter: true,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.data_collection)}  itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, data_collection_list, 'data_collection'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        collecting_National_Organization: {
            field: "collecting_National_Organization",
            header: customHeader(headers.collecting_National_Organization.label, headers.collecting_National_Organization.description, "collecting_National_Organization"),
            filter: true,
            filterPlaceholder: "Search by Collecting Organization",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // legal_Organizational_Requirements: {
        //     field: "legal_Organizational_Requirements",
        //     header: customHeader(headers.legal_Organizational_Requirements.label, headers.legal_Organizational_Requirements.description, "legal_Organizational_Requirements"),
        //     filter: true,
        //     filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.legal_Organizational_Requirements)}  itemTemplate={ItemTemplate}/>),
        //     showFilterMatchModes: false,
        //     style: { minWidth: '12rem' },
        //     body: generalBodyTemplate(indicators, legal_Organizational_Requirements_list, 'legal_Organizational_Requirements'),
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        proponent_Organization_WG: {
            field: "proponent_Organization_WG",
            header: customHeader(headers.proponent_Organization_WG.label, headers.proponent_Organization_WG.description, "proponent_Organization_WG"),
            filter: true,
            filterPlaceholder: "Search by Proponent Organization",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        rationale_Description: {
            field: "rationale_Description",
            header: customHeader(headers.rationale_Description.label, headers.rationale_Description.description, "rationale_Description"),
            filter: true,
            filterPlaceholder: "Search by Rationale Description",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        objective: {
            field: "objective",
            header: customHeader(headers.objective.label, headers.objective.description, "objective"),
            filter: true,
            filterPlaceholder: "Search by Objective",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        calculation_Formula: {
            field: "calculation_Formula",
            header: customHeader(headers.calculation_Formula.label, headers.calculation_Formula.description, "calculation_Formula"),
            filter: true,
            filterPlaceholder: "Search by Calculation Formula",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
    
        numerator: {
            field: "numerator",
            header: customHeader(headers.numerator.label, headers.numerator.description, "numerator"),
            filter: true,
            filterPlaceholder: "Search by Numerator",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        numerator_Definitions: {
            field: "numerator_Definitions",
            header: customHeader(headers.numerator_Definitions.label, headers.numerator_Definitions.description, "numerator_Definitions"),
            filter: true,
            filterPlaceholder: "Search by Numerator Definitions",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        data_fields_vk:
        {
            field: "data_fields_vk",
            header: customHeader(headers.data_fields_vk.label, headers.data_fields_vk.description, "data_fields_vk"),
            filter: true,
            filterPlaceholder: "Search by Data Fields VK",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        denominator: {
            field: "denominator",
            header: customHeader(headers.denominator.label, headers.denominator.description, "denominator"),
            filter: true,
            filterPlaceholder: "Search by Denominator",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        denominator_Definitions: {
            field: "denominator_Definitions",
            header: customHeader(headers.denominator_Definitions.label, headers.denominator_Definitions.description, "denominator_Definitions"),
            filter: true,
            filterPlaceholder: "Search by Denominator Definitions",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        target_Population: {
            field: "target_Population",
            header: customHeader(headers.target_Population.label, headers.target_Population.description, "target_Population"),
            filter: true,
            filterPlaceholder: "Search by Target Population",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // field_Topic: {
        //     field: "field_Topic",
        //     header: customHeader(headers.field_Topic.label, headers.field_Topic.description, "field_Topic"),
        //     filter: true,
        //     filterPlaceholder: "Search by Field Topic",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // extraCol2: {
        //     field: "extraCol2",
        //     header: customHeader(headers.extraCol2.label, headers.extraCol2.description, "extraCol2"),
        //     filter: true,
        //     filterPlaceholder: "Search by Extra Column 2",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },

        early_demo_dash_Id:
        {
            field: "early_demo_dash_Id",
            header: customHeader(headers.early_demo_dash_Id.label, headers.early_demo_dash_Id.description, "early_demo_dash_Id"),
            filter: true,
            filterPlaceholder: "Search by early demo dash Id",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        early_demo_dash_ind_Id:
        {
            field: "early_demo_dash_ind_Id",
            header: customHeader(headers.early_demo_dash_ind_Id.label, headers.early_demo_dash_ind_Id.description, "early_demo_dash_ind_Id"),
            filter: true,
            filterPlaceholder: "Search by early demo dash Ind Id",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },

        early_demo_dash_source:
        {
            field: "early_demo_dash_source",
            header: customHeader(headers.early_demo_dash_source.label, headers.early_demo_dash_source.description, "early_demo_dash_source"),
            filter: true,
            filterPlaceholder: "Search by early demo dash source",
            style: { minWidth: '8rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },

        periodicity: {
            field: "periodicity",
            header: customHeader(headers.periodicity.label, headers.periodicity.description, "periodicity"),
            filter: true,
            filterPlaceholder: "Search by Periodicity",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        data_Collection_Steps: {
            field: "data_Collection_Steps",
            header: customHeader(headers.data_Collection_Steps.label, headers.data_Collection_Steps.description, "data_Collection_Steps"),
            filter: true,
            filterPlaceholder: "Search by Data Collection Steps",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        legal_Requirements: {
            field: "legal_Requirements",
            header: customHeader(headers.legal_Requirements.label, headers.legal_Requirements.description, "legal_Requirements"),
            filter: true,
            filterPlaceholder: "Search by Legal Requirements",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        responsible_for_Monitoring: {
            field: "responsible_for_Monitoring",
            header: customHeader(headers.responsible_for_Monitoring.label, headers.responsible_for_Monitoring.description, "responsible_for_Monitoring"),
            filter: true,
            filterPlaceholder: "Search by Responsible for Monitoring",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        deadline_Reporting: {
            field: "deadline_Reporting",
            header: customHeader(headers.deadline_Reporting.label, headers.deadline_Reporting.description, "deadline_Reporting"),
            filter: true,
            filterPlaceholder: "Search by Deadline Reporting",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        supervisor_Body: {
            field: "supervisor_Body",
            header: customHeader(headers.supervisor_Body.label, headers.supervisor_Body.description, "supervisor_Body"),
            filter: true,
            filterPlaceholder: "Search by Supervisor Body",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        management_Entity: {
            field: "management_Entity",
            header: customHeader(headers.management_Entity.label, headers.management_Entity.description, "management_Entity"),
            filter: true,
            filterPlaceholder: "Search by Management Entity",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        applicable_period: {
            field: "applicable_period",
            header: customHeader(headers.applicable_period.label, headers.applicable_period.description, "applicable_period"),
            filter: true,
            filterPlaceholder: "Search by Applicable Period",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        unit_of_Measurement: {
            field: "unit_of_Measurement",
            header: customHeader(headers.unit_of_Measurement.label, headers.unit_of_Measurement.description, "unit_of_Measurement"),
            filter: true,
            filterPlaceholder: "Search by Unit of Measurement",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // data_Source_Monitoring_Basis: {
        //     field: "data_Source_Monitoring_Basis",
        //     header: customHeader(headers.data_Source_Monitoring_Basis.label, headers.data_Source_Monitoring_Basis.description, "data_Source_Monitoring_Basis"),
        //     filter: true,
        //     filterPlaceholder: "Search by Data Source Monitoring",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        it_System_Source: {
            field: "it_System_Source",
            header: customHeader(headers.it_System_Source.label, headers.it_System_Source.description, "it_System_Source"),
            filter: true,
            filterPlaceholder: "Search by IT System Source",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        reference_Value_Target: {
            field: "reference_Value_Target",
            header: customHeader(headers.reference_Value_Target.label, headers.reference_Value_Target.description, "reference_Value_Target"),
            filter: true,
            filterPlaceholder: "Search by Reference Value Target",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        base_Value: {
            field: "base_Value",
            header: customHeader(headers.base_Value.label, headers.base_Value.description, "base_Value"),
            filter: true,
            filterPlaceholder: "Search by Base Value",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        notes: {
            field: "notes",
            header: customHeader(headers.notes.label, headers.notes.description, "notes"),
            filter: true,
            filterPlaceholder: "Search by Notes",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        sources_and_Further_Reading: {
            field: "sources_and_Further_Reading",
            header: customHeader(headers.sources_and_Further_Reading.label, headers.sources_and_Further_Reading.description, "sources_and_Further_Reading"),
            filter: true,
            filterPlaceholder: "Search by Sources and Further Reading",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // selected_indicator: {
        //     field: "selected_indicator",
        //     header: customHeader(headers.selected_indicator.label, headers.selected_indicator.description, "selected_indicator"),
        //     filter: true,
        //     filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.selected_indicator)} itemTemplate={ItemTemplate}/>),
        //     showFilterMatchModes: false,
        //     style: { minWidth: '12rem' },
        //     body: generalBodyTemplate(indicators, selected_indicator_list, 'selected_indicator'),
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // adaptation_Needs: {
        //     field: "adaptation_Needs",
        //     header: customHeader(headers.adaptation_Needs.label, headers.adaptation_Needs.description, "adaptation_Needs"),
        //     filter: true,
        //     filterPlaceholder: "Search by Adaptation Needs",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        name_of_selected_indicator_en: {
            field: "name_of_selected_indicator_en",
            header: customHeader(headers.name_of_selected_indicator_en.label, headers.name_of_selected_indicator_en.description, "name_of_selected_indicator_en"),
            filter: true,
            filterPlaceholder: "Search by Name of Selected Indicator (EN)",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // frequency_of_measurement_en: {
        //     field: "frequency_of_measurement_en",
        //     header: customHeader(headers.frequency_of_measurement_en.label, headers.frequency_of_measurement_en.description, "frequency_of_measurement_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Frequency of Measurement (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // description_en: {
        //     field: "description_en",
        //     header: customHeader(headers.description_en.label, headers.description_en.description, "description_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Description (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // unit_of_measurement_en: {
        //     field: "unit_of_measurement_en",
        //     header: customHeader(headers.unit_of_measurement_en.label, headers.unit_of_measurement_en.description, "unit_of_measurement_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Unit of Measurement (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // calculation_formula_en: {
        //     field: "calculation_formula_en",
        //     header: customHeader(headers.calculation_formula_en.label, headers.calculation_formula_en.description, "calculation_formula_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Calculation Formula (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // numerator_en: {
        //     field: "numerator_en",
        //     header: customHeader(headers.numerator_en.label, headers.numerator_en.description, "numerator_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Numerator (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // denominator_en: {
        //     field: "denominator_en",
        //     header: customHeader(headers.denominator_en.label, headers.denominator_en.description, "denominator_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Denominator (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // comments_en: {
        //     field: "comments_en",
        //     header: customHeader(headers.comments_en.label, headers.comments_en.description, "comments_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Comments (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // observation_en: {
        //     field: "observation_en",
        //     header: customHeader(headers.observation_en.label, headers.observation_en.description, "observation_en"),
        //     filter: true,
        //     filterPlaceholder: "Search by Observation (EN)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // extrafield_empty: {
        //     field: "extrafield_empty",
        //     header: customHeader(headers.extrafield_empty.label, headers.extrafield_empty.description, "extrafield_empty"),
        //     filter: true,
        //     filterPlaceholder: "Search by ExtraField-EMPTY",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        name_of_selected_indicator_gr: {
            field: "name_of_selected_indicator_gr",
            header: customHeader(headers.name_of_selected_indicator_gr.label, headers.name_of_selected_indicator_gr.description, "name_of_selected_indicator_gr"),
            filter: true,
            filterPlaceholder: "Search by Name of Selected Indicator (GR)",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // frequency_of_measurement_gr: {
        //     field: "frequency_of_measurement_gr",
        //     header: customHeader(headers.frequency_of_measurement_gr.label, headers.frequency_of_measurement_gr.description, "frequency_of_measurement_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Frequency of Measurement (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // description_gr: {
        //     field: "description_gr",
        //     header: customHeader(headers.description_gr.label, headers.description_gr.description, "description_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Description (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // unit_of_measurement_gr: {
        //     field: "unit_of_measurement_gr",
        //     header: customHeader(headers.unit_of_measurement_gr.label, headers.unit_of_measurement_gr.description, "unit_of_measurement_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Unit of Measurement (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // calculation_formula_gr: {
        //     field: "calculation_formula_gr",
        //     header: customHeader(headers.calculation_formula_gr.label, headers.calculation_formula_gr.description, "calculation_formula_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Calculation Formula (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // numerator_gr: {
        //     field: "numerator_gr",
        //     header: customHeader(headers.numerator_gr.label, headers.numerator_gr.description, "numerator_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Numerator (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // denominator_gr: {
        //     field: "denominator_gr",
        //     header: customHeader(headers.denominator_gr.label, headers.denominator_gr.description, "denominator_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Denominator (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // comments_gr: {
        //     field: "comments_gr",
        //     header: customHeader(headers.comments_gr.label, headers.comments_gr.description, "comments_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by Comments (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        observation_gr: {
            field: "observation_gr",
            header: customHeader(headers.observation_gr.label, headers.observation_gr.description, "observation_gr"),
            filter: true,
            filterPlaceholder: "Search by Observation (GR)",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        // extrafield_empty_gr: {
        //     field: "extrafield_empty_gr",
        //     header: customHeader(headers.extrafield_empty_gr.label, headers.extrafield_empty_gr.description, "extrafield_empty_gr"),
        //     filter: true,
        //     filterPlaceholder: "Search by ExtraField-EMPTY (GR)",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // it_system_source_process: {
        //     field: "it_system_source_process",
        //     header: customHeader(headers.it_system_source_process.label, headers.it_system_source_process.description, "it_system_source_process"),
        //     filter: true,
        //     filterPlaceholder: "Search by IT System/Source/Process",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // aim_of_the_indicator: {
        //     field: "aim_of_the_indicator",
        //     header: customHeader(headers.aim_of_the_indicator.label, headers.aim_of_the_indicator.description, "aim_of_the_indicator"),
        //     filter: true,
        //     filterPlaceholder: "Search by AIM of the INDICATOR",
        //     style: { minWidth: '12rem' },
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        // piloting: {
        //     field: "piloting",
        //     header: customHeader(headers.piloting.label, headers.piloting.description, "piloting"),
        //     filter: true,
        //     filterField: "piloting",
        //     filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.piloting)}  itemTemplate={ItemTemplate}/>),
        //     showFilterMatchModes: false,
        //     style: { minWidth: '12rem' },
        //     body: generalBodyTemplate(indicators, piloting_list, 'piloting'),
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
        opinion_from_ODIPY_Other_experts: {
            field: "opinion_from_ODIPY_Other_experts",
            header: customHeader(headers.opinion_from_ODIPY_Other_experts.label, headers.opinion_from_ODIPY_Other_experts.description, "opinion_from_ODIPY_Other_experts"),
            filter: true,
            filterPlaceholder: "Search by Expert Opinion",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        pilot_outcome: {
            field: "pilot_outcome",
            header: customHeader(headers.pilot_outcome.label, headers.pilot_outcome.description, "pilot_outcome"),
            filter: true,
            filterField: "pilot_outcome",
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.pilot_outcome)} itemTemplate={ItemTemplate}/>),
            showFilterMatchModes: false,
            style: { minWidth: '12rem' },
            body: generalBodyTemplate(indicators, pilot_outcome_list, 'pilot_outcome'),
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
        pilot_success_criteria: {
            field: "pilot_success_criteria",
            header: customHeader(headers.pilot_success_criteria.label, headers.pilot_success_criteria.description, "pilot_success_criteria"),
            filter: true,
            filterPlaceholder: "Search by Success Criteria",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        }
    
    
    }
}

export default ColumnsConfig;
