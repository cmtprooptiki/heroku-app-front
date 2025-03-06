import React,{useState,useEffect, useRef} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../../buildinglist.css';
import apiBaseUrl from '../../apiConfig';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator, FilterService } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';
// import { ToggleButton } from 'primereact/togglebutton';

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
// import { Dialog } from 'primereact/dialog'; // Import Dialog

import { initFiltersConfig } from './filtersConfig';
// import FilterIndicators from './FilterIndicators';
import "./datatable-custom.css"; // Your custom styles
import TotalIndicators from '../../icons/Total indicators.svg'
import indicatortwo from '../../icons/Group 301.svg'
import indicatorthree from '../../icons/Group 302.svg'
import { Card } from "primereact/card";

import ColumnsConfig from './ColumnsConfig';

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';



const IndicatorsList = () => {
    const [indicators, setIndicators] = useState([]);

    const [columnNames, setColumnNames] = useState(['id', 'percentage']);
    // const [balanceFrozen, setBalanceFrozen] = useState(false);
    // const [selectedFrozenColumnNames, setSelectedFrozenColumnNames] = useState(['selection','id', 'percentage']);

    const [selectedColumns, setSelectedColumns] = useState([]); // User selected columns

    // const [filters, setFilters] = useState(null);
    const [filters, setFilters] = useState(initFiltersConfig);

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredIndicators, setFilteredIndicators] = useState([]);
    const [RowsAffected, setRowsAffected] = useState(indicators.length)

    const [indicator_name, setIndicators_Name] = useState([])

    const [q4all_Ind_number, setQ4AllIndNumber] = useState([]);
    const [category_of_Indicator, set_Category_Of_Indicator] = useState([])
    const [type_of_healthcare, setType_Of_HealthCare] = useState([])
    const [dimension, setDimension] = useState([])

    const [legal_Organizational_Requirements, setLegal_Organizational_Requirements] = useState([])

    const [selected_indicator, setSelected_Indicator] = useState([])

    const [type_of_healthcare_D1_D7, setType_Of_Healthcare_D1_D7] = useState([])

    const [cross_Cutting_Dimensions_A_I, setCross_Cutting_Dimensions_A_I] = useState([])

    const [Cross_Cutting_Dimensions_Inputs_Outputs, setCross_Cutting_Dimensions_Inputs_Outputs] = useState([])

    const [dimensions_of_quality, setDimensions_Of_Quality] = useState([])
    const [priority, setPriority] = useState([])
    const [data_collection, setData_Collection] = useState([])

    const [piloting, setPiloting] = useState([])
    const [pilot_outcome, setPilot_Outcome] = useState([])

    const [forPilot, setforPilot] = useState([])

    
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const [selectedIndicator, setSelectedIndicator] = useState([]);
    console.log("first indicator,",selectedIndicator)

    const [statusValue, setStatusValue] = useState([])
    const [filledRows,setfilledRows]=useState(0)
    const {user} = useSelector((state)=>state.auth)
    console.log(user)
    const dt = useRef(null);
    useEffect(()=>{

        if (user!=null && user.role=="user"){
            getColumnNames()
            getIndicatorsByUser()
        }else if(user!=null && (user.role=="admin" ||user.role=="indicator")){
            getColumnNames()
            getIndicators()
        }
       
        setLoading(false);
        setRowsAffected(indicators.length)
        initFilters();
    },[user]);

    useEffect(()=>{
        setfilledRows(indicators.filter(checkRow))

    },[filteredIndicators])
    
    //get data for specific userid
    const getIndicatorsByUser= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/indicatorsByUser/${user.id}`, {timeout: 5000});
            const indData = response.data;

            const unique_Indicator_Name= [...new Set(indData.map(item => item.indicator_name || ''))];
            setQ4AllIndNumber(unique_Indicator_Name);


            const uniqueq4all_Ind_number= [...new Set(indData.map(item => item.q4all_Ind_number || ''))];
            setQ4AllIndNumber(uniqueq4all_Ind_number);

            const unique_catergory_of_Indicator = [...new Set(indData.map(item => item.catergory_of_Indicator || ''))]
            set_Category_Of_Indicator(unique_catergory_of_Indicator)

            const unique_type_of_healthcare = [...new Set(indData.map(item => item.type_of_healthcare || ''))]
            
            setType_Of_HealthCare(unique_type_of_healthcare)
            console.log(type_of_healthcare)

            const status2 = [...new Set(indData.map(item => item.status || ''))]
            setStatusValue(status2);
            console.log("statuses : ",status2)

            const uniqueDimension = [...new Set(indData.map(item => item.dimension || ''))]
            setDimension(uniqueDimension)

            const unique_d1_d7 = [...new Set(indData.map(item => item.type_of_healthcare_providers_D1_D7 || ''))]
            setType_Of_Healthcare_D1_D7(unique_d1_d7)

            const unique_cross_Cutting_Dimensions_A_I = [...new Set(indData.map(item => item.cross_Cutting_Dimensions_A_I || ''))]
            setCross_Cutting_Dimensions_A_I(unique_cross_Cutting_Dimensions_A_I)

            const unique_Cross_Cutting_Dimensions_Inputs_Outputs = [...new Set(indData.map(item => item.cross_Cutting_Dimensions_Inputs_Process_Outputs	|| ''))]
            setCross_Cutting_Dimensions_Inputs_Outputs(unique_Cross_Cutting_Dimensions_Inputs_Outputs)

            const unique_dimensions_of_quality = [...new Set(indData.map(item => item.dimensions_of_Quality_QoCOfficeReport	|| ''))]
            setDimensions_Of_Quality(unique_dimensions_of_quality)

            const uniquepriority = [...new Set(indData.map(item => item.priority || ''))]
            setPriority(uniquepriority)

            const unique_data_collection = [...new Set(indData.map(item => item.data_collection || ''))]
            setData_Collection(unique_data_collection)

            const unique_legal_organization_requirement = [...new Set(indData.map(item => item.legal_Organizational_Requirements || ''))]
            setLegal_Organizational_Requirements(unique_legal_organization_requirement)

            const unique_Selected_Indicator = [...new Set(indData.map(item => item.selected_indicator || ''))]
            setSelected_Indicator(unique_Selected_Indicator)

            const unique_piloting = [...new Set(indData.map(item => item.piloting || ''))]
            setPiloting(unique_piloting)

            const unique_pilot_outcome = [...new Set(indData.map(item => item.pilot_outcome || ''))]
            setPilot_Outcome(unique_pilot_outcome)

            const unique_forPilot = [...new Set(indData.map(item => item.forPilot || ''))]
            setforPilot(unique_forPilot)
            
          
            // Convert sign_date to Date object for each item in ergaData
            const parDataWithDates = indData.map(item => ({
                ...item,
                percentage: calculateFilledPercentage(item), // Add percentage field
            }));


            setIndicators(parDataWithDates);
            setFilteredIndicators(parDataWithDates)
            setRowsAffected(parDataWithDates.length)
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const checkRow = (row) => {
        // Filter out 'user_Id' from the columns and check if all other values are not null
        return Object.keys(row).every((key) => {
          if (key !== 'user_Id') {
            return row[key] !== null && row[key] !== '';
          }
          return true; // Allow 'user_Id' to be null or not
        });
      };

     const getColumnNames = async()=>{
        try {
            const response = await axios.get(`${apiBaseUrl}/getcolumns`, {timeout: 5000});
    
            const columns = response.data
            .map((item) => item.column_name)
            .filter((name) => name !== "user_Id")
            .filter((name) => name !== "createdAt")
            .filter((name) => name !== "updatedAt")
            .filter((name) => name !== "id")

            setColumnNames(columns);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        }

     } 

    //get data for admin
    const getIndicators= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/indicators`, {timeout: 5000});
            const indData = response.data;

            

            const uniqueq4all_Ind_number= [...new Set(indData.map(item => item.q4all_Ind_number || ''))];
            setQ4AllIndNumber(uniqueq4all_Ind_number);

            const unique_catergory_of_Indicator = [...new Set(indData.map(item => item.catergory_of_Indicator || ''))]
            set_Category_Of_Indicator(unique_catergory_of_Indicator)

            const unique_type_of_healthcare = [...new Set(indData.map(item => item.type_of_healthcare || ''))]
            
            setType_Of_HealthCare(unique_type_of_healthcare)
            console.log(type_of_healthcare)

            const status2 = [...new Set(indData.map(item => item.status || ''))]
            setStatusValue(status2);
            console.log("statuses : ",status2)

            const uniqueDimension = [...new Set(indData.map(item => item.dimension || ''))]
            setDimension(uniqueDimension)

            const unique_d1_d7 = [...new Set(indData.map(item => item.type_of_healthcare_providers_D1_D7 || ''))]
            setType_Of_Healthcare_D1_D7(unique_d1_d7)

            // const unique_cross_Cutting_Dimensions_A_I = [...new Set(indData.map(item => item.cross_Cutting_Dimensions_A_I || ''))]
            // console.log("cross list ai",unique_cross_Cutting_Dimensions_A_I)
            // setCross_Cutting_Dimensions_A_I(unique_cross_Cutting_Dimensions_A_I)

            const unique_cross_Cutting_Dimensions_A_I = [
                ...new Set(
                    indData
                        .map(item => item.cross_Cutting_Dimensions_A_I || '') // Extract values
                        .flatMap(value => value.split(',').map(v => v.trim())) // Split by comma and trim spaces
                )
            ];

            console.log("cross list ai", unique_cross_Cutting_Dimensions_A_I);
            // Optionally, set the state with the unique values
            setCross_Cutting_Dimensions_A_I(unique_cross_Cutting_Dimensions_A_I);

            // const unique_Cross_Cutting_Dimensions_Inputs_Outputs = [...new Set(indData.map(item => item.cross_Cutting_Dimensions_Inputs_Process_Outputs	|| ''))]

            const unique_Cross_Cutting_Dimensions_Inputs_Outputs = [
                ...new Set(
                    indData
                        .map(item => item.cross_Cutting_Dimensions_Inputs_Process_Outputs || '') // Extract values
                        .flatMap(value => value.split(',').map(v => v.trim())) // Split by comma and trim spaces
                )
            ];
            setCross_Cutting_Dimensions_Inputs_Outputs(unique_Cross_Cutting_Dimensions_Inputs_Outputs)



            const unique_dimensions_of_quality = [...new Set(indData.map(item => item.dimensions_of_Quality_QoCOfficeReport	|| ''))]
            setDimensions_Of_Quality(unique_dimensions_of_quality)

            const uniquepriority = [...new Set(indData.map(item => item.priority || ''))]
            setPriority(uniquepriority)

            const unique_data_collection = [...new Set(indData.map(item => item.data_collection || ''))]
            setData_Collection(unique_data_collection)

            const unique_legal_organization_requirement = [...new Set(indData.map(item => item.legal_Organizational_Requirements || ''))]
            setLegal_Organizational_Requirements(unique_legal_organization_requirement)

            const unique_Selected_Indicator = [...new Set(indData.map(item => item.selected_indicator || ''))]
            if(unique_Selected_Indicator!=''){
                setSelectedIndicator(unique_Selected_Indicator)
            }
            

            const unique_piloting = [...new Set(indData.map(item => item.piloting || ''))]
            setPiloting(unique_piloting)

            const unique_pilot_outcome = [...new Set(indData.map(item => item.pilot_outcome || ''))]
            setPilot_Outcome(unique_pilot_outcome)

            const unique_forPilot = [...new Set(indData.map(item => item.forPilot || ''))]
            setforPilot(unique_forPilot)

          
            const parDataWithDates = indData.map(item => ({
                ...item,
                percentage: calculateFilledPercentage(item), // Add percentage field
            }));

            setSelectedColumns(['indicator_name', 'q4all_Ind_number'])

            setfilledRows(parDataWithDates.filter(checkRow))

            setIndicators(parDataWithDates);
            setFilteredIndicators(parDataWithDates)
            setRowsAffected(parDataWithDates.length)
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const toast = useRef(null)
    
        const accept = (id) => {
            try {
                deleteIndicator(id);
                toast.current.show({ severity: 'success', summary: 'Deleted Successfully', detail: `Item ${id} has been deleted.` });
            } catch (error) {
                console.error('Failed to delete:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete the item. Please try again.',
                    life: 3000,
                });
            } 
        };
    
        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            getIndicators()
        }
    
        const confirm = (id) => {
            confirmDialog({
                message: 'Do you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept: () => accept(id),
                reject: () => reject() // Optional
            });
        };



    const deleteIndicator = async(IndicatorId)=>{
        await axios.delete(`${apiBaseUrl}/indicators/${IndicatorId}`);
        getIndicators();
    }
    const deleteIndicatorsSelected = (ids) => {
        if (Array.isArray(ids)) {
            // Handle multiple deletions
            ids.forEach(async (id) => {
                console.log(`Deleting Dosi with ID: ${id}`);
                await axios.delete(`${apiBaseUrl}/indicators/${id}`);
            });
        } else {
            console.log(`Deleting Dosi with ID: ${ids}`);
        }
    
        // Optionally update your state after deletion to remove the deleted items from the UI
        setIndicators((prevIndicator) => prevIndicator.filter((indicator) => !ids.includes(indicator.id)));
        setFilteredIndicators((prevIndicator) => prevIndicator.filter((indicator) => !ids.includes(indicator.id)))
        setRowsAffected(indicators.length)
        setSelectedIndicator([]); // Clear selection after deletion
    };



    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const initFilters = () => {
        setFilters(initFiltersConfig());
        setGlobalFilterValue('');
    };

 

    const renderHeader = () => {
        return (
            <div className="header-container flex justify-content-between">
                <Button style = {{fontSize: "18px"}} type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
               {/* Responsive Search Field */}
               <div className="responsive-search-field">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Search"
                        />
                    </IconField>
                </div>
                
            </div>
        );
    };
   
    
    const header = renderHeader();


    const ActionsBodyTemplate = (rowData) => {
        const id = rowData.id;
        const op = useRef(null);
        const [hideTimeout, setHideTimeout] = useState(null);
    
        // Show overlay on mouse over
        const handleMouseEnter = (e) => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                setHideTimeout(null);
            }
            op.current.show(e);
        };
    
        // Hide overlay with delay on mouse leave
        const handleMouseLeave = () => {
            const timeout = setTimeout(() => {
                op.current.hide();
            }, 100); // Adjust delay as needed
            setHideTimeout(timeout);
        };
    
        return (
            <div className="actions-container">
                {/* Three dots button */}
                {/* <Button 
                    icon="pi pi-ellipsis-v" 
                    className="p-button-text"
                    aria-label="Actions"
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave} 
                /> */}
    
                {/* OverlayPanel containing action buttons in a row */}
                {/* <OverlayPanel 
                    ref={op} 
                    onClick={() => op.current.hide()} 
                    dismissable 
                    onMouseLeave={handleMouseLeave} 
                    onMouseEnter={() => {
                        if (hideTimeout) clearTimeout(hideTimeout);
                    }} 
                > */}
                    <div className="flex flex-row gap-2">
                        {/* Only show the Profile button for non-admin users */}
                        {/* {user && user.role !== "admin" && (
                            <Link to={`/paradotea/profile/${id}`}>
                                <Button icon="pi pi-eye" severity="info" aria-label="User" />
                            </Link>
                        )} */}
                        
                        {/* Show all action buttons for admin users */}
                        {user && user.role === "admin" && (
                            <>
                                {/* <Button 
                                className='action-button'
                                    icon="pi pi-eye"
                                    severity="info"
                                    aria-label="User"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Profile');
                                        setDialogVisible(true);
                                    }}
                                /> */}
                                {/* <Button
                                className='action-button'
                                    icon="pi pi-pen-to-square"
                                    severity="info"
                                    aria-label="Edit"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Edit');
                                        setDialogVisible(true);
                                    }}
                                /> */}
                                <Button
                                className='action-button'
                                    icon="pi pi-trash"
                                    severity="danger"
                                    aria-label="Delete"
                                    onClick={() => confirm(id)}
                                />
                            </>
                        )}
                    </div>
                {/* </OverlayPanel> */}
            </div>
        );
    };
    const allColumns2 = ColumnsConfig(filteredIndicators, indicators, statusValue, cross_Cutting_Dimensions_A_I, Cross_Cutting_Dimensions_Inputs_Outputs, filledRows,category_of_Indicator); // Pass the data
    const addEmptyRow = async () => {
        try {
            // Send a request to create a new empty row in the database
            const response = await axios.post(`${apiBaseUrl}/indicators`, {
                indicator_name: '',
                q4all_Ind_number: '',
                status: '',
                indicator_cluster: '',
                feedback_from_ODIPY:'',
                feedback_from_EOPYY:'',
                feedback_from_IDIKA:'',

                ind_Merge: '',
                catergory_of_Indicator: '',
                observations_from_meetings:'',
                shortlist_indicators:'',
                decision_and_next_steps:'',
                forPilot:'',
                publicationsoptions:'',

                dimension: '',
                type_of_healthcare: '',
                type_of_healthcare_providers_D1_D7: '',
                cross_Cutting_Dimensions_A_I: '',
                cross_Cutting_Dimensions_Inputs_Process_Outputs: '',
                dimensions_of_Quality_QoCOfficeReport: '',
                priority: '',
                data_collection: '',
                collecting_National_Organization: '',
                legal_Organizational_Requirements: '',
                proponent_Organization_WG: '',
                rationale_Description: '',
                objective: '',
                calculation_Formula: '',
                numerator: '',
                numerator_Definitions: '',
                denominator: '',
                denominator_Definitions: '',
                target_Population: '',
                field_Topic: '',
                extraCol2: '',
                periodicity: '',
                data_Collection_Steps: '',
                legal_Requirements: '',
                responsible_for_Monitoring: '',
                deadline_Reporting: '',
                supervisor_Body: '',
                management_Entity: '',
                applicable_period: '',
                unit_of_Measurement: '',
                data_Source_Monitoring_Basis: '',
                it_System_Source: '',
                reference_Value_Target: '',
                base_Value: '',
                notes: '',
                sources_and_Further_Reading: '',
                selected_indicator: '',
                adaptation_Needs: '',

                name_of_selected_indicator_en: '',
                frequency_of_measurement_en: '',
                description_en: '',
                unit_of_measurement_en: '',
                calculation_formula_en: '',
                numerator_en: '',
                denominator_en: '',
                comments_en: '',
                observation_en: '',
                extrafield_empty: '',
                name_of_selected_indicator_gr: '',
                frequency_of_measurement_gr: '',
                description_gr: '',
                unit_of_measurement_gr: '',
                calculation_formula_gr: '',
                numerator_gr: '',
                denominator_gr: '',
                comments_gr: '',
                observation_gr: '',
                extrafield_empty_gr: '',
                it_system_source_process: '',
                aim_of_the_indicator: '',



                piloting: '',
                opinion_from_ODIPY_Other_experts: '',
                pilot_outcome: '',
                pilot_success_criteria: ''
            });
    
            // Assuming the response contains the new row data, add it to the table
            const newRow = response.data; // Assuming the newly created row is returned from the backend
            console.log(newRow)
            setIndicators((prevIndicators) => [...prevIndicators, newRow]); // Add to the current list of indicators
            setFilteredIndicators((prevIndicators) => [...prevIndicators, newRow])
            setRowsAffected(indicators.length)
            window.location.reload();
        } catch (error) {
            console.error('Error adding new row:', error);
        }
    };
    
    const calculateFilledPercentage = (rowData) => {
        // console.log("data", rowData);
        
        // Filter out 'user_Id' when calculating total fields and filled fields
        const totalFields = Object.keys(rowData).filter(key => key !== 'user_Id').length; // Total number of fields excluding 'user_Id'
        
        const filledFields = Object.values(rowData)
            .filter((value, index) => Object.keys(rowData)[index] !== 'user_Id' && value !== null && value !== '')
            .length; // Count of filled fields excluding 'user_Id'
    
        return ((filledFields / totalFields) * 100).toFixed(0); // Calculate percentage
    };



    // const calculateFilledPercentage = (rowData) => {
    //     const totalFields = Object.keys(rowData).length; // Total number of fields in the row
    //     const filledFields = Object.values(rowData).filter(value => value !== null && value !== '').length; // Count of filled fields
    //     return ((filledFields / totalFields) * 100).toFixed(2); // Calculate percentage
    // };

