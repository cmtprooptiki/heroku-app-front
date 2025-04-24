import React,{useState,useEffect, useRef} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux';
// import '../../buildinglist.css';
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

import { initFiltersConfig } from './filtersConfig';

// import "./datatable-custom.css"; // Your custom styles
import "../../css/datatable.css"
import TotalIndicators from '../../icons/Total indicators.svg'
import indicatortwo from '../../icons/Group 301.svg'
import indicatorthree from '../../icons/Group 302.svg'
import { Card } from "primereact/card";

import ColumnsConfig from './ColumnsConfig';

import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';
import FormEditIndicator from './FormEditIndicator';
import { Dialog } from 'primereact/dialog'; // Import Dialog

import FormAddIndicator from './FormAddIndicator';

import { createContext } from 'react';

export const dialogContest =createContext();



const IndicatorsListNew = () => {
    const [indicators, setIndicators] = useState([]);

    const [columnNames, setColumnNames] = useState(['id', 'percentage', "q4all_Ind_number","indicator_name"]);

    const [filters, setFilters] = useState(initFiltersConfig);

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredIndicators, setFilteredIndicators] = useState([]);
    const [RowsAffected, setRowsAffected] = useState(indicators.length)
    const [selectedColumns, setSelectedColumns] = useState([]); // User selected columns

    const [indicator_name, setIndicators_Name] = useState([])
    const [dpolist, setDpolist] = useState([])

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
    const [dialogAddVisible, setDialogAddVisible] = useState(false);
    
    const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const [selectedIndicator, setSelectedIndicator] = useState([]);

    const[saved,setSaved]=useState(true)

    const useDynamicApplyButtonStyling = () => {
        useEffect(() => {
          const observer = new MutationObserver(() => {
            const filterPanels = document.querySelectorAll('.p-column-filter-overlay');
      
            filterPanels.forEach(panel => {
              const applyBtn = panel.querySelector('.p-column-filter-buttonbar .p-button:last-child');
              const inputs = panel.querySelectorAll('input');
      
              let hasRealInput = false;
      
              inputs.forEach(input => {
                const isTextInput = input.type === 'text' || input.classList.contains('p-inputtext');
      
                // Check if input actually has a meaningful value
                if (isTextInput && input.value && input.value.trim().length > 0) {
                  hasRealInput = true;
                }
              });
      
              const multiselectTokens = panel.querySelectorAll('.p-multiselect-token');
              if (multiselectTokens.length > 0) {
                hasRealInput = true;
              }
      
              if (applyBtn) {
                if (hasRealInput) {
                  applyBtn.classList.add('apply-green');
                } else {
                  applyBtn.classList.remove('apply-green');
                }
              }
            });
          });
      
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
      
          return () => observer.disconnect();
        }, []);
      };


    

      const globalFilters = [
        "q4all_Ind_number",
        "indicator_name",
        "name_of_selected_indicator_en",
        "name_of_selected_indicator_gr",
        "shortlist_indicators",
        "indicator_cluster",
        "status",
        "catergory_of_Indicator",
        "forPilot",
        "publicationsoptions",
        "internal_observations",
        "observations_from_meetings",
        "decision_and_next_steps",
        "dpolist",
        "dpo_org_source1",
        "dpo_org_source2",
        "dpo_org_source3",
        "idika",
        "ketekny",
        "eoppy",
        "odipy",
        "moh",
        "dimension",
        "type_of_healthcare_providers_D1_D7",
        "cross_Cutting_Dimensions_A_I",
        "cross_Cutting_Dimensions_Inputs_Process_Outputs",
        "dimensions_of_Quality_QoCOfficeReport",
        "priority",
        "data_collection",
        "collecting_National_Organization",
        "proponent_Organization_WG",
        "rationale_Description",
        "objective",
        "calculation_Formula",
        "numerator",
        "numerator_Definitions",
        "data_fields_vk",
        "denominator",
        "denominator_Definitions",
        "unit_of_Measurement",
        "target_Population",
        "periodicity",
        "data_Collection_Steps",
        "legal_Requirements",
        "responsible_for_Monitoring",
        "deadline_Reporting",
        "supervisor_Body",
        "management_Entity",
        "applicable_period",
        "it_System_Source",
        "reference_Value_Target",
        "base_Value",
        "notes",
        "sources_and_Further_Reading",
        "early_demo_dash_Id",
        "early_demo_dash_ind_Id",
        "early_demo_dash_source",
        "observation_gr",
        "opinion_from_ODIPY_Other_experts",
        "pilot_outcome",
        "pilot_success_criteria"
      ];







    const columnOrder = [
        // "q4all_Ind_number",
        // "indicator_name",
        "name_of_selected_indicator_en",
        "name_of_selected_indicator_gr",
        "shortlist_indicators",
        "indicator_cluster",
        "status",
        "catergory_of_Indicator",
        "forPilot",
        "publicationsoptions",
        "internal_observations",
        "observations_from_meetings",
        "decision_and_next_steps",
        "dpolist",
        "dpo_org_source1",
        "dpo_org_source2",
        "dpo_org_source3",
        "idika",
        "ketekny",
        "eoppy",
        "odipy",
        "moh",
        "dimension",
        "type_of_healthcare_providers_D1_D7",
        "cross_Cutting_Dimensions_A_I",
        "cross_Cutting_Dimensions_Inputs_Process_Outputs",
        "dimensions_of_Quality_QoCOfficeReport",
        "priority",
        "data_collection",
        "collecting_National_Organization",
        "proponent_Organization_WG",
        "rationale_Description",
        "objective",
        "calculation_Formula",
        "numerator",
        "numerator_Definitions",
        "data_fields_vk",
        "denominator",
        "denominator_Definitions",
        "unit_of_Measurement",
        "target_Population",
        "periodicity",
        "data_Collection_Steps",
        "legal_Requirements",
        "responsible_for_Monitoring",
        "deadline_Reporting",
        "supervisor_Body",
        "management_Entity",
        "applicable_period",
        "it_System_Source",
        "reference_Value_Target",
        "base_Value",
        "notes",
        "sources_and_Further_Reading",
        "early_demo_dash_Id",
        "early_demo_dash_ind_Id",
        "early_demo_dash_source",
        "observation_gr",
        "opinion_from_ODIPY_Other_experts",
        "pilot_outcome",
        "pilot_success_criteria"
      ];


      const columnLabelMap = {
        name_of_selected_indicator_en: "Indicator Name for DPO list (EN)",
        name_of_selected_indicator_gr: "Indicator Name for DPO list (GR)",
        // indicator_name: "Indicator Descriptive Name (EN)",
        // q4all_Ind_number: "Q4All Ind number",
        shortlist_indicators: "Type of Indicator (M, A, P)",
        indicator_cluster: "Indicator Cluster",
        status: "Status",
        catergory_of_Indicator: "Source of proposal for the indicator",
        forPilot: "ForPilot",
        publicationsoptions: "Publications Options",
        internal_observations: "Internal Observations",
        observations_from_meetings: "Observations from Meetings",
        decision_and_next_steps: "Decisions and NextSteps",
        dpolist: "DPOList",
        dpo_org_source1: "DPO Org Source1",
        dpo_org_source2: "DPO Org Source2",
        dpo_org_source3: "DPO Org Source3",
        idika: "IDIKA",
        ketekny: "KETEKNY",
        eoppy: "EOPPY",
        odipy: "ODIPY",
        moh: "MoH",
        dimension: "Dimension",
        type_of_healthcare_providers_D1_D7: "Type of healthcare providers/domains (D1-D7)",
        cross_Cutting_Dimensions_A_I: "Cross Cutting Dimensions (A-I)",
        cross_Cutting_Dimensions_Inputs_Process_Outputs: "Cross Cutting Dimensions (Inputs-Process - Outputs)",
        dimensions_of_Quality_QoCOfficeReport: "6 dimensions of Quality (QoCOfficeReport)",
        priority: "Priority",
        data_collection: "Data collection process types",
        collecting_National_Organization: "Collecting National Organization",
        proponent_Organization_WG: "Proponent Organization/WG",
        rationale_Description: "Rationale (Description)",
        objective: "Objective",
        calculation_Formula: "Calculation Formula",
        numerator: "Numerator",
        numerator_Definitions: "Numerator Definitions",
        data_fields_vk: "Data Fields (VK)",
        denominator: "Denominator",
        denominator_Definitions: "Denominator Definitions",
        unit_of_Measurement: "Unit of Measurement",
        target_Population: "Target Population",
        periodicity: "Periodicity (frequency of measurement)",
        data_Collection_Steps: "Data Collection Steps",
        legal_Requirements: " Legal Requirements",
        responsible_for_Monitoring: "Responsible for Monitoring",
        deadline_Reporting: "Deadline Reporting",
        supervisor_Body: " Supervisor Body",
        management_Entity: "Management Entity",
        applicable_period: "Applicable period",
        it_System_Source: "IT system/data source ",
        reference_Value_Target: "Reference Value (Target)",
        base_Value: "Base Value",
        notes: "Notes",
        sources_and_Further_Reading: "Sources and Further Reading",
        early_demo_dash_Id: "EarlyDemo Dashboard ID",
        early_demo_dash_ind_Id: "EarlyDemo Dashbord Indicator ID",
        early_demo_dash_source: "EarlyDemo Dashboard SOURCE",
        observation_gr: "Observation for Visualization /Display",
        opinion_from_ODIPY_Other_experts: "Piloting Phase: Opinion from ODIPY/Other experts ",
        pilot_outcome: "PILOT OUTCOME",
        pilot_success_criteria: "Pilot success criteria ?"
      };  


      const orderedColumnNames = [...columnNames].sort(
        (a, b) => columnOrder.indexOf(a) - columnOrder.indexOf(b)
      );

    // const [visibleColumns, setVisibleColumns] = useState(columnOrder.slice(35, 60)); // Show 15 columns initially

    console.log("first indicator,",selectedIndicator)

    const [statusValue, setStatusValue] = useState([])
    const [filledRows,setfilledRows]=useState(0)
    const {user} = useSelector((state)=>state.auth)
    console.log(user)
    const dt = useRef(null);
    useEffect(()=>{

        if (user!=null && user.role=="user"){
            // getColumnNames()
            getIndicatorsByUser()
        }else if(user!=null && (user.role=="admin" ||user.role=="indicator")){
            getColumnNames()
            
            getIndicators()
        }
        
       
        setLoading(false);
        setRowsAffected(indicators.length)

        // initFilters();
    },[user,saved]);
    useEffect(() => {
        initFilters(); // run only once on mount
      }, []);

    const [defaultCall,setDefaultCall] =useState(["q4all_Ind_number","indicator_name"])

    useEffect(()=>{

        const combined = Array.from(new Set(["q4all_Ind_number", "indicator_name", ...selectedColumns]));
        setDefaultCall(combined);

    },[selectedColumns])


    const getColumnNames = async()=>{
        try {
            const response = await axios.get(`${apiBaseUrl}/getcolumns`, {timeout: 5000});



            const columns = response.data
            .map((item) => item.column_name)
            .filter((name) => name !== "user_Id")
            .filter((name) => name !== "createdAt")
            .filter((name) => name !== "updatedAt")
            .filter((name) => name !== "id")
            .filter((name) => name !== "q4all_Ind_number")
            .filter((name) => name !== "indicator_name")
            console.log("here is the database column nameS:",columns)

            setColumnNames(columns);
            
        } catch (error) {
            console.error('Error fetching data:', error);

        }

     } 

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

            const dpolist2 = [...new Set(indData.map(item => item.dpolist || null))]
            setDpolist(dpolist2)

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

    //  const getColumnNames = async()=>{
    //     try {
    //         const response = await axios.get(`${apiBaseUrl}/getcolumns`, {timeout: 5000});



    //         const columns = response.data
    //         .map((item) => item.column_name)
    //         .filter((name) => name !== "user_Id")
    //         .filter((name) => name !== "createdAt")
    //         .filter((name) => name !== "updatedAt")
    //         .filter((name) => name !== "id")
    //         console.log("here is the database column nameS:",columns)

    //         setColumnNames(columns);
            
    //     } catch (error) {
    //         console.error('Error fetching data:', error);

    //     }

    //  } 

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

            const dpolist2 = [...new Set(indData.map(item => item.dpolist || null))]
            setDpolist(dpolist2)

            const uniqueDimension = [...new Set(indData.map(item => item.dimension || ''))]
            setDimension(uniqueDimension)

            const unique_d1_d7 = [...new Set(indData.map(item => item.type_of_healthcare_providers_D1_D7 || ''))]
            setType_Of_Healthcare_D1_D7(unique_d1_d7)


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

            // setSelectedColumns(['q4all_Ind_number','indicator_name'])


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
   
        return (
            <div className="actions-container">
                    <div className="flex flex-row gap-2">
                        
                        {(user && user.role === "admin" || user.role === "indicator") && (
                            <>
                                 <Button
                                className='action-button'
                                    icon="pi pi-pencil"
                                    severity="info"
                                    aria-label="edit"
                                    onClick={() => {
                                        setSelectedIndicatorId(id);
                                        setSelectedType('Edit');
                                        setDialogVisible(true);
                                    }}
                                    // onClick={() => edit(id)}
                                />
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
            </div>
        );
    };


    const allColumns2 = ColumnsConfig(filteredIndicators, 
        indicators, statusValue, dpolist, 
        cross_Cutting_Dimensions_A_I, 
        Cross_Cutting_Dimensions_Inputs_Outputs, 
        filledRows,
        category_of_Indicator); 



        // Pass the data
    const confirmMultipleDelete = () => {
        confirmDialog({
            message: 'Are you sure you want to delete the selected records?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => {
                // Delete all selected items after confirmation
                deleteIndicatorsSelected(selectedIndicator.map(indicators => indicators.id));
                
                // Show success toast
                toast.current.show({
                    severity: 'success',
                    summary: 'Deleted Successfully',
                    detail: 'Selected items have been deleted.',
                    life: 3000,
                });
            },
            reject: () => {
                // Show cancellation toast
                toast.current.show({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'Deletion was cancelled.',
                    life: 3000,
                });
            },
        });
    };

    const addEmptyRow = async () => {
        try {
            
            // Send a request to create a new empty row in the database
            const response = await axios.post(`${apiBaseUrl}/indicators`, {
                indicator_name: '',
                q4all_Ind_number: '',
                status: '',
                indicator_cluster: '',
                internal_observations: '',
                dpolist: '',
                dpo_org_source1: '',
                dpo_org_source2: '',
                dpo_org_source3: '',
                idika: '',
                ketekny: '',
                eoppy: '',
                odipy: '',
                moh: '',
                
                catergory_of_Indicator: '',
                observations_from_meetings:'',
                shortlist_indicators:'',
                decision_and_next_steps:'',
                forPilot:'',
                publicationsoptions:'',
                data_fields_vk: '',
                dimension: '',
                type_of_healthcare_providers_D1_D7: '',
                cross_Cutting_Dimensions_A_I: '',
                cross_Cutting_Dimensions_Inputs_Process_Outputs: '',
                dimensions_of_Quality_QoCOfficeReport: '',
                priority: '',
                data_collection: '',
                collecting_National_Organization: '',
                proponent_Organization_WG: '',
                rationale_Description: '',
                objective: '',
                calculation_Formula: '',
                numerator: '',
                numerator_Definitions: '',
                denominator: '',
                denominator_Definitions: '',
                target_Population: '',
                periodicity: '',
                data_Collection_Steps: '',
                legal_Requirements: '',
                responsible_for_Monitoring: '',
                deadline_Reporting: '',
                supervisor_Body: '',
                management_Entity: '',
                applicable_period: '',
                unit_of_Measurement: '',
                it_System_Source: '',
                reference_Value_Target: '',
                base_Value: '',
                notes: '',
                sources_and_Further_Reading: '',
                name_of_selected_indicator_en: '',
                name_of_selected_indicator_gr: '',
                observation_gr: '',
                early_demo_dash_Id: '',
                early_demo_dash_ind_Id: '',
                early_demo_dash_source: '',
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



const percentageTemplate = (rowData) => {
    const percentage = calculateFilledPercentage(rowData);
    
    // Set color based on percentage
    let color = 'black'; // Default color
    if (percentage < 30) {
        color = 'red'; // Below 30% - Red
    } 
    else if (percentage >= 30 && percentage < 60) {
        color = '#ff7a00'; // Between 30% and 80% - Yellow
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


        
    useDynamicApplyButtonStyling();

    return(
        <div>
            <dialogContest.Provider value = {{saved, setSaved}}>
<div className="p-4">
      

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


        <MultiSelect
        value={selectedColumns}
        options={orderedColumnNames.map((col) => ({
            label: columnLabelMap[col] || col,
            value: col
        }))}
        onChange={(e) => setSelectedColumns(e.value)}
        placeholder="Select Columns"
        display="chip"
        className="w-full md:w-20rem"
        />



        {(user && user.role === "admin" || user.role === "indicator") && (
                <Button
                    label="New Empty Row"
                    className="p-button2 is-primary mb-2 rounded"
                    icon="pi pi-plus-circle"
                    style = {{marginLeft: "50px"}}
                    onClick={() => setDialogAddVisible(true)} // Trigger the addEmptyRow function
                />
            )}

     {selectedIndicator.length > 0 && (
      
            
            <Button
            className='p-button3 is-primary mb-2 rounded' 
            label="Delete Selected" 
                icon="pi pi-trash" 
                severity="danger"
                style = {{marginLeft: "50px"}} 
                onClick={confirmMultipleDelete} // Pass an array of selected IDs
            />
      
            
        )} 
        </div>

        {/* <ToggleButton checked={balanceFrozen} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Balance" offLabel="Balance" /> */}
        <Toast ref={toast} />
        <ConfirmDialog />

        <DataTable  
            value={indicators}    
             ref = {dt} 
            onValueChange={(Updatedindicators) => {setFilteredIndicators(Updatedindicators);  
                console.log(filteredIndicators.length, "Toso mikos"); setRowsAffected(Updatedindicators.length)}}
            paginator 
            stripedRows
            rows={25}
            showGridlines
             editMode="cell"
            // columnResizeMode='fit'
            // resizableColumns
            scrollable
            scrollHeight="700px"

            loading={loading} 
            dataKey="id" 
            filters={filters} 
            globalFilterFields={globalFilters}
            header={header} 
            emptyMessage="No Indicators found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            >

            <Column selectionMode="multiple"  frozen></Column>

        
              {defaultCall.map((col) => (
                              <Column key={col} {...allColumns2[col]}  />
                            ))}

            {/* {columnOrder.map((col) => (
                    <Column key={col} {...allColumns2[col]}   />
                ))} */}

            {/* {visibleColumns.map(col => (
            <Column key={col} {...allColumns2[col]} />
            ))} */}
            {/* {selectedColumns.map((col) => allColumns[col])} 2*/}

            {/*HERE IS THE CODE FOR PERCENTAGE COLLUM*/}
            {/* <Column
             className='font-bold'
                header="Filled Percentage"
                sortable
                body={percentageTemplate}
                field='percentage' 
                alignFrozen="right" 
                frozen
            ></Column> */}
            <Column header="Actions" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen />

 </DataTable>
 
    <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)} modal style={{ width: '50vw' }} maximizable breakpoints={{ '960px': '80vw', '480px': '100vw' }}>

        {selectedIndicatorId && (selectedType=='Edit') && (
        <FormEditIndicator id={selectedIndicatorId} onHide={() => setDialogVisible(false)} onSuccessEdit={() => {
            toast.current.show({ 
                severity: 'success', 
                summary: 'Success', 
                detail: 'You edited the table successfully', 
                life: 3000 
            });
            setDialogVisible(false);
        }} />
        )}
    </Dialog>

    <Dialog visible={dialogAddVisible} onHide={() => setDialogAddVisible(false)} modal style={{ width: '50vw' }} maximizable breakpoints={{ '960px': '80vw', '480px': '100vw' }}>

        
        <FormAddIndicator onHide={() => setDialogAddVisible(false)} onSuccessEdit={() => {
            toast.current.show({ 
                severity: 'success', 
                summary: 'Success', 
                detail: 'You inserted the data successfully', 
                life: 3000 
            });
            setDialogAddVisible(false);
        }}
        onError={() => {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'This Q4AllInd code already exists. Please try again.',
                life: 3000
            });
        }}/>
    </Dialog>


    {/* Dialog for editing Paradotea */}
    
            <div>
            <h3 style={{fontFamily:'Poppins',fontSize:'14px',lineHeight:'21px',fontWeight:'500',color:'rgba(181, 183, 192, 1)'}}>Showing {RowsAffected} rows were found based on search criteria</h3>
            </div>
        
     </div>
     {saved}

    </div>
    </dialogContest.Provider>
    </div>
    )
}

export default IndicatorsListNew;
