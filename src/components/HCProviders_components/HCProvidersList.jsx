import React,{useState,useEffect, useRef} from 'react'

import FilterMap from './FilterMap';
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
import { Tooltip } from "primereact/tooltip";
import TotalIndicators from '../../icons/Totalhcp.png'
import indicatortwo from '../../icons/hospitalicon.png'
import indicatorthree from '../../icons/health-center.png'
import indicatorfour from '../../icons/tomyicon.png'
import { Card } from 'primereact/card';
import { HcprovidersMap2 } from './IpposMap';
import { headers } from './headersHCProvidersConfig';  // Import the header configuration
import FilterHCProviders from './FilterHCProviders';
import { HcprovidersMap } from './HcprovidersMap';
import "./datatable2-custom.css"; // Your custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Swap Icon


const HCProvidersList = () => {
    const [hcproviders, setHcproviders] = useState([]);
    const [filters, setFilters] = useState(null);
    // const [filters, setFilters] = useState(initFiltersConfig);
    const [selectedHcpTypes, setSelectedHcpTypes] = useState([]); // Stores selected filters

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredHcproviders, setFilteredHcproviders] = useState([]);
    const [RowsAffected, setRowsAffected] = useState(hcproviders.length)
    const [category_of_Indicator, set_Category_Of_Indicator] = useState([])
    const [type_of_healthcare, setType_Of_HealthCare] = useState([])
    const [ype, setYpe] = useState([])
    const [type_Of_Hcp, setType_Of_Hcp] = useState([])
    const [selectedIndicator, setSelectedIndicator] = useState([]);
    console.log("first indicator,",selectedIndicator)

    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    

    const [filteredbyHospital,setfilteredbyHospital]=useState([]);
    const [filteredbyHCentre,setfilteredbyHCentre]=useState([]);
    const [filteredTomy,setfilteredTomy]=useState([]);

  
    const {user} = useSelector((state)=>state.auth)
    console.log(user)

    const[showMap,setShowMap]=useState(false);
    const[shownLabel,setShownLabel]=useState("Map View")

    useEffect(() => {
        if (selectedHcpTypes.length === 0) {
            setFilteredHcproviders(hcproviders); // Show all when no filter is applied
        } else {
            setFilteredHcproviders(
                hcproviders.filter(hcp => selectedHcpTypes.includes(hcp.type_Of_Hcp))
            );
        }
    }, [selectedHcpTypes, hcproviders]);
   

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
            getHcprovidersByUser()
        }else if(user!=null && user.role=="admin"){
            console.log("Is goin to GetIndicator")
            getHcproviders()
        }
       
        setLoading(false);
        setRowsAffected(hcproviders.length)
        initFilters();
    },[user]);
    
    //get data for specific userid
    const getHcprovidersByUser= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/HCProvidersByUser/${user.id}`, {timeout: 5000});
            const indData = response.data;

            const unique_ype = [...new Set(indData.map(item => item.ype || ''))]
            setYpe(unique_ype)

            const unique_type_of_hcp = [...new Set(indData.map(item => item.type_Of_Hcp || ''))]
            setType_Of_Hcp(unique_type_of_hcp)
            
          
            // Convert sign_date to Date object for each item in ergaData
            const parDataWithDates = indData.map(item => ({
                ...item,
            }));


            const filteredbyHospital = parDataWithDates.filter(item => item.type_Of_Hcp === "Hospital");
            const filteredbyHCentre = parDataWithDates.filter(item => item.type_Of_Hcp === "Health Centre");
            const filteredTomy = parDataWithDates.filter(item => item.type_Of_Hcp === "TOMY");
            setfilteredbyHospital(filteredbyHospital)
            setfilteredbyHCentre(filteredbyHCentre)
            setfilteredTomy(filteredTomy)
            setHcproviders(parDataWithDates);
            setFilteredHcproviders(parDataWithDates)
            setRowsAffected(parDataWithDates.length)
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    //get data for admin
    const getHcproviders= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/HCProviders`, {timeout: 5000});
            const indData = response.data;

            const unique_ype = [...new Set(indData.map(item => item.ype || ''))]
            setYpe(unique_ype)

            const unique_type_of_hcp = [...new Set(indData.map(item => item.type_Of_Hcp || ''))]
            setType_Of_Hcp(unique_type_of_hcp)

          
            const parDataWithDates = indData.map(item => ({
                ...item,
            }));

            const filteredbyHospital = parDataWithDates.filter(item => item.type_Of_Hcp === "Hospital");
            const filteredbyHCentre = parDataWithDates.filter(item => item.type_Of_Hcp === "Health Centre");
            const filteredTomy = parDataWithDates.filter(item => item.type_Of_Hcp === "TOMY");
            setfilteredbyHospital(filteredbyHospital)
            setfilteredbyHCentre(filteredbyHCentre)
            setfilteredTomy(filteredTomy)
            setHcproviders(parDataWithDates);
            setFilteredHcproviders(parDataWithDates)
            setRowsAffected(parDataWithDates.length)
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const deleteIndicator = async(IndicatorId)=>{
        await axios.delete(`${apiBaseUrl}/HCProviders/${IndicatorId}`);
        getHcproviders();
    }
    const deleteHcprovidersSelected = (ids) => {
        if (Array.isArray(ids)) {
            // Handle multiple deletions
            ids.forEach(async (id) => {
                console.log(`Deleting Dosi with ID: ${id}`);
                await axios.delete(`${apiBaseUrl}/HCProviders/${id}`);
            });
        } else {
            console.log(`Deleting Dosi with ID: ${ids}`);
        }
    
        // Optionally update your state after deletion to remove the deleted items from the UI
        setHcproviders((prevIndicator) => prevIndicator.filter((indicator) => !ids.includes(indicator.id)));
        setFilteredHcproviders((prevIndicator) => prevIndicator.filter((indicator) => !ids.includes(indicator.id)))
        setRowsAffected(hcproviders.length)
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
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },

            ype: { value: null, matchMode: FilterMatchMode.IN },
            Q4ALL_code: { value: null, matchMode: FilterMatchMode.IN },
            type_Of_Hcp: { value: null, matchMode: FilterMatchMode.IN },
            Name_GR: { value: null, matchMode: FilterMatchMode.IN },
            Name_EN: { value: null, matchMode: FilterMatchMode.IN },
            category_As_Per_HealthAtlas: { value: null, matchMode: FilterMatchMode.IN },
            category_As_Per_Sha_2011_Elstat: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            lat: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            lon: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            address: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            post_Code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            email_Contact: {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
            general_Email_Contact: {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
            website: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            Idika_Ehr: { value: null, matchMode: FilterMatchMode.IN },
            Odipy_Inidcator_Collection: {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
            Drg_Mature_Usage: {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
            HEALTH_Center_In_The_Network: {operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]}
        });
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
                <Button 
                    icon="pi pi-ellipsis-v" 
                    className="p-button-text"
                    aria-label="Actions"
                    onMouseEnter={handleMouseEnter} // Show overlay on hover
                    onMouseLeave={handleMouseLeave} // Start hide timeout on mouse leave
                />
    
                {/* OverlayPanel containing action buttons in a row */}
                <OverlayPanel 
                    ref={op} 
                    onClick={() => op.current.hide()} 
                    dismissable 
                    onMouseLeave={handleMouseLeave} // Hide on overlay mouse leave
                    onMouseEnter={() => {
                        if (hideTimeout) clearTimeout(hideTimeout);
                    }} 
                >
                    <div className="flex flex-row gap-2">
                        {/* Only show the Profile button for non-admin users */}
                        {user && user.role !== "admin" && (
                            <Link to={`/paradotea/profile/${id}`}>
                                <Button icon="pi pi-eye" severity="info" aria-label="User" />
                            </Link>
                        )}
                        
                        {/* Show all action buttons for admin users */}
                        {user && user.role === "admin" && (
                            <>
                                <Button 
                                className='action-button'
                                    icon="pi pi-eye"
                                    severity="info"
                                    aria-label="User"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Profile');
                                        setDialogVisible(true);
                                    }}
                                />
                                <Button
                                className='action-button'
                                    icon="pi pi-pen-to-square"
                                    severity="info"
                                    aria-label="Edit"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Edit');
                                        setDialogVisible(true);
                                    }}
                                />
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
                </OverlayPanel>
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
        
        const q4all_Ind_numberder = rowData.Q4ALL_code || 'N/A';      
    
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

            case 'ype': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("Status is newvalue:",newValue)
                    rowData[field] = newValue.value === '' ? ( newValue = '') : newValue; validEdit = true;
                    
                } 
                else {
                    event.preventDefault();
                }

                break;
    
            case 'type_Of_Hcp': // For dropdown, directly assign the selected value
                if (newValue) {
                    console.log("type of heal is newvalue:",newValue)
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
                const response = await axios.patch(`${apiBaseUrl}/HCProviders/${rowData.id}`, {
                    [field]: newValue,
                });
     
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
        else if (options.field === 'ype') return dropdownEditor(options, ype); // Dropdown editor for category
        else if (options.field === 'type_Of_Hcp') return dropdownEditor(options,type_Of_Hcp); //dropdown editor of category of indicator
        else return textEditor(options);
    };
    
    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
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
    const addEmptyRow = async () => {
        try {
            // Send a request to create a new empty row in the database
            const response = await axios.post(`${apiBaseUrl}/HCProviders`, {
                ype: 1,
                Q4ALL_code: '',
                type_Of_Hcp: '',
                Name_GR: '',
                Name_EN: '',
                category_As_Per_HealthAtlas: '',
                category_As_Per_Sha_2011_Elstat: '',
                lat: 1.0,
                lon: 1.0,
                address: '',
                post_Code: '',
                email_Contact: '',
                general_Email_Contact: '',
                website: '',
                Idika_Ehr: '',
                Odipy_Inidcator_Collection: '',
                Drg_Mature_Usage: '',
                HEALTH_Center_In_The_Network: ''
            });
    
            // Assuming the response contains the new row data, add it to the table
            const newRow = response.data; // Assuming the newly created row is returned from the backend
            console.log(newRow)
            setHcproviders((prevHcproviders) => [...prevHcproviders, newRow]); // Add to the current list of Hcproviders
            setFilteredHcproviders((prevHcproviders) => [...prevHcproviders, newRow])
            setRowsAffected(hcproviders.length)
            window.location.reload();
        } catch (error) {
            console.error('Error adding new row:', error);
        }
    };
    

    const calculateFilledPercentage = (rowData) => {
        const totalFields = Object.keys(rowData).length; // Total number of fields in the row
        const filledFields = Object.values(rowData).filter(value => value !== null && value !== '').length; // Count of filled fields
        return ((filledFields / totalFields) * 100).toFixed(2); // Calculate percentage
    };

    return(
        <>
        <Card className="kpi-section-card">
            <div className="kpi-section">
                {/* Total Customers */}
                <div className="kpi-item">
                    <div >
                        {/* <i className="pi pi-users"></i> */}
                        <img src={TotalIndicators} alt="Search" style={{ width: "70.3px", cursor: "pointer" }} />                   

                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label" style={{color:'#0F00AB'}}>Total HCProviders</span>
                        <h2 className="kpi-value" style={{color:'#0F00AB'}}>{hcproviders.length} </h2>
                       
                    </div>
                </div>
                {/* Separator Line */}
                <div className="kpi-separator"></div>
                {/* Members */}
                <div className="kpi-item">
                    <div >
                        {/* <i className="pi pi-user"></i> */}
                        <img src={indicatortwo} alt="Search" style={{ width: "70.3px", cursor: "pointer" }} />                   

                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Number of Hospitals</span>
                        <h2 className="kpi-value">{filteredbyHospital.length}</h2>
                     
                    </div>
                </div>
                {/* Separator Line */}
                <div className="kpi-separator"></div>
                {/* Active Now */}
                <div className="kpi-item">
                    <div  >
                        {/* <i className="pi pi-desktop"></i> */}
                        <img src={indicatorthree} alt="Search" style={{ width: "70.3px", cursor: "pointer" }} />
                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Number of Health Centres</span>
                        <h2 className="kpi-value">{filteredbyHCentre.length }</h2>

                    </div> 
                </div>

                <div className="kpi-separator"></div>

                <div className="kpi-item">
                    <div  >
                        {/* <i className="pi pi-desktop"></i> */}
                        <img src={indicatorfour} alt="Search" style={{ width: "70.3px", cursor: "pointer" }} />
                    </div>
                    <div className="kpi-details">
                        <span className="kpi-label">Number of TOMY</span>
                        <h2 className="kpi-value">{filteredTomy.length}</h2>

                    </div>
                </div>
            </div>
        </Card>
        
        <div className='datatable-container'>
            <div className='flex justify-content'>
                {/* <Button name="map" label={shownLabel}  onClick={() => {
                        setShowMap(!showMap); // Toggle showMap state
                        setShownLabel(!showMap ? "Table View" : "Map View"); // Change label accordingly
                    }}  /> */}
                    <Button
                    label={shownLabel}
                    icon={<FontAwesomeIcon icon={faArrowsRotate} className='mr-2' />}
                    className="p-button-text p-3 border-none rounded-xl shadow-md hover:bg-indigo-100 transition" style={{fontFamily:"Poppins",fontWeight:"600",
                        background:"rgb(15 0 150 / 9%)",
                        color: "rgb(15, 0, 171)",
                        fontSize: "19px",
                        marginBottom:"10px"
                        }}
                        iconPos="left" // Ensures icon stays on the left

                    onClick={() => {
                        setShowMap(!showMap);
                        setShownLabel(!showMap ? "Switch to Table View" : "Switch to Map View");
                    }}
                />
                    
                    
                {console.log("map",showMap)}
            </div>
            
        {/* <div >
            <HcprovidersMap data={hcproviders}></HcprovidersMap>
        </div> */}
        {showMap? <div><h3 className="text-blue-500 font-bold">Type of HCP Filter</h3><FilterMap options={{ value: selectedHcpTypes, filterCallback: setSelectedHcpTypes }} data={hcproviders.map(item => item.type_Of_Hcp)} itemTemplate={ItemTemplate}  /><HcprovidersMap2 data={filteredHcproviders}></HcprovidersMap2></div>:
        <div className="card" hidden={showMap}>
        <h1 className='title'>HCProviders Table</h1>

        <div className='d-flex align-items-center gap-4'>
        
        {user && user.role ==="admin" && (
        <Link to={"/hcproviders/add"} ><Button label="New HCProvider row" className='button is-primary mb-2 rounded' icon="pi pi-plus-circle"/></Link>
        )}

        {user && user.role === "admin" && (
                <Button
                    label="New Empty Row"
                    className="button is-primary mb-2 rounded"
                    icon="pi pi-plus-circle"
                    style = {{marginLeft: "50px"}}
                    onClick={addEmptyRow} // Trigger the addEmptyRow function
                />
            )}

     {selectedIndicator.length > 0 && (
      
            
            <Button
                className='button is-primary mb-2 rounded' 
                label="Delete Selected" 
                icon="pi pi-trash" 
                severity="danger"
                style = {{marginLeft: "50px"}} 
                onClick={() => deleteHcprovidersSelected(selectedIndicator.map(indicator => indicator.id))} // Pass an array of selected IDs
            />
      
            
        )} 
        
        
        
        </div>

        


<DataTable value={hcproviders}  editMode="cell" ref = {dt} onValueChange={(Updatedhcproviders) => {setFilteredHcproviders(Updatedhcproviders);  console.log(filteredHcproviders.length, "Toso mikos"); setRowsAffected(Updatedhcproviders.length)}} paginator stripedRows
 rows={25} scrollable scrollHeight="600px" loading={loading} dataKey="id" 
            filters={filters} 
            globalFilterFields={['id', 'ype',  'Q4ALL_code',
                 'type_Of_Hcp', 'Name_GR',      'Name_EN',   'category_As_Per_HealthAtlas',   'category_As_Per_Sha_2011_Elstat',     
                   'lat',  'lon',  'address', 
                    'post_Code',   'email_Contact', 
                      'general_Email_Contact',  'website',     'Idika_Ehr',  
                        'Odipy_Inidcator_Collection',    'Drg_Mature_Usage',  
                         'HEALTH_Center_In_The_Network']} 
            header={header} 
            emptyMessage="No hcproviders found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            style={{textAlign:'center'}}
            tableStyle={{ minWidth: '50rem' }}
            bodyStyle={{textAlign:"center"}}
            >
            <Column selectionMode="multiple" style={{textAlign:"center" }} frozen></Column>

            <Column className='font-bold' field="id" header="id" sortable  style={{ color: 'black' ,textAlign:'center'}} frozen ></Column>
           
            <Column field="ype" style={{textAlign:"center" }} header={customHeader(headers.ype.label, headers.ype.description, "ype")}  filter = {true} filterField='ype' showFilterMatchModes = {false} filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.ype)} itemTemplate={ItemTemplate} />)} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="Q4ALL_code" style={{textAlign:"center" }} header={customHeader(headers.Q4ALL_code.label, headers.Q4ALL_code.description, "Q4ALL_code")}  filter filterField='Q4ALL_code' showFilterMatchModes = {false}   filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.Q4ALL_code)} itemTemplate={ItemTemplate} />)} body={q4all_Ind_number_BodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="type_Of_Hcp" style={{textAlign:"center" }} header={customHeader(headers.type_Of_Hcp.label, headers.type_Of_Hcp.description, "type_Of_Hcp")} filter filterField='type_Of_Hcp' 
                        filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.type_Of_Hcp)} itemTemplate={ItemTemplate}  />)} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}  showFilterMatchModes={false}></Column>
            <Column field="Name_GR" style={{textAlign:"center" }} header={customHeader(headers.Name_GR.label, headers.Name_GR.description, "Name_GR")} filter filterField='Name_GR' filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.Name_GR)} itemTemplate={ItemTemplate} />)} showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="Name_EN" style={{textAlign:"center" }} header={customHeader(headers.Name_EN.label, headers.Name_EN.description, "Name_EN")}filter filterField='Name_EN' filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.Name_EN)} itemTemplate={ItemTemplate} />)} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} showFilterMatchModes={false}></Column>
            <Column field="category_As_Per_HealthAtlas"  style={{textAlign:"center" }} header={customHeader(headers.category_As_Per_HealthAtlas.label, headers.category_As_Per_HealthAtlas.description ,"category_As_Per_HealthAtlas")} filter filterField='category_As_Per_HealthAtlas' filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.category_As_Per_HealthAtlas)} itemTemplate={ItemTemplate}/>)} showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="category_As_Per_Sha_2011_Elstat" style={{textAlign:"center" }}  header={customHeader(headers.category_As_Per_Sha_2011_Elstat.label,headers.category_As_Per_Sha_2011_Elstat.description,"category_As_Per_Sha_2011_Elstat")} filter itemTemplate={ItemTemplate} showFilterMatchModes={false} filterField='category_As_Per_Sha_2011_Elstat' editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="lat" style={{textAlign:"center" }} header={customHeader(headers.lat.label,headers.lat.description,"lat")} filter filterField = 'lat'  itemTemplate={ItemTemplate} showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="lon" style={{textAlign:"center" }} header={customHeader(headers.lon.label,headers.lon.description  ,"lot")} filter  itemTemplate={ItemTemplate} showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="address" style={{textAlign:"center" }} header={customHeader(headers.address.label,headers.address.description,"address")} filter itemTemplate={ItemTemplate} filterField='address' filterPlaceholder='Search by Address' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="post_Code" style={{textAlign:"center" }}  header={customHeader(headers.post_Code.label,headers.post_Code.description,"post_Code")} filter itemTemplate={ItemTemplate} filterField='post_Code' filterPlaceholder='Search by Post Code' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="email_Contact" style={{textAlign:"center" }}  header={customHeader(headers.email_Contact.label,headers.email_Contact.description,"email_Contact")} filter itemTemplate={ItemTemplate} filterField='email_Contact' filterPlaceholder='Search by Email Contact' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="general_Email_Contact" style={{textAlign:"center" }} header={customHeader(headers.general_Email_Contact.label,headers.general_Email_Contact.description,"general_Email_Contact")} filter itemTemplate={ItemTemplate} filterField='general_Email_Contact' filterPlaceholder='General Email Contact' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="website" style={{textAlign:"center" }} header={customHeader(headers.website.label,headers.website.description,"website")} filter itemTemplate={ItemTemplate} filterField='website' filterPlaceholder='Search by Website' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="Idika_Ehr" style={{textAlign:"center" }} header={customHeader(headers.Idika_Ehr.label,headers.Idika_Ehr.description,"Idika_Ehr")} filter filterElement = {(option) => (<FilterHCProviders options={option} data={filteredHcproviders.map(item => item.Idika_Ehr)} itemTemplate={ItemTemplate} />)} filterField='Idika_Ehr' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="Odipy_Inidcator_Collection" style={{textAlign:"center" }} header={customHeader(headers.Odipy_Inidcator_Collection.label,headers.Odipy_Inidcator_Collection.description,"Odipy_Inidcator_Collection")} filter itemTemplate={ItemTemplate} filterField='Odipy_Inidcator_Collection' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="Drg_Mature_Usage" style={{textAlign:"center" }} header={customHeader(headers.Drg_Mature_Usage.label,headers.Drg_Mature_Usage.description,"Drg_Mature_Usage")} filter itemTemplate={ItemTemplate} filterField='Drg_Mature_Usage' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="HEALTH_Center_In_The_Network" style={{textAlign:"center" }}  header={customHeader(headers.HEALTH_Center_In_The_Network.label,headers.HEALTH_Center_In_The_Network.description,"HEALTH_Center_In_The_Network")} filter itemTemplate={ItemTemplate} filterField='HEALTH_Center_In_The_Network' showFilterMatchModes={false} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>

            <Column header="Ενέργειες" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen headerStyle={{ backgroundImage: 'linear-gradient(to right, #1400B9, #00B4D8)', color: '#ffffff' }}/>

 </DataTable>

    {/* Dialog for editing Paradotea */}
    
            <div>
                <h3 style={{fontFamily:'Poppins',fontSize:'14px',lineHeight:'21px',fontWeight:'500',color:'rgba(181, 183, 192, 1)'}}>{RowsAffected} rows were found based on search criteria</h3>
            </div>
        
       
    </div> }
    </div>
    </>
    )
}

export default HCProvidersList;