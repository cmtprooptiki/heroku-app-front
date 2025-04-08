import {React, useState} from "react";
import { Tooltip } from "primereact/tooltip";
import axios from "axios";
import apiBaseUrl from "../../apiConfig";
import { MultiSelect } from "primereact/multiselect";
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
    shortlist_indicators,
} from './IndicatorUtils';  // Adjust the path as necessary

import { Dropdown} from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";


const HelperIndicators = (indicators, filledRows, category_of_Indicator) =>
{
    const [filledRows2, setfilledRows] = useState(filledRows)

    const customHeader = (title, hint, field) => (
    <div>
        <div>{title}</div>
        <small
        id={`hint-${field}`}
        style={{
            display: "block",
            color: "#888",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100px",
        }}
        >
        {hint}
        </small>
        <Tooltip target={`#hint-${field}`} content={hint} />
    </div>
    );

    const renderColumnHeader = (headerText, fieldName, title, hint, field, frozenColumns, toggleFreezeColumn) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
        onClick={() => toggleFreezeColumn(fieldName)}
        style={{ cursor: "pointer", marginRight: "8px" }}
        title={frozenColumns.includes(fieldName) ? "Unlock Column" : "Lock Column"}
        >
        {frozenColumns.includes(fieldName) ? (
            <i className="pi pi-lock" style={{ fontSize: "1rem" }}></i>
        ) : (
            <i className="pi pi-lock-open" style={{ fontSize: "1rem" }}></i>
        )}
        </span>
        <span>{headerText}</span>
        <div>{title}</div>
    </div>
    );

    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
    
        let validEdit = false;
    
        // Utility function to safely handle string trimming
        const safeTrim = (value) => (typeof value === 'string' ? value.trim() : '');
    
        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) {
                    rowData[field] = newValue;
                    validEdit = true;
                } else {
                    console.warn(`Invalid value for ${field}: ${newValue}`);
                    event.preventDefault();
                }
                break;
            case 'status': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("Status is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'shortlist_indicators': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("shortlist_indicators is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
    
            case 'catergory_of_Indicator': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("Status is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'type_of_healthcare': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("type of heal is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'type_of_healthcare_providers_D1_D7':
                if (newValue) {
                    console.log("type of heal is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'dimension': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("dimension is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
            
            case 'cross_Cutting_Dimensions_A_I': 
                // Handle multi-select dropdown fields
                if (Array.isArray(newValue)) {
                    console.log("dimension is newvalue:", newValue);
                    // Convert the array to a comma-separated string
                    rowData[field] = newValue.join(', ');  // Join array elements into a string "A, B, C"
                    
                    validEdit = true;
                } else if (typeof newValue === 'string' && newValue.trim() === '') {
                    // Handle case where value is cleared (empty string)
                    rowData[field] = '';
                    validEdit = true;
                } else if (typeof newValue === 'string') {
                    // If the value is already a string, ensure it is trimmed and stored as is
                    rowData[field] = newValue.trim();
                    validEdit = true;
                } else {
                    // In case of invalid value
                    console.warn(`Invalid value for ${field}:`, newValue);
                    event.preventDefault();
                }
                break;

            case 'cross_Cutting_Dimensions_Inputs_Process_Outputs': 
            // Handle multi-select dropdown fields
                if (Array.isArray(newValue)) {
                    console.log("dimension is newvalue:", newValue);
                    // Convert the array to a comma-separated string
                    rowData[field] = newValue.join(', ');  // Join array elements into a string "A, B, C"
                    
                    validEdit = true;
                } else if (typeof newValue === 'string' && newValue.trim() === '') {
                    // Handle case where value is cleared (empty string)
                    rowData[field] = '';
                    validEdit = true;
                } else if (typeof newValue === 'string') {
                    // If the value is already a string, ensure it is trimmed and stored as is
                    rowData[field] = newValue.trim();
                    validEdit = true;
                } else {
                    // In case of invalid value
                    console.warn(`Invalid value for ${field}:`, newValue);
                    event.preventDefault();
                }
                break;

            case 'dimensions_of_Quality_QoCOfficeReport': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("dimension is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'priority': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
                
            case 'data_collection': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'legal_Organizational_Requirements': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
                
            case 'selected_indicator': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
            case 'piloting': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
            case 'forPilot':
                if (newValue) {
                    console.log("type of heal is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;

            case 'pilot_outcome': 
                // Handle dropdown fields
                if (newValue) {
                    console.log("priority is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
            default:
                // Handle other fields
                const trimmedValue = safeTrim(newValue);
                if (trimmedValue.length >= 0) {
                    rowData[field] = trimmedValue;
                    validEdit = true;
                } else {
                    console.warn(`Empty or invalid value for field ${field}`);
                    event.preventDefault();
                }
                break;
        }
    
        if (validEdit) {
            try {
                console.log("Data being sent to backend:", rowData);  // Log the data

                // Make the API call to update the backend
                const response = await axios.patch(`${apiBaseUrl}/indicators/${rowData.id}`, {
                    [field]: newValue,
                });
    
                setfilledRows(indicators.filter(checkRow))

                if (response.status === 200) {
                    console.log('Update successful');
                } else {
                    console.error(`Update failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error updating the product:', error);
                event.preventDefault();
            }
        }
    };



    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else if (options.field === 'status') return dropdownEditor(options,statuses); // Dropdown editor for category
        else if (options.field === 'catergory_of_Indicator') return dropdownEditor(options,category_of_Indicator); //dropdown editor of category of indicator
        else if (options.field === 'type_of_healthcare') return dropdownEditor(options,domains); // Dropdown editor for domain
        else if (options.field === 'dimension') return dropdownEditor(options,dimensions); // Dropdown editor for domain
        else if (options.field === 'cross_Cutting_Dimensions_A_I') return dropdownEditorMulti(options,classification_dimension); 
        else if (options.field === 'cross_Cutting_Dimensions_Inputs_Process_Outputs') return dropdownEditorMulti(options,cross_Cutting_Dimensions_Inputs_Process_Outputlist)
        else if (options.field === 'type_of_healthcare_providers_D1_D7') return dropdownEditor(options,type_of_healthcare_providers_D1_D7list);
        else if (options.field === 'dimensions_of_Quality_QoCOfficeReport') return dropdownEditor(options,QoCOfficeReportlist);
        else if (options.field ==='priority') return dropdownEditor(options,prioritylist);
        else if (options.field ==='data_collection') return dropdownEditor(options,data_collection_list);
        else if (options.field ==='legal_Organizational_Requirements') return dropdownEditor(options,legal_Organizational_Requirements_list)
        else if (options.field ==='selected_indicator') return dropdownEditor(options,selected_indicator_list)
        else if (options.field ==='piloting') return dropdownEditor(options,piloting_list)
        else if (options.field ==='pilot_outcome') return dropdownEditor(options,pilot_outcome_list)
        else if (options.field ==='forPilot') return dropdownEditor(options,forPilotlist)

        else if (options.field === 'dpolist') return dropdownEditor(options, dpoList)
        else if (options.field === 'idika') return dropdownEditor(options, idikaList)
        else if (options.field === 'ketekny') return dropdownEditor(options, keteknyList)
        else if (options.field === 'eoppy') return dropdownEditor(options, eoppyList)
        else if (options.field === 'odipy') return dropdownEditor(options, odipyList)
        else if (options.field === 'moh') return dropdownEditor(options, mohList)

        else if (options.field === 'shortlist_indicators') return dropdownEditor(options, shortlist_indicators)

        else return textEditor(options);
    };

    //Filters end
        const isPositiveInteger = (val) => {
            let str = String(val);
            str = str.trim();
            if (!str) {
                return false;
            }
            str = str.replace(/^0+/, '') || '0';
            let n = Math.floor(Number(str));
            return n !== Infinity && String(n) === str && n >= 0;
        };

        const priceEditor = (options) => {
            return (
                <InputNumber
                    value={options.value}
                    onValueChange={(e) => options.editorCallback(e.value)}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            );
        };

        const dropdownEditor = (options,list) => {
                return (
                    <Dropdown
                        value={options.value}
                        options={list} // Use the list of options
                        onChange={(e) => options.editorCallback(e.value)}
                        placeholder="Select option"
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                );
            };
        
            const dropdownEditorMulti = (options,list) => {
                const value = Array.isArray(options.value) ? options.value : (options.value ? options.value.split(', ') : []);
                console.log("Before update",value)
                return (
                
                    <MultiSelect
                    value={value} // Parse the saved string to an array
                    options={list}
                    onChange={(e) => {
                        // When selection changes, join the array of values into a string
                        const selectedValues = e.value.join(', ');
                        options.editorCallback(selectedValues); // Update the table data with the string
                    }}            placeholder="Select "
                    display="chip"
                    onKeyDown={(e) => e.stopPropagation()}
        
                />
        
                );
            };

            const checkRow = (row) => {
                // Filter out 'user_Id' from the columns and check if all other values are not null
                return Object.keys(row).every((key) => {
                if (key !== 'user_Id') {
                    return row[key] !== null && row[key] !== '';
                }
                return true; // Allow 'user_Id' to be null or not
                });
            };
        

    const textEditor = (options) => {
        const handleInput = (e) => {
            const textarea = e.target;
            textarea.style.height = "auto"; // Reset height to recalculate
            textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically
            options.editorCallback(textarea.value);
        };

        return (
            <textarea
                value={options.value || ""}
                onChange={handleInput}
                onKeyDown={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    minHeight: "50px",
                    maxHeight: "200px", // Optional, to limit extreme expansion
                    resize: "both", // Allow the user to resize the editor
                    overflow: "hidden", // Hide overflow while expanding
                    padding: "10px", // Adjust padding
                    boxSizing: "border-box", // Include padding in width/height calculations
                    fontSize: "inherit", // Match table font size
                }}
            />
        );
    };

    const generalBodyTemplate = (rowData,list,field) => {
        const field1 = list.find((cat) => cat.value === rowData.field);
        return field1 ? field1.label : rowData.field; // Display label instead of value
    };

    const ItemTemplate = (option) => {
        
            return (
                <div className="flex align-items-center gap-2">
                    <span>{option}</span>
                </div>
            );
        };

    const q4all_Ind_number_BodyTemplate = (rowData) => {
            
            const q4all_Ind_numberder = rowData.q4all_Ind_number || 'N/A';      
        
            return (
                <div className="flex align-items-center gap-2">
                    <span>{q4all_Ind_numberder}</span>
                </div>
            );
        };

        return {customHeader, renderColumnHeader, onCellEditComplete, cellEditor, generalBodyTemplate, ItemTemplate, q4all_Ind_number_BodyTemplate}
    }

    // Export the functions
    export default HelperIndicators;