// Template for the percentage column
const percentageTemplate = (rowData) => {
    const percentage = calculateFilledPercentage(rowData);
    
    // Set color based on percentage
    let color = 'black'; // Default color
    if (percentage < 30) {
        color = 'red'; // Below 30% - Red
    } 
    else if (percentage >= 30 && percentage < 60) {
        color = 'yellow'; // Between 30% and 80% - Yellow
    }
    else if (percentage >= 60 && percentage < 90) {
        color = 'orange'; // Between 30% and 80% - Yellow

    } 
    else if (percentage >= 90) {
        color = 'green'; // 100% - Green
    }

    return (
        <span style={{ color: color }}>
            {percentage}%
        </span>
    ); // Display percentage with color
};
    FilterService.register('custom_cross_Cutting_Dimensions_A_I', (value, filter) => {
        // If no filter is applied (filter is null, undefined, or an empty array), show all rows
        if (!filter || filter.length === 0) {
            return true; // Show all rows when no filter is set
        }
    
        // If the value is null, undefined, or an empty string, check if empty value is selected in the filter
        if (!value) {
            // If filter contains an empty string or null, allow the row to be displayed
            return filter.includes('') || filter.includes(null);
        }
    
        // Otherwise, split and trim the value to compare with the filter
        const valueArray = value.split(',').map((v) => v.trim()); // Split and trim any extra spaces
        return filter.some((f) => valueArray.includes(f.trim()) || (f === '' && valueArray.length === 0)); // Check if any filter value matches
    });

    FilterService.register('custom_cross_Cutting_Dimensions_Inputs_Process_Outputs', (value, filter) => {
        // If no filter is applied (filter is null, undefined, or an empty array), show all rows
        if (!filter || filter.length === 0) {
            return true; // Show all rows when no filter is set
        }
        // If the value is null, undefined, or an empty string, check if empty value is selected in the filter
        if (!value) {
            // If filter contains an empty string or null, allow the row to be displayed
            return filter.includes('') || filter.includes(null);
        }
        // Otherwise, split and trim the value to compare with the filter
        const valueArray = value.split(',').map((v) => v.trim()); // Split and trim any extra spaces
        return filter.some((f) => valueArray.includes(f.trim()) || (f === '' && valueArray.length === 0)); // Check if any filter value matches
    });


    const allColumnFields = ['indicator_name', 'q4all_Ind_number'];
        const [frozenColumns, setFrozenColumns] = useState(['indicator_name', 'q4all_Ind_number']); // Initially frozen column(s)
        const allColumnsFrozen = frozenColumns.length === allColumnFields.length;
        
        // Function to toggle a column's frozen state
        const toggleFreezeColumn = (fieldName) => {
            setFrozenColumns((prev) =>
                prev.includes(fieldName)
                    ? prev.filter(col => col !== fieldName) // Unfreeze column if already frozen
                    : [...prev, fieldName]                  // Freeze column if not frozen
            );
        };
     // Handle apply button click
