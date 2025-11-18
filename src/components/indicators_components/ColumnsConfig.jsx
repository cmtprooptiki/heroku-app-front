import React from "react";
import FilterIndicators from "./FilterIndicators";
import HelperIndicators from "./HelperIndicators";
import { headers } from './headersConfig';  // Import the header configuration
import { initFiltersConfig } from './filtersConfig';
// import "./datatable-custom.css"; // Your custom styles
import { 
    QoCOfficeReportlist, 
    data_collection_list, 
    shortlist_indicators,
    health_system_functions
} from './IndicatorUtils';  // Adjust the path as necessary


//hint custom

const ColumnsConfig = (filteredIndicators, indicators, category_of_Indicator) =>
{

    const {customHeader, renderColumnHeader, onCellEditComplete, 
        cellEditor, onCellEditInit, generalBodyTemplate, 
        ItemTemplate, q4all_Ind_number_BodyTemplate} = HelperIndicators(indicators, 
            // filledRows, 
            category_of_Indicator);
    return {
       name_of_selected_indicator_en: {
            field: "name_of_selected_indicator_en",
            header: customHeader(headers.name_of_selected_indicator_en.label, headers.name_of_selected_indicator_en.description, "name_of_selected_indicator_en"),
            filter: true,
            filterPlaceholder: "Search by Name of Selected Indicator (EN)",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
       
        name_of_selected_indicator_gr: {
            field: "name_of_selected_indicator_gr",
            header: customHeader(headers.name_of_selected_indicator_gr.label, headers.name_of_selected_indicator_gr.description, "name_of_selected_indicator_gr"),
            filter: true,
            filterPlaceholder: "Search by Name of Selected Indicator (GR)",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
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

          shortlist_indicators: {
            field: "shortlist_indicators",
            header: customHeader(headers.shortlist_indicators.label, headers.shortlist_indicators.description, "shortlist_indicators"),
            filter: true,
            filterField: "shortlist_indicators",
            showFilterMatchModes: false,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.shortlist_indicators)} itemTemplate={ItemTemplate} />),
            body: generalBodyTemplate(indicators, shortlist_indicators, 'shortlist_indicators'),
            style: { minWidth: '12rem',textAlign:"center"  },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },

        //HEALTH HERE
        health_system_functions:{
            field: "health_system_functions",
            header: customHeader(headers.health_system_functions.label, headers.health_system_functions.description, "health_system_functions"),
            filter: true,
            filterField: "health_system_functions",
            showFilterMatchModes: false,
            filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.health_system_functions)} itemTemplate={ItemTemplate} />),
            body: generalBodyTemplate(indicators, health_system_functions, 'health_system_functions'),
            style: { minWidth: '12rem',textAlign:"center"  },
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
            style: { minWidth: '12rem',textAlign:"center"  },
            body: generalBodyTemplate(indicators, QoCOfficeReportlist, 'dimensions_of_Quality_QoCOfficeReport'),
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
      
 
         data_collection: {
            field: "data_collection",
            header: customHeader(headers.data_collection.label, headers.data_collection.description, "data_collection"),
            filter: true,
            filterPlaceholder: "Search by data received",
            style: { minWidth: '12rem' },
            editor: (options) => cellEditor(options),
            onCellEditComplete: onCellEditComplete
        },
       
        // data_collection: {
        //     field: "data_collection",
        //     header: customHeader(headers.data_collection.label, headers.data_collection.description, "data_collection"),
        //     filter: true,
        //     filterElement: (option) => (<FilterIndicators options={option} data={filteredIndicators.map(item => item.data_collection)}  itemTemplate={ItemTemplate}/>),
        //     showFilterMatchModes: false,
        //     style: { minWidth: '12rem' },
        //     body: generalBodyTemplate(indicators, data_collection_list, 'data_collection'),
        //     editor: (options) => cellEditor(options),
        //     onCellEditComplete: onCellEditComplete
        // },
       
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
           
        unit_of_Measurement: {
            field: "unit_of_Measurement",
            header: customHeader(headers.unit_of_Measurement.label, headers.unit_of_Measurement.description, "unit_of_Measurement"),
            filter: true,
            filterPlaceholder: "Search by Unit of Measurement",
            style: { minWidth: '12rem' },
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
   
      
       
    
    
    }
}

export default ColumnsConfig;
