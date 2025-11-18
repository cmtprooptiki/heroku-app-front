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
import { health_system_functions } from './IndicatorUtils';



const FormAddIndicator = ({onHide, onSuccessEdit, onError}) => {
    const {saved, setSaved} = useContext(dialogContest)
    const [id, setId] = useState(null);
    const [q4all_Ind_number, setQ4All_Ind_Number] = useState("");
    const [q4all_Ind_suffix, setQ4All_Ind_Suffix] = useState("");
   


    

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
              name_of_selected_indicator_en: '',
              name_of_selected_indicator_gr: '',
              indicator_name: '',
              q4all_Ind_number: fullQ4AllIndNumber,
              dpo_org_source1: '',
            
              
            
              shortlist_indicators:'',
              health_system_functions: '',
             
              dimensions_of_Quality_QoCOfficeReport: '',
             
              data_collection: '',
             
              calculation_Formula: '',
              numerator: '',
              numerator_Definitions: '',
              denominator: '',
              denominator_Definitions: '',
             
              periodicity: '',
             
              unit_of_Measurement: '',
             
              
            
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
              <h1 className='title'>New Indicator</h1>
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