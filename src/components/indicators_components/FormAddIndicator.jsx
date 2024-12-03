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



const FormAddIndicator = () => {
    const [id, setId] = useState(null);
    const [indicator_name, setIndicator_Name] = useState(null);
    const [q4all_Ind_number, setQ4All_Ind_Number] = useState(null);
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

    useEffect(() => {
    }, []);

    


 

   

    const saveIndicator = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/indicators`, {
                id: id,
                indicator_name: indicator_name,
                q4all_Ind_number: q4all_Ind_number,
                status: status,
                indicator_cluster: indicator_cluster,
                ind_Merge: ind_Merge,
                catergory_of_Indicator: catergory_of_Indicator,
                dimension: dimension,
                type_of_healthcare: type_of_healthcare,
                type_of_healthcare_providers_D1_D7: type_of_healthcare_providers_D1_D7,
                cross_Cutting_Dimensions_A_I: cross_Cutting_Dimensions_A_I,
                cross_Cutting_Dimensions_Inputs_Process_Outputs: cross_Cutting_Dimensions_Inputs_Process_Outputs,
                dimensions_of_Quality_QoCOfficeReport: dimensions_of_Quality_QoCOfficeReport,
                priority: priority,
                data_collection: data_collection,
                collecting_National_Organization: collecting_National_Organization,
                legal_Organizational_Requirements: legal_Organizational_Requirements,
                proponent_Organization_WG: proponent_Organization_WG,
                rationale_Description: rationale_Description,
                objective: objective,
                calculation_Formula: calculation_Formula,
                numerator: numerator,
                numerator_Definitions: numerator_Definitions,
                denominator: denominator,
                denominator_Definitions: denominator_Definitions,
                target_Population: target_Population,
                field_Topic: field_Topic,
                extraCol2: extraCol2,
                periodicity: periodicity,
                data_Collection_Steps: data_Collection_Steps,
                legal_Requirements: legal_Requirements,
                responsible_for_Monitoring: responsible_for_Monitoring,
                deadline_Reporting: deadline_Reporting,
                supervisor_Body: supervisor_Body,
                management_Entity: management_Entity,
                applicable_period: applicable_period,
                unit_of_Measurement: unit_of_Measurement,
                data_Source_Monitoring_Basis: data_Source_Monitoring_Basis,
                it_System_Source: it_System_Source,
                reference_Value_Target: reference_Value_Target,
                base_Value: base_Value,
                notes: notes,
                sources_and_Further_Reading: sources_and_Further_Reading,
                selected_indicator: selected_indicator,
                adaptation_Needs: adaptation_Needs,
                piloting: piloting,
                opinion_from_ODIPY_Other_experts: opinion_from_ODIPY_Other_experts,
                pilot_outcome: pilot_outcome,
                pilot_success_criteria: pilot_success_criteria
            });
    
            navigate(-1); // Redirect to a different page after saving
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
                        <label htmlFor="indicator_name">Indicator Name</label>
                        <div className="control">
                          <InputText id="indicator_name" type="text" value={indicator_name} onChange={(e) => setIndicator_Name(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="q4all_Ind_number">Q4ALL Indicator Number</label>
                        <div className="control">
                          <InputText id="q4all_Ind_number" type="text" value={q4all_Ind_number} onChange={(e) => setQ4All_Ind_Number(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="status">Status</label>
                        <div className="control">
                          <InputText id="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="indicator_cluster">Indicator Cluster</label>
                        <div className="control">
                          <InputText id="indicator_cluster" type="text" value={indicator_cluster} onChange={(e) => setIndicator_Cluster(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="ind_Merge">Indicator Merge</label>
                        <div className="control">
                          <InputText id="ind_Merge" type="text" value={ind_Merge} onChange={(e) => setInd_Merge(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="catergory_of_Indicator">Category of Indicator</label>
                        <div className="control">
                          <InputText id="catergory_of_Indicator" type="text" value={catergory_of_Indicator} onChange={(e) => setCatergory_Of_Indicator(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="dimension">Dimension</label>
                        <div className="control">
                          <InputText id="dimension" type="text" value={dimension} onChange={(e) => setDimension(e.target.value)} />
                        </div>
                      </div>
                      {/* More fields go here, following the same pattern */}
                      <div className="field">
                        <label htmlFor="typeofhealthcare">Type of HealthCare</label>
                        <div className="control">
                          <InputText id="type_of-healthcare" type="text" value={type_of_healthcare} onChange={(e) => setType_Of_Healthcare(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="type_of_healthcare_providers_D1_D7">Type of Healthcare Providers</label>
                        <div className="control">
                          <InputText id="type_of_healthcare_providers_D1_D7" type="text" value={type_of_healthcare_providers_D1_D7} onChange={(e) => setType_Of_Healthcare_Providers_D1_D7(e.target.value)} />
                        </div>
                      </div>

                       <div className="field">
                        <label htmlFor="cross_Cutting_Dimensions_A_I">Cross Cutting Dimensions A-I</label>
                        <div className="control">
                          <InputText id="cross_Cutting_Dimensions_A_I" type="text" value={cross_Cutting_Dimensions_A_I} onChange={(e) => setCross_Cutting_Dimensions_A_I(e.target.value)} />
                        </div>
                      </div>


                      <div className="field">
                        <label htmlFor="cross_Cutting_Dimensions_Inputs_Process_Outputs">Cross Cutting Dimensions Inputs/Outputs</label>
                        <div className="control">
                          <InputText id="cross_Cutting_Dimensions_Inputs_Process_Outputs" type="text" value={cross_Cutting_Dimensions_Inputs_Process_Outputs} onChange={(e) => setCross_Cutting_Dimensions_Inputs_Process_Outputs(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="dimensions_of_Quality_QoCOfficeReport">Dimensions of Quality</label>
                        <div className="control">
                          <InputText id="dimensions_of_Quality_QoCOfficeReport" type="text" value={dimensions_of_Quality_QoCOfficeReport} onChange={(e) => setDimensions_Of_Quality_QoCOfficeReport(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="priority">Priority</label>
                        <div className="control">
                          <InputText id="priority" type="text" value={priority} onChange={(e) => setPriority(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="data_collection">Data Collection</label>
                        <div className="control">
                          <InputText id="data_collection" type="text" value={data_collection} onChange={(e) => setData_Collection(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="collecting_National_Organization">Collecting Organization</label>
                        <div className="control">
                          <InputText id="collecting_National_Organization" type="text" value={collecting_National_Organization} onChange={(e) => setCollecting_National_Organization(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="legal_Organizational_Requirements">Legal Requirements</label>
                        <div className="control">
                          <InputText id="legal_Organizational_Requirements" type="text" value={legal_Organizational_Requirements} onChange={(e) => setLegal_Organizational_Requirements(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="proponent_Organization_WG">Proponent Organization</label>
                        <div className="control">
                          <InputText id="proponent_Organization_WG" type="text" value={proponent_Organization_WG} onChange={(e) => setProponent_Organization_WG(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="rationale_Description">Rationale Description</label>
                        <div className="control">
                          <InputText id="rationale_Description" type="text" value={rationale_Description} onChange={(e) => setRationale_Description(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="objective">Objective</label>
                        <div className="control">
                          <InputText id="objective" type="text" value={objective} onChange={(e) => setObjective(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="calculation_Formula">Calculation Formula</label>
                        <div className="control">
                          <InputText id="calculation_Formula" type="text" value={calculation_Formula} onChange={(e) => setCalculation_Formula(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="numerator">Numerator</label>
                        <div className="control">
                          <InputText id="numerator" type="text" value={numerator} onChange={(e) => setNumerator(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="numerator_Definitions">Numerator Definitions</label>
                        <div className="control">
                          <InputText id="numerator_Definitions" type="text" value={numerator_Definitions} onChange={(e) => setNumerator_Definitions(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="denominator">Denominator</label>
                        <div className="control">
                          <InputText id="denominator" type="text" value={denominator} onChange={(e) => setDenominator(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="denominator_Definitions">Denominator Definitions</label>
                        <div className="control">
                          <InputText id="denominator_Definitions" type="text" value={denominator_Definitions} onChange={(e) => setDenominator_Definitions(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="target_Population">Target Population</label>
                        <div className="control">
                          <InputText id="target_Population" type="text" value={target_Population} onChange={(e) => setTarget_Population(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="field_Topic">Field Topic</label>
                        <div className="control">
                          <InputText id="field_Topic" type="text" value={field_Topic} onChange={(e) => setField_Topic(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="extraCol2">Extra Column 2</label>
                        <div className="control">
                          <InputText id="extraCol2" type="text" value={extraCol2} onChange={(e) => setExtraCol2(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="periodicity">Periodicity</label>
                        <div className="control">
                          <InputText id="periodicity" type="text" value={periodicity} onChange={(e) => setPeriodicity(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="data_Collection_Steps">Data Collection Steps</label>
                        <div className="control">
                          <InputText id="data_Collection_Steps" type="text" value={data_Collection_Steps} onChange={(e) => setData_Collection_Steps(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="legal_Requirements">Legal Requirements</label>
                        <div className="control">
                          <InputText id="legal_Requirements" type="text" value={legal_Requirements} onChange={(e) => setLegal_Requirements(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="responsible_for_Monitoring">Responsible for Monitoring</label>
                        <div className="control">
                          <InputText id="responsible_for_Monitoring" type="text" value={responsible_for_Monitoring} onChange={(e) => setResponsible_For_Monitoring(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="deadline_Reporting">Deadline Reporting</label>
                        <div className="control">
                          <InputText id="deadline_Reporting" type="text" value={deadline_Reporting} onChange={(e) => setDeadline_Reporting(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="supervisor_Body">Supervisor Body</label>
                        <div className="control">
                          <InputText id="supervisor_Body" type="text" value={supervisor_Body} onChange={(e) => setSupervisor_Body(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="management_Entity">Management Entity</label>
                        <div className="control">
                          <InputText id="management_Entity" type="text" value={management_Entity} onChange={(e) => setManagement_Entity(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="applicable_period">Applicable Period</label>
                        <div className="control">
                          <InputText id="applicable_period" type="text" value={applicable_period} onChange={(e) => setApplicable_Period(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="unit_of_Measurement">Unit of Measurement</label>
                        <div className="control">
                          <InputText id="unit_of_Measurement" type="text" value={unit_of_Measurement} onChange={(e) => setUnit_Of_Measurement(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="data_Source_Monitoring_Basis">Data Source Monitoring</label>
                        <div className="control">
                          <InputText id="data_Source_Monitoring_Basis" type="text" value={data_Source_Monitoring_Basis} onChange={(e) => setData_Source_Monitoring_Basis(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="it_System_Source">IT System Source</label>
                        <div className="control">
                          <InputText id="it_System_Source" type="text" value={it_System_Source} onChange={(e) => setIt_System_Source(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="reference_Value_Target">Reference Value Target</label>
                        <div className="control">
                          <InputText id="reference_Value_Target" type="text" value={reference_Value_Target} onChange={(e) => setReference_Value_Target(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="base_Value">Base Value</label>
                        <div className="control">
                          <InputText id="base_Value" type="text" value={base_Value} onChange={(e) => setBase_Value(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="notes">Notes</label>
                        <div className="control">
                          <InputText id="notes" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="sources_and_Further_Reading">Sources and Further Reading</label>
                        <div className="control">
                          <InputText id="sources_and_Further_Reading" type="text" value={sources_and_Further_Reading} onChange={(e) => setSources_And_Further_Reading(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="selected_indicator">Selected Indicator</label>
                        <div className="control">
                          <InputText id="selected_indicator" type="text" value={selected_indicator} onChange={(e) => setSelected_Indicator(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="adaptation_Needs">Adaptation Needs</label>
                        <div className="control">
                          <InputText id="adaptation_Needs" type="text" value={adaptation_Needs} onChange={(e) => setAdaptation_Needs(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="piloting">Piloting</label>
                        <div className="control">
                          <InputText id="piloting" type="text" value={piloting} onChange={(e) => setPiloting(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="opinion_from_ODIPY_Other_experts">Expert Opinion</label>
                        <div className="control">
                          <InputText id="opinion_from_ODIPY_Other_experts" type="text" value={opinion_from_ODIPY_Other_experts} onChange={(e) => setOpinion_From_ODIPY_Other_Experts(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="pilot_outcome">Pilot Outcome</label>
                        <div className="control">
                          <InputText id="pilot_outcome" type="text" value={pilot_outcome} onChange={(e) => setPilot_Outcome(e.target.value)} />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="pilot_success_criteria">Pilot Success Criteria</label>
                        <div className="control">
                          <InputText id="pilot_success_criteria" type="text" value={pilot_success_criteria} onChange={(e) => setPilot_Success_Criteria(e.target.value)} />
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