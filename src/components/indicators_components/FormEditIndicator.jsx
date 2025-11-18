import React,{useState,useEffect, createContext} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

import { Divider } from 'primereact/divider';
import "../../css/datatable.css"

import { format } from 'date-fns';
import { dialogContest } from './IndicatorsList';
import { useContext } from 'react';
import { 
    
    QoCOfficeReportlist, 
   
    health_system_functions as HSF,
    shortlist_indicators as SI,
 
} from './IndicatorUtils';  // Adjust the path as necessary
import { Dropdown} from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';
import SmartInput from './SmartInput';
import socket from '../../socket';
import { useSelector } from 'react-redux';


const FormEditIndicator = ({ id: propId, onHide, onSuccessEdit }) => {
    const [indicator_name, setIndicator_Name] = useState("");
    const [q4all_Ind_number, setQ4all_Ind_Number] = useState("");
    
    const [dpo_org_source1, setDpo_Org_Source1] = useState("");
   
   
    const [shortlist_indicators, setShortlist_Indicators] = useState("");
    const [health_system_functions, setHealth_system_functions] = useState("");

    const [dimensions_of_Quality_QoCOfficeReport, setDimensions_Of_Quality_QoCOfficeReport] = useState("");
   
    const [data_collection, setData_Collection] = useState("");
   
    const [calculation_Formula, setCalculation_Formula] = useState("");
    const [numerator, setNumerator] = useState("");
    const [numerator_Definitions, setNumerator_Definitions] = useState("");
    const [denominator, setDenominator] = useState("");
    const [denominator_Definitions, setDenominator_Definitions] = useState("");
  
    const [periodicity, setPeriodicity] = useState("");
   
    const [unit_of_Measurement, setUnit_Of_Measurement] = useState("");
    
    const [name_of_selected_indicator_en, setName_Of_Selected_Indicator_En] = useState("");
    const [name_of_selected_indicator_gr, setName_Of_Selected_Indicator_Gr] = useState("");
    
    const {saved, setSaved} = useContext(dialogContest)

    const [lastUpdatedData,setLastUpdatedData]=useState([])

    

    const {user} = useSelector((state)=>state.auth)
    
    const[msg,setMsg]=useState("");


    const navigate = useNavigate();

    // const{id} = useParams();
    const { id: paramId } = useParams();
    const id = propId !== undefined ? propId : paramId;

    

    useEffect(() => {
       
        getIndicatorById();

    }, [id]);

    const getIndicatorById = async()=>{
        try
        {
            const response = await axios.get(`${apiBaseUrl}/indicators/${id}`, { timeout: 5000 });
       
            setName_Of_Selected_Indicator_En(response.data.name_of_selected_indicator_en);
            setName_Of_Selected_Indicator_Gr(response.data.name_of_selected_indicator_gr);
            setIndicator_Name(response.data.indicator_name);
            setQ4all_Ind_Number(response.data.q4all_Ind_number);
         
        
            setDpo_Org_Source1(response.data.dpo_org_source1);
         
          
            setShortlist_Indicators(response.data.shortlist_indicators);
            setHealth_system_functions(response.data.health_system_functions);
           
            setDimensions_Of_Quality_QoCOfficeReport(response.data.dimensions_of_Quality_QoCOfficeReport);
         
            setData_Collection(response.data.data_collection);
           
            setCalculation_Formula(response.data.calculation_Formula);
            setNumerator(response.data.numerator);
            setNumerator_Definitions(response.data.numerator_Definitions);
            setDenominator(response.data.denominator);
            setDenominator_Definitions(response.data.denominator_Definitions);
            setPeriodicity(response.data.periodicity);
         
            setUnit_Of_Measurement(response.data.unit_of_Measurement);
    
           

            setLastUpdatedData(response);

        }
        catch (error)
        {
            if(error.response)
            {
                setMsg(error.response.data.msg);
            }
        }
    };

    const updateIndicator = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${apiBaseUrl}/indicators/${id}`, {
                name_of_selected_indicator_en: name_of_selected_indicator_en,
                name_of_selected_indicator_gr: name_of_selected_indicator_gr,
                indicator_name: indicator_name,
                q4all_Ind_number: q4all_Ind_number,
            
                dpo_org_source1: dpo_org_source1,
                
                shortlist_indicators: shortlist_indicators,

                health_system_functions: health_system_functions,
                
                dimensions_of_Quality_QoCOfficeReport: dimensions_of_Quality_QoCOfficeReport,
                data_collection: data_collection,
                
                calculation_Formula: calculation_Formula,
                numerator: numerator,
                numerator_Definitions: numerator_Definitions,
                denominator: denominator,
                denominator_Definitions: denominator_Definitions,
                periodicity: periodicity,
               
                unit_of_Measurement: unit_of_Measurement,
              
                
               
            });
                    onHide();
                    setSaved(prev => !prev);

                    const oldData =lastUpdatedData?.data || {};

                    const changes = {
                      name_of_selected_indicator_en: [
                        lastUpdatedData.data.name_of_selected_indicator_en,
                        name_of_selected_indicator_en,
                      ],
                      name_of_selected_indicator_gr: [
                        lastUpdatedData.data.name_of_selected_indicator_gr,
                        name_of_selected_indicator_gr,
                      ],
                     
                      indicator_name: [
                        lastUpdatedData.data.indicator_name,
                        indicator_name,
                      ],
                      q4all_Ind_number: [
                        lastUpdatedData.data.q4all_Ind_number,
                        q4all_Ind_number,
                      ],
                     
                      dpo_org_source1: [
                        lastUpdatedData.data.dpo_org_source1,
                        dpo_org_source1,
                      ],
                     
                      shortlist_indicators: [
                        lastUpdatedData.data.shortlist_indicators,
                        shortlist_indicators,
                      ],
                      health_system_functions: [
                        lastUpdatedData.data.health_system_functions,
                        health_system_functions,
                      ],
                     
                      dimensions_of_Quality_QoCOfficeReport: [
                        lastUpdatedData.data
                          .dimensions_of_Quality_QoCOfficeReport,
                        dimensions_of_Quality_QoCOfficeReport,
                      ],
                      data_collection: [
                        lastUpdatedData.data.data_collection,
                        data_collection,
                      ],
                     
                      calculation_Formula: [
                        lastUpdatedData.data.calculation_Formula,
                        calculation_Formula,
                      ],
                      numerator: [lastUpdatedData.data.numerator, numerator],
                      numerator_Definitions: [
                        lastUpdatedData.data.numerator_Definitions,
                        numerator_Definitions,
                      ],
                      denominator: [
                        lastUpdatedData.data.denominator,
                        denominator,
                      ],
                      denominator_Definitions: [
                        lastUpdatedData.data.denominator_Definitions,
                        denominator_Definitions,
                      ],
                     
                      periodicity: [
                        lastUpdatedData.data.periodicity,
                        periodicity,
                      ],
                      
                      
                      unit_of_Measurement: [
                        lastUpdatedData.data.unit_of_Measurement,
                        unit_of_Measurement,
                      ],
                     
                    
                      
                    };


                     // Emit socket event for each changed field
                    Object.entries(changes).forEach(([field, [oldVal, newVal]]) => {
                        if ((oldVal ?? '') !== (newVal ?? '')) {
                            socket.emit('user-activity', {
                                user: user.name || "Unknown User", // or from redux
                                profileImage: user.profileImage || "",
                                field,
                                indicatorId: q4all_Ind_number,
                                value: newVal
                            });
                        }
                    });

                    if (onSuccessEdit) {
                    //     socket.emit("user-activity", {
                    //       user: user.name, // or user.email/ID, depending on your structure
                    //       profileImage: user.profileImage,
                    //       action: `edited field:"${field}" for Indicator: indicator ${indicatorId}`,
                    //       field,
                    //       indicatorId,
                    //       value: newValue, // <== this is the key part
                    //     });

                      onSuccessEdit();  
                    }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    
    return(


        <div >
            {saved}
               <h1 className='title'>Edit Indicator</h1>
               <form onSubmit={updateIndicator}>
  <div className="grid">
    <div className="col-12 md:col-6">
      <div className="card p-fluid">
        <Divider><span className="p-tag text-lg">Indicator Details</span></Divider>

          <div className="field">
          <label htmlFor="name_of_selected_indicator_en">Indicator Name for DPO list (EN)</label>
          <SmartInput id="name_of_selected_indicator_en" value={name_of_selected_indicator_en} onChange={(e) => setName_Of_Selected_Indicator_En(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="name_of_selected_indicator_gr">Indicator Name for DPO list (GR)</label>
          <SmartInput id="name_of_selected_indicator_gr" value={name_of_selected_indicator_gr} onChange={(e) => setName_Of_Selected_Indicator_Gr(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="indicator_name">Indicator Descriptive Name (EN)</label>
          <SmartInput id="indicator_name" value={indicator_name} onChange={(e) => setIndicator_Name(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="q4all_Ind_number">Q4All Indicator Number</label>
          <InputText id="q4all_Ind_number" value={q4all_Ind_number} onChange={(e) => setQ4all_Ind_Number(e.target.value)}  readOnly disabled/>
        </div>


        <div className="field">
          <label htmlFor="shortlist_indicators">Type of Indicator M, A</label>
          <Dropdown 
            id="shortlist_indicators"
            value={shortlist_indicators}
            options={SI}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setShortlist_Indicators(normalizedValue === '' ? '' : normalizedValue);
            }}
            optionLabel="label"
            placeholder="Επιλέξτε κατάσταση"
            showClear
            optionValue='value'
            filter
            appendTo="self"
            className='custom_dropdown'
            />
        </div>

        {/*health here */}


        <div className="field">
          <label htmlFor="health_system_functions">HEALTH SYSTEM FUNCTIONS</label>
          <Dropdown 
            id="health_system_functions"
            value={health_system_functions}
            options={HSF}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setHealth_system_functions(normalizedValue === '' ? '' : normalizedValue);
            }}
            optionLabel="label"
            placeholder="Επιλέξτε κατάσταση"
            showClear
            optionValue='value'
            filter
            appendTo="self"
            className='custom_dropdown'
            />
        </div>


         <div className="field">
          <label htmlFor="dimensions_of_Quality_QoCOfficeReport">ACCESS AND QUALITY OF CARE</label>
          <Dropdown 
            id="dimensions_of_Quality_QoCOfficeReport"
            value={dimensions_of_Quality_QoCOfficeReport}
            options={QoCOfficeReportlist}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setDimensions_Of_Quality_QoCOfficeReport(normalizedValue === '' ? '' : normalizedValue);
            }}
            optionLabel="label"
            placeholder="Επιλέξτε"
            showClear
            optionValue='value'
            filter
            appendTo="self"
            className='custom_dropdown'
            />
        
        </div>

       

        <div className="field">
          <label htmlFor="dpo_org_source1">DPO Org Source1</label>
          <InputText id="dpo_org_source1" value={dpo_org_source1} onChange={(e) => setDpo_Org_Source1(e.target.value)} />
        </div>

       

        <div className="field">
          <label htmlFor="data_collection">Data Received</label>
          <InputText id="data_collection" value={data_collection} onChange={(e) => setData_Collection(e.target.value)} />

          
        </div>
      
       
       

        <div className="field">
          <label htmlFor="calculation_Formula">Calculation Formula</label>
          <SmartInput id="calculation_Formula" value={calculation_Formula} onChange={(e) => setCalculation_Formula(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="numerator">Numerator</label>
          <SmartInput id="numerator" value={numerator} onChange={(e) => setNumerator(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="numerator_Definitions">Numerator Definitions</label>
          <SmartInput id="numerator_Definitions" value={numerator_Definitions} onChange={(e) => setNumerator_Definitions(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="denominator">Denominator</label>
          <SmartInput id="denominator" value={denominator} onChange={(e) => setDenominator(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="denominator_Definitions">Denominator Definitions</label>
          <SmartInput id="denominator_Definitions" value={denominator_Definitions} onChange={(e) => setDenominator_Definitions(e.target.value)} />
        </div>

  

   

        <div className="field">
          <label htmlFor="unit_of_Measurement">Unit of Measurement</label>
          <InputText id="unit_of_Measurement" value={unit_of_Measurement} onChange={(e) => setUnit_Of_Measurement(e.target.value)} />
        </div>

       
           <div className="field">
          <label htmlFor="periodicity">Periodicity (frequency of measurement)</label>
          <InputText id="periodicity" value={periodicity} onChange={(e) => setPeriodicity(e.target.value)} />
        </div>


  


        <div className="field">
          <Button type="submit" style={{
                    display: "flex",
                    justifyContent: "center",
                        color: "white",
                        fontFamily: 'Poppins',
                        fontSize: "13px",
                        paddingLeft: "23px",
                        paddingRight: "23px",
                        lineHeight: "2rem",
                        background: "#0F00AB",
                        border: "1px solid #ffffff",
                        borderRadius: "6px",
                }}>Update</Button>
        </div>

      </div>
    </div>
  </div>
</form>

                                        
    </div>


    )
}

export default FormEditIndicator