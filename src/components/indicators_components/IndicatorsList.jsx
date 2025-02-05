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

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
// import { Dialog } from 'primereact/dialog'; // Import Dialog

import { OverlayPanel } from 'primereact/overlaypanel';
// import indicatorsData from '../../data/indicators.json'; // Adjust the path based on file location
import { Tooltip } from "primereact/tooltip";
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
    forPilotlist 
} from './IndicatorUtils';  // Adjust the path as necessary
import { headers } from './headersConfig';  // Import the header configuration
import { initFiltersConfig } from './filtersConfig';
import FilterIndicators from './FilterIndicators';
import "./datatable-custom.css"; // Your custom styles
import TotalIndicators from '../../icons/Total indicators.svg'
import indicatortwo from '../../icons/Group 301.svg'
import indicatorthree from '../../icons/Group 302.svg'
import { Card } from "primereact/card";


const IndicatorsList = () => {
    const [indicators, setIndicators] = useState([]);

    const [columnNames, setColumnNames] = useState([]);

    const [selectedFrozenColumnNames, setselectedFrozenColumnNames] = useState([]);
    const [frozenColumns, setFrozenColumns] = useState([]);

    const [selectedColumns, setSelectedColumns] = useState([]); // User selected columns

    // const [filters, setFilters] = useState(null);
    const [filters, setFilters] = useState(initFiltersConfig);

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredIndicators, setFilteredIndicators] = useState([]);
    const [RowsAffected, setRowsAffected] = useState(indicators.length)

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

    //hint custom
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
            width:"250px"
          }}
        >
          {hint}
        </small>
        <Tooltip target={`#hint-${field}`} content={hint} />
      </div>
    );


    useEffect(()=>{

        if (user!=null && user.role=="user"){
            getColumnNames()
            getIndicatorsByUser()
        }else if(user!=null && user.role=="admin"){
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

            setfilledRows(parDataWithDates.filter(checkRow))

            setIndicators(parDataWithDates);
            setFilteredIndicators(parDataWithDates)
            setRowsAffected(parDataWithDates.length)
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


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
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
               {/* Responsive Search Field */}
               <div className="responsive-search-field">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Keyword Search"
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
                                    onClick={() => deleteIndicator(id)}
                                />
                            </>
                        )}
                    </div>
                {/* </OverlayPanel> */}
            </div>
        );
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

        else return textEditor(options);
    };
    
    // const textEditor = (options) => {
    //     return (
    //         <InputText
    //             type="text"
    //             value={options.value}
    //             onChange={(e) => options.editorCallback(e.target.value)}
    //             onKeyDown={(e) => e.stopPropagation()}
    //         />
    //     );
    // };

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


    const generalBodyTemplate = (rowData,list,field) => {
        const field1 = list.find((cat) => cat.value === rowData.field);
        return field1 ? field1.label : rowData.field; // Display label instead of value
    };
   
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
        console.log("data", rowData);
        
        // Filter out 'user_Id' when calculating total fields and filled fields
        const totalFields = Object.keys(rowData).filter(key => key !== 'user_Id').length; // Total number of fields excluding 'user_Id'
        
        const filledFields = Object.values(rowData)
            .filter((value, index) => Object.keys(rowData)[index] !== 'user_Id' && value !== null && value !== '')
            .length; // Count of filled fields excluding 'user_Id'
    
        return ((filledFields / totalFields) * 100).toFixed(2); // Calculate percentage
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

    console.log("Menei: ", category_of_Indicator)
    
    // The rule argument should be a string in the format "custom_[field]".
    // FilterService.register('custom_cross_Cutting_Dimensions_A_I', (value, filter) => {
    //     // const [from, to] = filters ?? [null, null];
    //     // if (from === null && to === null) return true;
    //     // if (from !== null && to === null) return from <= value;
    //     // if (from === null && to !== null) return value <= to;
    //     // return from <= value && value <= to;

        
    //         if (!filter || filter.length === 0) {
    //             return true; // No filter applied, show all
    //         }
    //         const valueArray = value.split(','); // Split the cell value into an array
    //         return filter.some((f) => valueArray.includes(f)); // Check if any filter value matches
        
    // });
    /////CUSTOM FILTER FOR custom_cross_Cutting_Dimensions_A_I
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
    


     // Handle apply button click
  const fetchIndicators = () => {
    if (selectedColumns.length === 0) {
      alert("Please select at least one column.");
      return;
    }

    axios
      .post(`${apiBaseUrl}/getIndByColumns`, { columnNames: selectedColumns })
      .then((response) => {
        setIndicators(response.data);
      })
      .catch((error) => console.error("Error fetching indicators:", error));
  };


   // Function to toggle freezing of a column
   const toggleFreeze = (columnKey) => {
        setFrozenColumns((prev) =>
            prev.includes(columnKey)
                ? prev.filter((col) => col !== columnKey) // Remove if already frozen
                : [...prev, columnKey] // Add if not frozen
            );
    };

  const allColumns = {

    id : <Column className='font-bold' field="id" header="id" sortable style={{ minWidth: '2rem', color: 'black' }} frozen ></Column> , 
indicator_name : <Column field="indicator_name"  header={customHeader(headers.indicator_name.label, headers.indicator_name.description, "indicator_name")}  filter filterPlaceholder="Search by Indicator Name" style={{ minWidth: '18rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  {...(selectedFrozenColumnNames.includes("indicator_name") ? { frozen: true } : {})} ></Column> , 
q4all_Ind_number : <Column field="q4all_Ind_number" header={customHeader(headers.q4all_Ind_number.label, headers.q4all_Ind_number.description, "q4all_Ind_number")}  filter filterField='q4all_Ind_number' filterElement={(option) => (<FilterIndicators options={option} data={q4all_Ind_number} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} body={q4all_Ind_number_BodyTemplate} style={{ minWidth: '21rem' }} {...(selectedFrozenColumnNames.includes("q4all_Ind_number") ? { frozen: true } : {})}></Column> , 
indicator_cluster : <Column field="indicator_cluster" header={customHeader(headers.indicator_cluster.label, headers.indicator_cluster.description, "indicator_cluster")} filter filterPlaceholder="Search by Indicator Cluster" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
feedback_from_ODIPY : <Column field="feedback_from_ODIPY" header={customHeader(headers.feedback_from_ODIPY.label, headers.feedback_from_ODIPY.description, "feedback_from_ODIPY")} filter filterPlaceholder="Search by feedback_from_ODIPY" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
feedback_from_EOPYY : <Column field="feedback_from_EOPYY" header={customHeader(headers.feedback_from_EOPYY.label, headers.feedback_from_EOPYY.description, "feedback_from_EOPYY")} filter filterPlaceholder="Search by feedback_from_EOPYY" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
feedback_from_IDIKA : <Column field="feedback_from_IDIKA" header={customHeader(headers.feedback_from_IDIKA.label, headers.feedback_from_IDIKA.description, "feedback_from_IDIKA")} filter filterPlaceholder="Search by feedback_from_IDIKA" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
ind_Merge : <Column field="ind_Merge" header={customHeader(headers.ind_Merge.label, headers.ind_Merge.description, "ind_Merge")}filter filterPlaceholder="Search by Indicator Merge" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
catergory_of_Indicator : <Column field="catergory_of_Indicator"  header={customHeader("Category of Indicator","The origin or source of inspiration for the KPI, such as whether it is adapted from another country's indicator, an international standard, or developed internally." ,"catergory_of_Indicator")} filter filterField='catergory_of_Indicator' filterElement={(option)=>(<FilterIndicators options={option} data={category_of_Indicator} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} body={generalBodyTemplate(indicators,category_of_indicators,'catergory_of_Indicator')} style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
observations_from_meetings : <Column field="observations_from_meetings" header={customHeader(headers.observations_from_meetings.label, headers.observations_from_meetings.description, "observations_from_meetings")} filter filterPlaceholder="Search by observations_from_meetings" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
shortlist_indicators : <Column field="shortlist_indicators" header={customHeader(headers.shortlist_indicators.label, headers.shortlist_indicators.description, "feedback_from_IDIKA")} filter filterPlaceholder="Search by shortlist_indicators" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
decision_and_next_steps : <Column field="decision_and_next_steps" header={customHeader(headers.decision_and_next_steps.label, headers.decision_and_next_steps.description, "decision_and_next_steps")} filter filterPlaceholder="Search by decision_and_next_steps" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
forPilot : <Column field="forPilot" header={customHeader(headers.forPilot.label, headers.forPilot.description, "forPilot")} filter filterField = 'forPilot' filterElement={(option)=>(<FilterIndicators options={option} data={forPilot} itemTemplate={ItemTemplate}/>)}  style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,forPilotlist,'forPilot')}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
publicationsoptions : <Column field="publicationsoptions" header={customHeader(headers.publicationsoptions.label, headers.publicationsoptions.description, "publicationsoptions")} filter filterPlaceholder="Search by publicationsoptions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
dimension : <Column field="dimension"  header={customHeader(headers.dimension.label,headers.dimension.description,"dimension")} filter filterElement={(option)=>(<FilterIndicators options={option} data={dimension} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} filterField='dimension' style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,dimensions,'dimension')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
type_of_healthcare : <Column field="type_of_healthcare" header={customHeader(headers.type_of_healthcare.label,headers.type_of_healthcare.description,"type_of_healthcare")} filter filterField = 'type_of_healthcare' filterElement={(option)=>(<FilterIndicators options={option} data={type_of_healthcare} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={generalBodyTemplate(indicators,domains,'type_of_healthcare')}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
type_of_healthcare_providers_D1_D7 : <Column field="type_of_healthcare_providers_D1_D7" header={customHeader(headers.type_of_healthcare_providers_D1_D7.label,headers.type_of_healthcare_providers_D1_D7.description  ,"type_of_healthcare_providers_D1_D7")} filter filterElement={(option)=>(<FilterIndicators options={option} data={type_of_healthcare_D1_D7} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,type_of_healthcare_providers_D1_D7list,'type_of_healthcare_providers_D1_D7')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column> , 
cross_Cutting_Dimensions_A_I : <Column field="cross_Cutting_Dimensions_A_I"  header={customHeader(headers.cross_Cutting_Dimensions_A_I.label,headers.cross_Cutting_Dimensions_A_I.description,"cross_Cutting_Dimensions_A_I")} filter filterElement={(option)=>(<FilterIndicators options={option} data={cross_Cutting_Dimensions_A_I} itemTemplate={ItemTemplate}/>)} filterField='cross_Cutting_Dimensions_A_I' showFilterMatchModes={false} style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,classification_dimension,'cross_Cutting_Dimensions_A_I')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
cross_Cutting_Dimensions_Inputs_Process_Outputs : <Column field="cross_Cutting_Dimensions_Inputs_Process_Outputs" header={customHeader(headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.label,headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.description,"cross_Cutting_Dimensions_Inputs_Process_Outputs")} filter filterElement={(option)=>(<FilterIndicators options={option} data={Cross_Cutting_Dimensions_Inputs_Outputs} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,cross_Cutting_Dimensions_Inputs_Process_Outputlist,'cross_Cutting_Dimensions_Inputs_Process_Outputs')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
dimensions_of_Quality_QoCOfficeReport : <Column field="dimensions_of_Quality_QoCOfficeReport" header={customHeader(headers.dimensions_of_Quality_QoCOfficeReport.label,headers.dimensions_of_Quality_QoCOfficeReport.description ,"dimensions_of_Quality_QoCOfficeReport")} filter filterElement={(option)=>(<FilterIndicators options={option} data={dimensions_of_quality} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} filterPlaceholder="Search by Dimensions of Quality" style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,QoCOfficeReportlist,'dimensions_of_Quality_QoCOfficeReport')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}   ></Column> , 
priority : <Column field="priority"  header={customHeader(headers.priority.label,headers.priority.description,"priority")} filter filterElement={(option)=>(<FilterIndicators options={option} data={priority} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,prioritylist,'priority')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}   ></Column> , 
data_collection : <Column field="data_collection" header={customHeader(headers.data_collection.label,headers.data_collection.description ,"data_collection")} filter filterElement={(option)=>(<FilterIndicators options={option} data={data_collection} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,data_collection_list,'data_collection')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
collecting_National_Organization : <Column field="collecting_National_Organization" header={customHeader(headers.collecting_National_Organization.label,headers.collecting_National_Organization.description ,"collecting_National_Organization")} filter filterPlaceholder="Search by Collecting Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
legal_Organizational_Requirements : <Column field="legal_Organizational_Requirements"  header={customHeader(headers.legal_Organizational_Requirements.label,headers.legal_Organizational_Requirements.description ,"legal_Organizational_Requirements")} filter filterElement={(option)=>(<FilterIndicators options={option} data={legal_Organizational_Requirements} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,legal_Organizational_Requirements_list,'legal_Organizational_Requirements')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column> , 
proponent_Organization_WG : <Column field="proponent_Organization_WG" header={customHeader(headers.proponent_Organization_WG.label,headers.proponent_Organization_WG.description,"proponent_Organization_WG")} filter filterPlaceholder="Search by Proponent Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
rationale_Description : <Column field="rationale_Description"  header={customHeader(headers.rationale_Description.label,headers.rationale_Description.description ,"rationale_Description")} filter filterPlaceholder="Search by Rationale Description" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
objective : <Column field="objective"  header={customHeader(headers.objective.label,headers.objective.description ,"objective")}  filter filterPlaceholder="Search by Objective" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
calculation_Formula : <Column field="calculation_Formula"   header={customHeader(headers.calculation_Formula.label,headers.calculation_Formula.description ,"calculation_Formula")}   filter filterPlaceholder="Search by Calculation Formula" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
numerator : <Column field="numerator"  header={customHeader(headers.numerator.label,headers.numerator.description,"numerator")}  filter filterPlaceholder="Search by Numerator" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
numerator_Definitions : <Column field="numerator_Definitions"   header={customHeader(headers.numerator_Definitions.label,headers.numerator_Definitions.description ,"numerator_Definitions")}  filter filterPlaceholder="Search by Numerator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
denominator : <Column field="denominator"  header={customHeader(headers.denominator.label,headers.denominator.description,"denominator")}  filter filterPlaceholder="Search by Denominator" style={{ minWidth: '12rem' }}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
denominator_Definitions : <Column field="denominator_Definitions" header={customHeader(headers.denominator_Definitions.label,headers.denominator_Definitions.description ,"denominator_Definitions")}   filter filterPlaceholder="Search by Denominator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
target_Population : <Column field="target_Population"  header={customHeader(headers.target_Population.label,headers.target_Population.description ,"target_Population")} filter filterPlaceholder="Search by Target Population" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
field_Topic : <Column field="field_Topic" header={customHeader(headers.field_Topic.label,headers.field_Topic.description ,"field_Topic")} filter filterPlaceholder="Search by Field Topic" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
extraCol2 : <Column field="extraCol2" header={customHeader(headers.extraCol2.label,headers.extraCol2.description ,"extraCol2")} filter filterPlaceholder="Search by Extra Column 2" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
periodicity : <Column field="periodicity"  header={customHeader(headers.periodicity.label,headers.periodicity.description ,"periodicity")} filter filterPlaceholder="Search by Periodicity" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
data_Collection_Steps : <Column field="data_Collection_Steps"  header={customHeader(headers.data_Collection_Steps.label ,headers.data_Collection_Steps.description,"data_Collection_Steps")} filter filterPlaceholder="Search by Data Collection Steps" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
legal_Requirements : <Column field="legal_Requirements" header={customHeader(headers.legal_Requirements.label ,headers.legal_Requirements.description,"legal_Requirements")} filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
responsible_for_Monitoring : <Column field="responsible_for_Monitoring" header={customHeader(headers.responsible_for_Monitoring.label,headers.responsible_for_Monitoring.description  ,"responsible_for_Monitoring")} filter filterPlaceholder="Search by Responsible for Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
deadline_Reporting : <Column field="deadline_Reporting"  header={customHeader(headers.deadline_Reporting.label, headers.deadline_Reporting.description, "deadline_Reporting")} filter filterPlaceholder="Search by Deadline Reporting" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
supervisor_Body : <Column field="supervisor_Body"     header={customHeader(headers.supervisor_Body.label, headers.supervisor_Body.description, "supervisor_Body")} filter filterPlaceholder="Search by Supervisor Body" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
management_Entity : <Column field="management_Entity"   header={customHeader(headers.management_Entity.label, headers.management_Entity.description, "management_Entity")} filter filterPlaceholder="Search by Management Entity" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
applicable_period : <Column field="applicable_period"   header={customHeader(headers.applicable_period.label, headers.applicable_period.description, "applicable_period")} filter filterPlaceholder="Search by Applicable Period" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
unit_of_Measurement : <Column field="unit_of_Measurement" header={customHeader(headers.unit_of_Measurement.label, headers.unit_of_Measurement.description, "unit_of_Measurement")} filter filterPlaceholder="Search by Unit of Measurement" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
data_Source_Monitoring_Basis : <Column field="data_Source_Monitoring_Basis"     header={customHeader(headers.data_Source_Monitoring_Basis.label, headers.data_Source_Monitoring_Basis.description, "data_Source_Monitoring_Basis")} filter filterPlaceholder="Search by Data Source Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
it_System_Source : <Column field="it_System_Source"     header={customHeader(headers.it_System_Source.label, headers.it_System_Source.description, "it_System_Source")}  filter filterPlaceholder="Search by IT System Source" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
reference_Value_Target : <Column field="reference_Value_Target" header={customHeader(headers.reference_Value_Target.label, headers.reference_Value_Target.description, "reference_Value_Target")}  filter filterPlaceholder="Search by Reference Value Target" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
base_Value : <Column field="base_Value"    header={customHeader(headers.base_Value.label, headers.base_Value.description, "base_Value")} filter filterPlaceholder="Search by Base Value" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
notes : <Column field="notes"     header={customHeader(headers.notes.label, headers.notes.description, "notes")} filter filterPlaceholder="Search by Notes" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
sources_and_Further_Reading : <Column field="sources_and_Further_Reading"     header={customHeader(headers.sources_and_Further_Reading.label, headers.sources_and_Further_Reading.description, "sources_and_Further_Reading")} filter filterPlaceholder="Search by Sources and Further Reading" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
selected_indicator : <Column field="selected_indicator"  header={customHeader(headers.selected_indicator.label, headers.selected_indicator.description, "selected_indicator")} filter filterElement={(option)=>(<FilterIndicators options={option} data={selected_indicator} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,selected_indicator_list,'selected_indicator')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column> , 
adaptation_Needs : <Column field="adaptation_Needs"  header={customHeader(headers.adaptation_Needs.label, headers.adaptation_Needs.description, "adaptation_Needs")}  filter filterPlaceholder="Search by Adaptation Needs" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
piloting : <Column field="piloting" header={customHeader(headers.piloting.label, headers.piloting.description, "piloting")} filter filterField='piloting' filterElement={(option)=>(<FilterIndicators options={option} data={piloting} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,piloting_list,'piloting')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column> , 
opinion_from_ODIPY_Other_experts : <Column field="opinion_from_ODIPY_Other_experts" header={customHeader(headers.opinion_from_ODIPY_Other_experts.label, headers.opinion_from_ODIPY_Other_experts.description, "opinion_from_ODIPY_Other_experts")} filter filterPlaceholder="Search by Expert Opinion" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
pilot_outcome : <Column field="pilot_outcome" header={customHeader(headers.pilot_outcome.label, headers.pilot_outcome.description, "pilot_outcome")} filter filterField='pilot_outcome' filterElement={(option)=>(<FilterIndicators options={option} data={pilot_outcome} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,pilot_outcome_list,"pilot_outcome")} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 
pilot_success_criteria : <Column field="pilot_success_criteria"     header={customHeader(headers.pilot_success_criteria.label, headers.pilot_success_criteria.description, "pilot_success_criteria")} filter filterPlaceholder="Search by Success Criteria" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column> , 

};
    

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

    <MultiSelect
        value={selectedFrozenColumnNames}
        options={selectedColumns.map((col) => ({ label: col, value: col }))}
        onChange={(e) => setselectedFrozenColumnNames(e.value)}
        placeholder="Select Columns"
        display="chip"
        className="w-full md:w-20rem"
      />
      
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



<DataTable value={indicators}  editMode="cell" ref = {dt} onValueChange={(Updatedindicators) => {setFilteredIndicators(Updatedindicators);  console.log(filteredIndicators.length, "Toso mikos"); setRowsAffected(Updatedindicators.length)}} paginator stripedRows
 rows={25} scrollable scrollHeight="600px" loading={loading} dataKey="id" 
            filters={filters} 
            globalFilterFields={columnNames}
    //         globalFilterFields={[
                
    //             'id', 'percentage', 'indicator_name',  'q4all_Ind_number',
    //              'status', 'indicator_cluster',      'ind_Merge',   'catergory_of_Indicator', 'feedback_from_ODIPY', 
    //               'feedback_from_EOPYY', 'feedback_from_IDIKA', 'dimension',  
    //               'observations_from_meetings'  ,'shortlist_indicators' ,'decision_and_next_steps','forPilot','publicationsoptions',
    //                'type_of_healthcare',  'type_of_healthcare_providers_D1_D7',  'cross_Cutting_Dimensions_A_I', 
    //                 'cross_Cutting_Dimensions_Inputs_Process_Outputs',   'dimensions_of_Quality_QoCOfficeReport', 
    //                   'priority',  'data_collection',     'collecting_National_Organization',  
    //                     'legal_Organizational_Requirements',    'proponent_Organization_WG',  
    //                      'rationale_Description', 'objective',   'calculation_Formula',   
    //                   'numerator','numerator_Definitions', 'denominator','denominator_Definitions', 
    //                   'target_Population', 'field_Topic', 'extraCol2', 'periodicity', 'data_Collection_Steps', 
    //                   'legal_Requirements', 'responsible_for_Monitoring', 'deadline_Reporting', 'supervisor_Body', 
    //                   'management_Entity', 'applicable_period', 'unit_of_Measurement', 'data_Source_Monitoring_Basis',
    //                    'it_System_Source', 'reference_Value_Target', 'base_Value', 'notes', 'sources_and_Further_Reading',
    //                     'selected_indicator', 'adaptation_Needs', 
    //                     'name_of_selected_indicator_en', 
    // 'frequency_of_measurement_en', 
    // 'description_en', 
    // 'unit_of_measurement_en', 
    // 'calculation_formula_en', 
    // 'numerator_en', 
    // 'denominator_en', 
    // 'comments_en', 
    // 'observation_en', 
    // 'extrafield_empty', 
    // 'name_of_selected_indicator_gr', 
    // 'frequency_of_measurement_gr', 
    // 'description_gr', 
    // 'unit_of_measurement_gr', 
    // 'calculation_formula_gr', 
    // 'numerator_gr', 
    // 'denominator_gr', 
    // 'comments_gr', 
    // 'observation_gr', 
    // 'extrafield_empty_gr', 
    // 'it_system_source_process', 
    // 'aim_of_the_indicator',
                        
    //                     'piloting', 'opinion_from_ODIPY_Other_experts',
    //                      'pilot_outcome', 'pilot_success_criteria' 
                        
    //                     ]} 
            header={header} 
            emptyMessage="No Indicators found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} frozen></Column>

            <Column className='font-bold' field="id" header="id" sortable style={{ minWidth: '2rem', color: 'black' }} frozen ></Column>
            <Column
             className='font-bold'
                header="Filled Percentage"
                sortable
                body={percentageTemplate}
                style={{ minWidth: '12rem',color: 'black', textAlign: 'center' }} field='percentage'
             frozen></Column>

{selectedColumns.map((col) => allColumns[col])}

            {/* <Column field="indicator_name"  header={customHeader(headers.indicator_name.label, headers.indicator_name.description, "indicator_name")}  filter filterPlaceholder="Search by Indicator Name" style={{ minWidth: '18rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="q4all_Ind_number" header={customHeader(headers.q4all_Ind_number.label, headers.q4all_Ind_number.description, "q4all_Ind_number")}  filter filterField='q4all_Ind_number' filterElement={(option) => (<FilterIndicators options={option} data={q4all_Ind_number} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} body={q4all_Ind_number_BodyTemplate} style={{ minWidth: '21rem' }}></Column>
            <Column field="status" header={customHeader(headers.status.label, headers.status.description, "status")} filter filterField='status' filterElement={(option) => (<FilterIndicators  
                        options={option}
                        data={statusValue}
                        itemTemplate={ItemTemplate} />)} style={{ minWidth: '12rem' }} showFilterMatchModes={false} body={generalBodyTemplate(indicators, statusValue, 'status')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="indicator_cluster" header={customHeader(headers.indicator_cluster.label, headers.indicator_cluster.description, "indicator_cluster")} filter filterPlaceholder="Search by Indicator Cluster" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
           
            <Column field="feedback_from_ODIPY" header={customHeader(headers.feedback_from_ODIPY.label, headers.feedback_from_ODIPY.description, "feedback_from_ODIPY")} filter filterPlaceholder="Search by feedback_from_ODIPY" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="feedback_from_EOPYY" header={customHeader(headers.feedback_from_EOPYY.label, headers.feedback_from_EOPYY.description, "feedback_from_EOPYY")} filter filterPlaceholder="Search by feedback_from_EOPYY" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="feedback_from_IDIKA" header={customHeader(headers.feedback_from_IDIKA.label, headers.feedback_from_IDIKA.description, "feedback_from_IDIKA")} filter filterPlaceholder="Search by feedback_from_IDIKA" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>

           
           ////
           /
           
           
           
           
            <Column field="ind_Merge" header={customHeader(headers.ind_Merge.label, headers.ind_Merge.description, "ind_Merge")}filter filterPlaceholder="Search by Indicator Merge" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="catergory_of_Indicator"  header={customHeader("Category of Indicator","The origin or source of inspiration for the KPI, such as whether it is adapted from another country's indicator, an international standard, or developed internally." ,"catergory_of_Indicator")} filter filterField='catergory_of_Indicator' filterElement={(option)=>(<FilterIndicators options={option} data={category_of_Indicator} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} body={generalBodyTemplate(indicators,category_of_indicators,'catergory_of_Indicator')} style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
           
            <Column field="observations_from_meetings" header={customHeader(headers.observations_from_meetings.label, headers.observations_from_meetings.description, "observations_from_meetings")} filter filterPlaceholder="Search by observations_from_meetings" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="shortlist_indicators" header={customHeader(headers.shortlist_indicators.label, headers.shortlist_indicators.description, "feedback_from_IDIKA")} filter filterPlaceholder="Search by shortlist_indicators" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="decision_and_next_steps" header={customHeader(headers.decision_and_next_steps.label, headers.decision_and_next_steps.description, "decision_and_next_steps")} filter filterPlaceholder="Search by decision_and_next_steps" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>

            <Column field="forPilot" header={customHeader(headers.forPilot.label, headers.forPilot.description, "forPilot")} filter filterField = 'forPilot' filterElement={(option)=>(<FilterIndicators options={option} data={forPilot} itemTemplate={ItemTemplate}/>)}  style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,forPilotlist,'forPilot')}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="publicationsoptions" header={customHeader(headers.publicationsoptions.label, headers.publicationsoptions.description, "publicationsoptions")} filter filterPlaceholder="Search by publicationsoptions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>

           
            <Column field="dimension"  header={customHeader(headers.dimension.label,headers.dimension.description,"dimension")} filter filterElement={(option)=>(<FilterIndicators options={option} data={dimension} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} filterField='dimension' style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,dimensions,'dimension')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="type_of_healthcare" header={customHeader(headers.type_of_healthcare.label,headers.type_of_healthcare.description,"type_of_healthcare")} filter filterField = 'type_of_healthcare' filterElement={(option)=>(<FilterIndicators options={option} data={type_of_healthcare} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={generalBodyTemplate(indicators,domains,'type_of_healthcare')}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="type_of_healthcare_providers_D1_D7" header={customHeader(headers.type_of_healthcare_providers_D1_D7.label,headers.type_of_healthcare_providers_D1_D7.description  ,"type_of_healthcare_providers_D1_D7")} filter filterElement={(option)=>(<FilterIndicators options={option} data={type_of_healthcare_D1_D7} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,type_of_healthcare_providers_D1_D7list,'type_of_healthcare_providers_D1_D7')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column>
            <Column field="cross_Cutting_Dimensions_A_I"  header={customHeader(headers.cross_Cutting_Dimensions_A_I.label,headers.cross_Cutting_Dimensions_A_I.description,"cross_Cutting_Dimensions_A_I")} filter filterElement={(option)=>(<FilterIndicators options={option} data={cross_Cutting_Dimensions_A_I} itemTemplate={ItemTemplate}/>)} filterField='cross_Cutting_Dimensions_A_I' showFilterMatchModes={false} style={{ minWidth: '12rem' }}  body={generalBodyTemplate(indicators,classification_dimension,'cross_Cutting_Dimensions_A_I')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="cross_Cutting_Dimensions_Inputs_Process_Outputs" header={customHeader(headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.label,headers.cross_Cutting_Dimensions_Inputs_Process_Outputs.description,"cross_Cutting_Dimensions_Inputs_Process_Outputs")} filter filterElement={(option)=>(<FilterIndicators options={option} data={Cross_Cutting_Dimensions_Inputs_Outputs} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,cross_Cutting_Dimensions_Inputs_Process_Outputlist,'cross_Cutting_Dimensions_Inputs_Process_Outputs')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="dimensions_of_Quality_QoCOfficeReport" header={customHeader(headers.dimensions_of_Quality_QoCOfficeReport.label,headers.dimensions_of_Quality_QoCOfficeReport.description ,"dimensions_of_Quality_QoCOfficeReport")} filter filterElement={(option)=>(<FilterIndicators options={option} data={dimensions_of_quality} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} filterPlaceholder="Search by Dimensions of Quality" style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,QoCOfficeReportlist,'dimensions_of_Quality_QoCOfficeReport')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}   ></Column>
            <Column field="priority"  header={customHeader(headers.priority.label,headers.priority.description,"priority")} filter filterElement={(option)=>(<FilterIndicators options={option} data={priority} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,prioritylist,'priority')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}   ></Column>
            <Column field="data_collection" header={customHeader(headers.data_collection.label,headers.data_collection.description ,"data_collection")} filter filterElement={(option)=>(<FilterIndicators options={option} data={data_collection} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,data_collection_list,'data_collection')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="collecting_National_Organization" header={customHeader(headers.collecting_National_Organization.label,headers.collecting_National_Organization.description ,"collecting_National_Organization")} filter filterPlaceholder="Search by Collecting Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="legal_Organizational_Requirements"  header={customHeader(headers.legal_Organizational_Requirements.label,headers.legal_Organizational_Requirements.description ,"legal_Organizational_Requirements")} filter filterElement={(option)=>(<FilterIndicators options={option} data={legal_Organizational_Requirements} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,legal_Organizational_Requirements_list,'legal_Organizational_Requirements')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column>
            <Column field="proponent_Organization_WG" header={customHeader(headers.proponent_Organization_WG.label,headers.proponent_Organization_WG.description,"proponent_Organization_WG")} filter filterPlaceholder="Search by Proponent Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="rationale_Description"  header={customHeader(headers.rationale_Description.label,headers.rationale_Description.description ,"rationale_Description")} filter filterPlaceholder="Search by Rationale Description" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="objective"  header={customHeader(headers.objective.label,headers.objective.description ,"objective")}  filter filterPlaceholder="Search by Objective" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="calculation_Formula"   header={customHeader(headers.calculation_Formula.label,headers.calculation_Formula.description ,"calculation_Formula")}   filter filterPlaceholder="Search by Calculation Formula" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="numerator"  header={customHeader(headers.numerator.label,headers.numerator.description,"numerator")}  filter filterPlaceholder="Search by Numerator" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="numerator_Definitions"   header={customHeader(headers.numerator_Definitions.label,headers.numerator_Definitions.description ,"numerator_Definitions")}  filter filterPlaceholder="Search by Numerator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="denominator"  header={customHeader(headers.denominator.label,headers.denominator.description,"denominator")}  filter filterPlaceholder="Search by Denominator" style={{ minWidth: '12rem' }}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="denominator_Definitions" header={customHeader(headers.denominator_Definitions.label,headers.denominator_Definitions.description ,"denominator_Definitions")}   filter filterPlaceholder="Search by Denominator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="target_Population"  header={customHeader(headers.target_Population.label,headers.target_Population.description ,"target_Population")} filter filterPlaceholder="Search by Target Population" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="field_Topic" header={customHeader(headers.field_Topic.label,headers.field_Topic.description ,"field_Topic")} filter filterPlaceholder="Search by Field Topic" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="extraCol2" header={customHeader(headers.extraCol2.label,headers.extraCol2.description ,"extraCol2")} filter filterPlaceholder="Search by Extra Column 2" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="periodicity"  header={customHeader(headers.periodicity.label,headers.periodicity.description ,"periodicity")} filter filterPlaceholder="Search by Periodicity" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="data_Collection_Steps"  header={customHeader(headers.data_Collection_Steps.label ,headers.data_Collection_Steps.description,"data_Collection_Steps")} filter filterPlaceholder="Search by Data Collection Steps" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="legal_Requirements" header={customHeader(headers.legal_Requirements.label ,headers.legal_Requirements.description,"legal_Requirements")} filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="responsible_for_Monitoring" header={customHeader(headers.responsible_for_Monitoring.label,headers.responsible_for_Monitoring.description  ,"responsible_for_Monitoring")} filter filterPlaceholder="Search by Responsible for Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>

            <Column field="deadline_Reporting"  header={customHeader(headers.deadline_Reporting.label, headers.deadline_Reporting.description, "deadline_Reporting")} filter filterPlaceholder="Search by Deadline Reporting" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="supervisor_Body"     header={customHeader(headers.supervisor_Body.label, headers.supervisor_Body.description, "supervisor_Body")} filter filterPlaceholder="Search by Supervisor Body" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="management_Entity"   header={customHeader(headers.management_Entity.label, headers.management_Entity.description, "management_Entity")} filter filterPlaceholder="Search by Management Entity" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="applicable_period"   header={customHeader(headers.applicable_period.label, headers.applicable_period.description, "applicable_period")} filter filterPlaceholder="Search by Applicable Period" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="unit_of_Measurement" header={customHeader(headers.unit_of_Measurement.label, headers.unit_of_Measurement.description, "unit_of_Measurement")} filter filterPlaceholder="Search by Unit of Measurement" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="data_Source_Monitoring_Basis"     header={customHeader(headers.data_Source_Monitoring_Basis.label, headers.data_Source_Monitoring_Basis.description, "data_Source_Monitoring_Basis")} filter filterPlaceholder="Search by Data Source Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="it_System_Source"     header={customHeader(headers.it_System_Source.label, headers.it_System_Source.description, "it_System_Source")}  filter filterPlaceholder="Search by IT System Source" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="reference_Value_Target" header={customHeader(headers.reference_Value_Target.label, headers.reference_Value_Target.description, "reference_Value_Target")}  filter filterPlaceholder="Search by Reference Value Target" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="base_Value"    header={customHeader(headers.base_Value.label, headers.base_Value.description, "base_Value")} filter filterPlaceholder="Search by Base Value" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="notes"     header={customHeader(headers.notes.label, headers.notes.description, "notes")} filter filterPlaceholder="Search by Notes" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="sources_and_Further_Reading"     header={customHeader(headers.sources_and_Further_Reading.label, headers.sources_and_Further_Reading.description, "sources_and_Further_Reading")} filter filterPlaceholder="Search by Sources and Further Reading" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="selected_indicator"  header={customHeader(headers.selected_indicator.label, headers.selected_indicator.description, "selected_indicator")} filter filterElement={(option)=>(<FilterIndicators options={option} data={selected_indicator} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,selected_indicator_list,'selected_indicator')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  ></Column>  
            <Column field="adaptation_Needs"  header={customHeader(headers.adaptation_Needs.label, headers.adaptation_Needs.description, "adaptation_Needs")}  filter filterPlaceholder="Search by Adaptation Needs" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
           
           
            <Column field="name_of_selected_indicator_en" 
    header={customHeader(headers.name_of_selected_indicator_en.label, headers.name_of_selected_indicator_en.description, "name_of_selected_indicator_en")} 
    filter filterPlaceholder="Search by Name of Selected Indicator (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="frequency_of_measurement_en" 
    header={customHeader(headers.frequency_of_measurement_en.label, headers.frequency_of_measurement_en.description, "frequency_of_measurement_en")} 
    filter filterPlaceholder="Search by Frequency of Measurement (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="description_en" 
    header={customHeader(headers.description_en.label, headers.description_en.description, "description_en")} 
    filter filterPlaceholder="Search by Description (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="unit_of_measurement_en" 
    header={customHeader(headers.unit_of_measurement_en.label, headers.unit_of_measurement_en.description, "unit_of_measurement_en")} 
    filter filterPlaceholder="Search by Unit of Measurement (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="calculation_formula_en" 
    header={customHeader(headers.calculation_formula_en.label, headers.calculation_formula_en.description, "calculation_formula_en")} 
    filter filterPlaceholder="Search by Calculation Formula (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="numerator_en" 
    header={customHeader(headers.numerator_en.label, headers.numerator_en.description, "numerator_en")} 
    filter filterPlaceholder="Search by Numerator (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="denominator_en" 
    header={customHeader(headers.denominator_en.label, headers.denominator_en.description, "denominator_en")} 
    filter filterPlaceholder="Search by Denominator (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="comments_en" 
    header={customHeader(headers.comments_en.label, headers.comments_en.description, "comments_en")} 
    filter filterPlaceholder="Search by Comments (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="observation_en" 
    header={customHeader(headers.observation_en.label, headers.observation_en.description, "observation_en")} 
    filter filterPlaceholder="Search by Observation (EN)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="extrafield_empty" 
    header={customHeader(headers.extrafield_empty.label, headers.extrafield_empty.description, "extrafield_empty")} 
    filter filterPlaceholder="Search by ExtraField-EMPTY" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="name_of_selected_indicator_gr" 
    header={customHeader(headers.name_of_selected_indicator_gr.label, headers.name_of_selected_indicator_gr.description, "name_of_selected_indicator_gr")} 
    filter filterPlaceholder="Search by Name of Selected Indicator (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="frequency_of_measurement_gr" 
    header={customHeader(headers.frequency_of_measurement_gr.label, headers.frequency_of_measurement_gr.description, "frequency_of_measurement_gr")} 
    filter filterPlaceholder="Search by Frequency of Measurement (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="description_gr" 
    header={customHeader(headers.description_gr.label, headers.description_gr.description, "description_gr")} 
    filter filterPlaceholder="Search by Description (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="unit_of_measurement_gr" 
    header={customHeader(headers.unit_of_measurement_gr.label, headers.unit_of_measurement_gr.description, "unit_of_measurement_gr")} 
    filter filterPlaceholder="Search by Unit of Measurement (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="calculation_formula_gr" 
    header={customHeader(headers.calculation_formula_gr.label, headers.calculation_formula_gr.description, "calculation_formula_gr")} 
    filter filterPlaceholder="Search by Calculation Formula (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="numerator_gr" 
    header={customHeader(headers.numerator_gr.label, headers.numerator_gr.description, "numerator_gr")} 
    filter filterPlaceholder="Search by Numerator (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="denominator_gr" 
    header={customHeader(headers.denominator_gr.label, headers.denominator_gr.description, "denominator_gr")} 
    filter filterPlaceholder="Search by Denominator (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="comments_gr" 
    header={customHeader(headers.comments_gr.label, headers.comments_gr.description, "comments_gr")} 
    filter filterPlaceholder="Search by Comments (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="observation_gr" 
    header={customHeader(headers.observation_gr.label, headers.observation_gr.description, "observation_gr")} 
    filter filterPlaceholder="Search by Observation (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="extrafield_empty_gr" 
    header={customHeader(headers.extrafield_empty_gr.label, headers.extrafield_empty_gr.description, "extrafield_empty_gr")} 
    filter filterPlaceholder="Search by ExtraField-EMPTY (GR)" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="it_system_source_process" 
    header={customHeader(headers.it_system_source_process.label, headers.it_system_source_process.description, "it_system_source_process")} 
    filter filterPlaceholder="Search by IT System/Source/Process" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>

<Column field="aim_of_the_indicator" 
    header={customHeader(headers.aim_of_the_indicator.label, headers.aim_of_the_indicator.description, "aim_of_the_indicator")} 
    filter filterPlaceholder="Search by AIM of the INDICATOR" 
    style={{ minWidth: '12rem' }} 
    editor={(options) => cellEditor(options)} 
    onCellEditComplete={onCellEditComplete}></Column>


            <Column field="piloting" header={customHeader(headers.piloting.label, headers.piloting.description, "piloting")} filter filterField='piloting' filterElement={(option)=>(<FilterIndicators options={option} data={piloting} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,piloting_list,'piloting')} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="opinion_from_ODIPY_Other_experts" header={customHeader(headers.opinion_from_ODIPY_Other_experts.label, headers.opinion_from_ODIPY_Other_experts.description, "opinion_from_ODIPY_Other_experts")} filter filterPlaceholder="Search by Expert Opinion" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="pilot_outcome" header={customHeader(headers.pilot_outcome.label, headers.pilot_outcome.description, "pilot_outcome")} filter filterField='pilot_outcome' filterElement={(option)=>(<FilterIndicators options={option} data={pilot_outcome} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={generalBodyTemplate(indicators,pilot_outcome_list,"pilot_outcome")} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="pilot_success_criteria"     header={customHeader(headers.pilot_success_criteria.label, headers.pilot_success_criteria.description, "pilot_success_criteria")} filter filterPlaceholder="Search by Success Criteria" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
             */}
            <Column header="Ενέργειες" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen  headerStyle={{ color: 'rgba(18, 0, 147, 1)' }}/>

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