//   const fetchIndicators = () => {
//     if (selectedColumns.length === 0) {
//       alert("Please select at least one column.");
//       return;
//     }

//     axios
//       .post(`${apiBaseUrl}/getIndByColumns`, { columnNames: selectedColumns })
//       .then((response) => {
//         setIndicators(response.data);
//       })
//       .catch((error) => console.error("Error fetching indicators:", error));
//   };




//   const allColumns = {

// };
    return(
        <div>

<div className="p-4">
      <h3>Select Columns</h3>

      
      {/* MultiSelect Dropdown */}
      <MultiSelect
        value={selectedColumns}
        options={columnNames.map((col) => ({ label: col, value: col }))}
        onChange={(e) => setSelectedColumns(e.value)}
        placeholder="Select Columns"
        display="chip"
        className="w-full md:w-20rem"
      />
       {/* <MultiSelect
            value={selectedFrozenColumnNames}
            options={selectedColumns.map((col) => ({ label: col, value: col }))}
            onChange={(e) => setSelectedFrozenColumnNames(e.value)}
            placeholder="Freeze Columns"
            display="chip"
            className="w-full md:w-20rem mb-3"
        /> */}
      
      {/* Apply Button */}
      {/* <Button
        label="Apply"
        icon="pi pi-check"
        onClick={fetchIndicators}
        className="p-button-success mt-3"
      /> */}

      {/* Data Table */}
      {/* {indicators.length > 0 && (
        <div className="mt-4">
          <h3>Results</h3>
          <DataTable value={indicators} responsiveLayout="scroll">
            {selectedColumns.map((col) => allColumns[col])}
          </DataTable>
        </div>
      )} */}
    </div>


        <Card className="kpi-section-card">
            <div className="kpi-section">
                {/* Total Customers */}
                <div className="kpi-item">
                    <div className="kpi-icon">
                        {/* <i className="pi pi-users"></i> */}
                        <img src={TotalIndicators} alt="Search" style={{ width: "64px", cursor: "pointer" }} />                   

                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Total Indicators</span>
                        <h2 className="kpi-value">{indicators.length} </h2>
                       
                    </div>
                </div>
                {/* Separator Line */}
                <div className="kpi-separator"></div>
                {/* Members */}
                <div className="kpi-item">
                    <div className="kpi-icon">
                        {/* <i className="pi pi-user"></i> */}
                        <img src={indicatortwo} alt="Search" style={{ width: "32px", cursor: "pointer" }} />                   

                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Completed Indicators</span>
                        <h2 className="kpi-value">{filledRows.length}</h2>
                     
                    </div>
                </div>
                {/* Separator Line */}
                <div className="kpi-separator"></div>
                {/* Active Now */}
                <div className="kpi-item">
                    <div className="kpi-icon" style={{backgroundColor:"pink"}}>
                        {/* <i className="pi pi-desktop"></i> */}
                        <img src={indicatorthree} alt="Search" style={{ width: "32px", cursor: "pointer" }} />
                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Not Completed</span>
                        <h2 className="kpi-value">{indicators.length - filledRows.length }</h2>

                    </div>
                </div>
            </div>
        </Card>

        <div className="datatable-container">

        <div >
        <h1 className='title' style={{font:'Poppins',fontSize:'22px',fontWeight:'600',lineHeight:'33px',color:'rgba(0, 0, 0, 1)'}}>Indicators Table</h1>
        <div className='d-flex align-items-center gap-4'>
        
        {user && user.role ==="admin" && (
        <Link to={"/indicators/add"} ><Button label="New Indicator row" className='p-button2 is-primary mb-2 rounded' icon="pi pi-plus-circle"/></Link>
    )}

        {user && user.role === "admin" && (
                <Button
                    label="New Empty Row"
                    className="p-button2 is-primary mb-2 rounded"
                    icon="pi pi-plus-circle"
                    style = {{marginLeft: "50px"}}
                    onClick={addEmptyRow} // Trigger the addEmptyRow function
                />
            )}

     {selectedIndicator.length > 0 && (
      
            
            <Button
            className='p-button3 is-primary mb-2 rounded' 
            label="Delete Selected" 
                icon="pi pi-trash" 
                severity="danger"
                style = {{marginLeft: "50px"}} 
                onClick={() => deleteIndicatorsSelected(selectedIndicator.map(indicator => indicator.id))} // Pass an array of selected IDs
            />
      
            
        )} 
        </div>

        {/* <ToggleButton checked={balanceFrozen} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Balance" offLabel="Balance" /> */}
        <Toast ref={toast} />
        <ConfirmDialog />

<DataTable  
            value={indicators}    
            editMode="cell" ref = {dt} 
            onValueChange={(Updatedindicators) => {setFilteredIndicators(Updatedindicators);  console.log(filteredIndicators.length, "Toso mikos"); setRowsAffected(Updatedindicators.length)}}
            paginator stripedRows
            rows={25} 
            scrollable scrollHeight="600px" loading={loading} 
            dataKey="id" 
            filters={filters} 
            globalFilterFields={columnNames}
            header={header} 
            emptyMessage="No Indicators found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            >

            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} frozen></Column>

            <Column className='font-bold' field="id" header="id" sortable style={{ minWidth: '2rem', color: 'black' }}  frozen></Column>
            <Column
             className='font-bold'
                header="Filled Percentage"
                sortable
                body={percentageTemplate}
                style={{ minWidth: '6rem',color:'rgba(181, 183, 192, 1)', textAlign: 'center' }} field='percentage' 
            ></Column>
            {selectedColumns.map((col) => (
                    <Column key={col} {...allColumns2[col]} />
                ))}
            {/* {selectedColumns.map((col) => allColumns[col])} 2*/}
            <Column header="Actions" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen headerStyle={{  color: 'rgba(18, 0, 147, 1)' }}/>

 </DataTable>

    {/* Dialog for editing Paradotea */}
    
            <div>
            <h3 style={{fontFamily:'Poppins',fontSize:'14px',lineHeight:'21px',fontWeight:'500',color:'rgba(181, 183, 192, 1)'}}>Showing {RowsAffected} rows were found based on search criteria</h3>
            </div>
        
     </div>

    </div>
    </div>
    )
}

export default IndicatorsList;