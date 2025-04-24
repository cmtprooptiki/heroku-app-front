import React,{useState, useEffect,useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { format } from 'date-fns';
import { dialogContest } from './IndicatorsList';
import { useContext } from 'react';
import { GiConsoleController } from 'react-icons/gi';



const FormAddIndicator = ({onHide, onSuccessEdit, onError}) => {
    const {saved, setSaved} = useContext(dialogContest)
    const [id, setId] = useState(null);
    const [indicator_name, setIndicator_Name] = useState(null);
    const [q4all_Ind_number, setQ4All_Ind_Number] = useState("");
    const [q4all_Ind_suffix, setQ4All_Ind_Suffix] = useState("");
    const [status, setStatus] = useState(null);
    const [indicator_cluster, setIndicator_Cluster] = useState(null);
    const [ind_Merge, setInd_Merge] = useState(null);
    const [catergory_of_Indicator, setCatergory_Of_Indicator] = useState(null);
    const [dimension, setDimension] = useState(null);
    const [type_of_healthcare, setType_Of_Healthcare] = useState(null);
    const [type_of_healthcare_providers_D1_D7, setType_Of_Healthcare_Providers_D1_D7] = useState(null);
    const [cross_Cutting_Dimensions_A_I, setCross_Cutting_Dimensions_A_I] = useState(null);
    const [cross_Cutting_Dimensions_Inputs_Process_Outputs, setCross_Cutting_Dimensions_Inputs_Process_Outputs] = useState(null);
    const [dimensions_of_Quality_QoCOfficeReport, setDimensions_Of_Quality_QoCOfficeReport] = useState(null);
    const [priority, setPriority] = useState(null);
    const [data_collection, setData_Collection] = useState(null);
    const [collecting_National_Organization, setCollecting_National_Organization] = useState(null);
    const [legal_Organizational_Requirements, setLegal_Organizational_Requirements] = useState(null);
    const [proponent_Organization_WG, setProponent_Organization_WG] = useState(null);
    const [rationale_Description, setRationale_Description] = useState(null);
    const [objective, setObjective] = useState(null);
    const [calculation_Formula, setCalculation_Formula] = useState(null);
    const [numerator, setNumerator] = useState(null);
    const [numerator_Definitions, setNumerator_Definitions] = useState(null);
    const [denominator, setDenominator] = useState(null);
    const [denominator_Definitions, setDenominator_Definitions] = useState(null);
    const [target_Population, setTarget_Population] = useState(null);
    const [field_Topic, setField_Topic] = useState(null);
    const [extraCol2, setExtraCol2] = useState(null);
    const [periodicity, setPeriodicity] = useState(null);
    const [data_Collection_Steps, setData_Collection_Steps] = useState(null);
    const [legal_Requirements, setLegal_Requirements] = useState(null);
    const [responsible_for_Monitoring, setResponsible_For_Monitoring] = useState(null);
    const [deadline_Reporting, setDeadline_Reporting] = useState(null);
    const [supervisor_Body, setSupervisor_Body] = useState(null);
    const [management_Entity, setManagement_Entity] = useState(null);
    const [applicable_period, setApplicable_Period] = useState(null);
    const [unit_of_Measurement, setUnit_Of_Measurement] = useState(null);
    const [data_Source_Monitoring_Basis, setData_Source_Monitoring_Basis] = useState(null);
    const [it_System_Source, setIt_System_Source] = useState(null);
    const [reference_Value_Target, setReference_Value_Target] = useState(null);
    const [base_Value, setBase_Value] = useState(null);
    const [notes, setNotes] = useState(null);
    const [sources_and_Further_Reading, setSources_And_Further_Reading] = useState(null);
    const [selected_indicator, setSelected_Indicator] = useState(null);
    const [adaptation_Needs, setAdaptation_Needs] = useState(null);
    const [piloting, setPiloting] = useState(null);
    const [opinion_from_ODIPY_Other_experts, setOpinion_From_ODIPY_Other_Experts] = useState(null);
    const [pilot_outcome, setPilot_Outcome] = useState(null);
    const [pilot_success_criteria, setPilot_Success_Criteria] = useState(null);



    

    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    // }, []);

    


 

   

    const saveIndicator = async (e) => {
        
        e.preventDefault();
        const fullQ4AllIndNumber = `Q4Alln.${q4all_Ind_suffix}`;
        try {
          console.log(q4all_Ind_number, "HAKKJDAKJDK")
          const response = await axios.get(`${apiBaseUrl}/indicators/check/${fullQ4AllIndNumber}`)
          console.log(response.data.exists)
          if(response.data.exists === false)
          {
            await axios.post(`${apiBaseUrl}/indicators`, {
              indicator_name: '',
              q4all_Ind_number: fullQ4AllIndNumber,
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
            
            onHide();
            setSaved(prev => !prev);
            console.log("Done: ", q4all_Ind_number)
            if (onSuccessEdit) {
              onSuccessEdit();  
            }
    
            // navigate(-1); // Redirect to a different page after saving
          }
          else
          {
            // console.log("There is a ", q4all_Ind_number, "already")
            if(onError)
            {
              onError();
            }
          }
            
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg); // Capture and display error messages
            }
        }
    };

    // const clearDate = (e) => {
    //     e.preventDefault();  // Prevent form submission
    //     setEstimate_Payment_Date_2(null); // Clear the calendar date
    // };

    // const clearDate2 = (e) => {
    //     e.preventDefault();  // Prevent form submission
    //     setEstimate_Payment_Date_3(null); // Clear the calendar date
    // }


    return (
            <div>
              <h1 className='title'>Add Indicator Form</h1>
              <form onSubmit={saveIndicator}>
                {/* <div className="grid"> */}
                  <div className="">
                    <div className="card p-fluid">
                      <div className=""><Divider><span className="p-tag text-lg">Indicator</span></Divider></div>
                      <div className="field">
  <label htmlFor="q4all_Ind_number">Q4ALL Indicator Number</label>
  <div className="p-inputgroup">
    <span className="p-inputgroup-addon">Q4Alln.</span>
    <InputText
      id="q4all_Ind_number"
      type="text"
      value={q4all_Ind_suffix}
      onChange={(e) => {
        // Optional: only allow numbers
        const val = e.target.value;
          setQ4All_Ind_Suffix(val);
      }}
    />
  </div>
</div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <Button type="submit" label="Save Indicator" className="p-button-success is-fullwidth" />
                      </div>
                    </div>
                  </div>
                {/* </div> */}
              </form>
            </div>
          
      
      )

}

export default FormAddIndicator