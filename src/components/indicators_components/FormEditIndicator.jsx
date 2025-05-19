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
    shortlist_indicators as SI,
    dpoList,
    idikaList,
    keteknyList,
    eoppyList,
    odipyList,
    mohList
} from './IndicatorUtils';  // Adjust the path as necessary
import { Dropdown} from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';
import SmartInput from './SmartInput';
import socket from '../../socket';
import { useSelector } from 'react-redux';


const FormEditIndicator = ({ id: propId, onHide, onSuccessEdit }) => {
    const [indicator_name, setIndicator_Name] = useState("");
    const [q4all_Ind_number, setQ4all_Ind_Number] = useState("");
    const [status, setStatus] = useState("");
    const [indicator_cluster, setIndicator_Cluster] = useState("");
    const [internal_observations, setInternal_Observations] = useState("");
    const [dpolist, setDpolist] = useState("");
    const [dpo_org_source1, setDpo_Org_Source1] = useState("");
    const [dpo_org_source2, setDpo_Org_Source2] = useState("");
    const [dpo_org_source3, setDpo_Org_Source3] = useState("");
    const [idika, setIdika] = useState("");
    const [ketekny, setKetekny] = useState("");
    const [eoppy, setEoppy] = useState("");
    const [odipy, setOdipy] = useState("");
    const [moh, setMoh] = useState("");
    const [catergory_of_Indicator, setCatergory_Of_Indicator] = useState("");
    const [observations_from_meetings, setObservations_From_Meetings] = useState("");
    const [shortlist_indicators, setShortlist_Indicators] = useState("");
    const [decision_and_next_steps, setDecision_And_Next_Steps] = useState("");
    const [forPilot, setForPilot] = useState("");
    const [publicationsoptions, setPublicationsoptions] = useState("");
    const [data_fields_vk, setData_Fields_Vk] = useState("");
    const [dimension, setDimension] = useState("");
    const [type_of_healthcare_providers_D1_D7, setType_Of_Healthcare_Providers_D1_D7] = useState("");
    const [cross_Cutting_Dimensions_A_I, setCross_Cutting_Dimensions_A_I] = useState([]);
    const [cross_Cutting_Dimensions_Inputs_Process_Outputs, setCross_Cutting_Dimensions_Inputs_Process_Outputs] = useState([]);
    const [dimensions_of_Quality_QoCOfficeReport, setDimensions_Of_Quality_QoCOfficeReport] = useState("");
    const [priority, setPriority] = useState("");
    const [data_collection, setData_Collection] = useState("");
    const [collecting_National_Organization, setCollecting_National_Organization] = useState("");
    const [proponent_Organization_WG, setProponent_Organization_WG] = useState("");
    const [rationale_Description, setRationale_Description] = useState("");
    const [objective, setObjective] = useState("");
    const [calculation_Formula, setCalculation_Formula] = useState("");
    const [numerator, setNumerator] = useState("");
    const [numerator_Definitions, setNumerator_Definitions] = useState("");
    const [denominator, setDenominator] = useState("");
    const [denominator_Definitions, setDenominator_Definitions] = useState("");
    const [target_Population, setTarget_Population] = useState("");
    const [periodicity, setPeriodicity] = useState("");
    const [data_Collection_Steps, setData_Collection_Steps] = useState("");
    const [legal_Requirements, setLegal_Requirements] = useState("");
    const [responsible_for_Monitoring, setResponsible_For_Monitoring] = useState("");
    const [deadline_Reporting, setDeadline_Reporting] = useState("");
    const [supervisor_Body, setSupervisor_Body] = useState("");
    const [management_Entity, setManagement_Entity] = useState("");
    const [applicable_period, setApplicable_Period] = useState("");
    const [unit_of_Measurement, setUnit_Of_Measurement] = useState("");
    const [it_System_Source, setIt_System_Source] = useState("");
    const [reference_Value_Target, setReference_Value_Target] = useState("");
    const [base_Value, setBase_Value] = useState("");
    const [notes, setNotes] = useState("");
    const [sources_and_Further_Reading, setSources_And_Further_Reading] = useState("");
    const [name_of_selected_indicator_en, setName_Of_Selected_Indicator_En] = useState("");
    const [name_of_selected_indicator_gr, setName_Of_Selected_Indicator_Gr] = useState("");
    const [observation_gr, setObservation_Gr] = useState("");
    const [early_demo_dash_Id, setEarly_Demo_Dash_Id] = useState("");
    const [early_demo_dash_ind_Id, setEarly_Demo_Dash_Ind_Id] = useState("");
    const [early_demo_dash_source, setEarly_Demo_Dash_Source] = useState("");
    const [opinion_from_ODIPY_Other_experts, setOpinion_From_ODIPY_Other_Experts] = useState("");
    const [pilot_outcome, setPilot_Outcome] = useState("");
    const [pilot_success_criteria, setPilot_Success_Criteria] = useState("");
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

            setIndicator_Name(response.data.indicator_name);
            setQ4all_Ind_Number(response.data.q4all_Ind_number);
            setStatus(response.data.status ?? '');
            setIndicator_Cluster(response.data.indicator_cluster);
            setInternal_Observations(response.data.internal_observations);
            setDpolist(response.data.dpolist);
            setDpo_Org_Source1(response.data.dpo_org_source1);
            setDpo_Org_Source2(response.data.dpo_org_source2);
            setDpo_Org_Source3(response.data.dpo_org_source3);
            setIdika(response.data.idika);
            setKetekny(response.data.ketekny);
            setEoppy(response.data.eoppy);
            setOdipy(response.data.odipy);
            setMoh(response.data.moh);
            setCatergory_Of_Indicator(response.data.catergory_of_Indicator);
            setObservations_From_Meetings(response.data.observations_from_meetings);
            setShortlist_Indicators(response.data.shortlist_indicators);
            setDecision_And_Next_Steps(response.data.decision_and_next_steps);
            setForPilot(response.data.forPilot);
            setPublicationsoptions(response.data.publicationsoptions);
            setData_Fields_Vk(response.data.data_fields_vk);
            setDimension(response.data.dimension);
            setType_Of_Healthcare_Providers_D1_D7(response.data.type_of_healthcare_providers_D1_D7);
            // setCross_Cutting_Dimensions_A_I(response.data.cross_Cutting_Dimensions_A_I);

            setCross_Cutting_Dimensions_A_I(
                response.data.cross_Cutting_Dimensions_A_I
                    ? response.data.cross_Cutting_Dimensions_A_I.split(',').map(v => v.trim())
                    : []
            );

            // setCross_Cutting_Dimensions_Inputs_Process_Outputs(response.data.cross_Cutting_Dimensions_Inputs_Process_Outputs);
            setCross_Cutting_Dimensions_Inputs_Process_Outputs(
                response.data.cross_Cutting_Dimensions_Inputs_Process_Outputs
                    ? response.data.cross_Cutting_Dimensions_Inputs_Process_Outputs.split(',').map(v => v.trim())
                    : []
            );
            setDimensions_Of_Quality_QoCOfficeReport(response.data.dimensions_of_Quality_QoCOfficeReport);
            setPriority(response.data.priority);
            setData_Collection(response.data.data_collection);
            setCollecting_National_Organization(response.data.collecting_National_Organization);
            setProponent_Organization_WG(response.data.proponent_Organization_WG);
            setRationale_Description(response.data.rationale_Description);
            setObjective(response.data.objective);
            setCalculation_Formula(response.data.calculation_Formula);
            setNumerator(response.data.numerator);
            setNumerator_Definitions(response.data.numerator_Definitions);
            setDenominator(response.data.denominator);
            setDenominator_Definitions(response.data.denominator_Definitions);
            setTarget_Population(response.data.target_Population);
            setPeriodicity(response.data.periodicity);
            setData_Collection_Steps(response.data.data_Collection_Steps);
            setLegal_Requirements(response.data.legal_Requirements);
            setResponsible_For_Monitoring(response.data.responsible_for_Monitoring);
            setDeadline_Reporting(response.data.deadline_Reporting);
            setSupervisor_Body(response.data.supervisor_Body);
            setManagement_Entity(response.data.management_Entity);
            setApplicable_Period(response.data.applicable_period);
            setUnit_Of_Measurement(response.data.unit_of_Measurement);
            setIt_System_Source(response.data.it_System_Source);
            setReference_Value_Target(response.data.reference_Value_Target);
            setBase_Value(response.data.base_Value);
            setNotes(response.data.notes);
            setSources_And_Further_Reading(response.data.sources_and_Further_Reading);
            setName_Of_Selected_Indicator_En(response.data.name_of_selected_indicator_en);
            setName_Of_Selected_Indicator_Gr(response.data.name_of_selected_indicator_gr);
            setObservation_Gr(response.data.observation_gr);
            setEarly_Demo_Dash_Id(response.data.early_demo_dash_Id);
            setEarly_Demo_Dash_Ind_Id(response.data.early_demo_dash_ind_Id);
            setEarly_Demo_Dash_Source(response.data.early_demo_dash_source);
            setOpinion_From_ODIPY_Other_Experts(response.data.opinion_from_ODIPY_Other_experts);
            setPilot_Outcome(response.data.pilot_outcome);
            setPilot_Success_Criteria(response.data.pilot_success_criteria);

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
                indicator_name: indicator_name,
                q4all_Ind_number: q4all_Ind_number,
                status: status,
                indicator_cluster: indicator_cluster,
                internal_observations: internal_observations,
                dpolist: dpolist,
                dpo_org_source1: dpo_org_source1,
                dpo_org_source2: dpo_org_source2,
                dpo_org_source3: dpo_org_source3,
                idika: idika,
                ketekny: ketekny,
                eoppy: eoppy,
                odipy: odipy,
                moh: moh,
                catergory_of_Indicator: catergory_of_Indicator,
                observations_from_meetings: observations_from_meetings,
                shortlist_indicators: shortlist_indicators,
                decision_and_next_steps: decision_and_next_steps,
                forPilot: forPilot,
                publicationsoptions: publicationsoptions,
                data_fields_vk: data_fields_vk,
                dimension: dimension,
                type_of_healthcare_providers_D1_D7: type_of_healthcare_providers_D1_D7,
                cross_Cutting_Dimensions_A_I: cross_Cutting_Dimensions_A_I.join(', '),
                cross_Cutting_Dimensions_Inputs_Process_Outputs: cross_Cutting_Dimensions_Inputs_Process_Outputs.join(', '),
                dimensions_of_Quality_QoCOfficeReport: dimensions_of_Quality_QoCOfficeReport,
                priority: priority,
                data_collection: data_collection,
                collecting_National_Organization: collecting_National_Organization,
                proponent_Organization_WG: proponent_Organization_WG,
                rationale_Description: rationale_Description,
                objective: objective,
                calculation_Formula: calculation_Formula,
                numerator: numerator,
                numerator_Definitions: numerator_Definitions,
                denominator: denominator,
                denominator_Definitions: denominator_Definitions,
                target_Population: target_Population,
                periodicity: periodicity,
                data_Collection_Steps: data_Collection_Steps,
                legal_Requirements: legal_Requirements,
                responsible_for_Monitoring: responsible_for_Monitoring,
                deadline_Reporting: deadline_Reporting,
                supervisor_Body: supervisor_Body,
                management_Entity: management_Entity,
                applicable_period: applicable_period,
                unit_of_Measurement: unit_of_Measurement,
                it_System_Source: it_System_Source,
                reference_Value_Target: reference_Value_Target,
                base_Value: base_Value,
                notes: notes,
                sources_and_Further_Reading: sources_and_Further_Reading,
                name_of_selected_indicator_en: name_of_selected_indicator_en,
                name_of_selected_indicator_gr: name_of_selected_indicator_gr,
                observation_gr: observation_gr,
                early_demo_dash_Id: early_demo_dash_Id,
                early_demo_dash_ind_Id: early_demo_dash_ind_Id,
                early_demo_dash_source: early_demo_dash_source,
                opinion_from_ODIPY_Other_experts: opinion_from_ODIPY_Other_experts,
                pilot_outcome: pilot_outcome,
                pilot_success_criteria: pilot_success_criteria
            });
                    onHide();
                    setSaved(prev => !prev);

                    const oldData =lastUpdatedData?.data || {};

                    const changes = {
                      indicator_name: [
                        lastUpdatedData.data.indicator_name,
                        indicator_name,
                      ],
                      q4all_Ind_number: [
                        lastUpdatedData.data.q4all_Ind_number,
                        q4all_Ind_number,
                      ],
                      status: [lastUpdatedData.data.status, status],
                      indicator_cluster: [
                        lastUpdatedData.data.indicator_cluster,
                        indicator_cluster,
                      ],
                      internal_observations: [
                        lastUpdatedData.data.internal_observations,
                        internal_observations,
                      ],
                      dpolist: [lastUpdatedData.data.dpolist, dpolist],
                      dpo_org_source1: [
                        lastUpdatedData.data.dpo_org_source1,
                        dpo_org_source1,
                      ],
                      dpo_org_source2: [
                        lastUpdatedData.data.dpo_org_source2,
                        dpo_org_source2,
                      ],
                      dpo_org_source3: [
                        lastUpdatedData.data.dpo_org_source3,
                        dpo_org_source3,
                      ],
                      idika: [lastUpdatedData.data.idika, idika],
                      ketekny: [lastUpdatedData.data.ketekny, ketekny],
                      eoppy: [lastUpdatedData.data.eoppy, eoppy],
                      odipy: [lastUpdatedData.data.odipy, odipy],
                      moh: [lastUpdatedData.data.moh, moh],
                      catergory_of_Indicator: [
                        lastUpdatedData.data.catergory_of_Indicator,
                        catergory_of_Indicator,
                      ],
                      observations_from_meetings: [
                        lastUpdatedData.data.observations_from_meetings,
                        observations_from_meetings,
                      ],
                      shortlist_indicators: [
                        lastUpdatedData.data.shortlist_indicators,
                        shortlist_indicators,
                      ],
                      decision_and_next_steps: [
                        lastUpdatedData.data.decision_and_next_steps,
                        decision_and_next_steps,
                      ],
                      forPilot: [lastUpdatedData.data.forPilot, forPilot],
                      publicationsoptions: [
                        lastUpdatedData.data.publicationsoptions,
                        publicationsoptions,
                      ],
                      data_fields_vk: [
                        lastUpdatedData.data.data_fields_vk,
                        data_fields_vk,
                      ],
                      dimension: [lastUpdatedData.data.dimension, dimension],
                      type_of_healthcare_providers_D1_D7: [
                        lastUpdatedData.data.type_of_healthcare_providers_D1_D7,
                        type_of_healthcare_providers_D1_D7,
                      ],
                      cross_Cutting_Dimensions_A_I: [
                        (
                          lastUpdatedData.data.cross_Cutting_Dimensions_A_I ||
                          ""
                        )
                          .split(",")
                          .map((v) => v.trim())
                          .join(", "),
                        cross_Cutting_Dimensions_A_I.join(", "),
                      ],
                      cross_Cutting_Dimensions_Inputs_Process_Outputs: [
                        (
                          lastUpdatedData.data
                            .cross_Cutting_Dimensions_Inputs_Process_Outputs ||
                          ""
                        )
                          .split(",")
                          .map((v) => v.trim())
                          .join(", "),
                        cross_Cutting_Dimensions_Inputs_Process_Outputs.join(
                          ", "
                        ),
                      ],
                      dimensions_of_Quality_QoCOfficeReport: [
                        lastUpdatedData.data
                          .dimensions_of_Quality_QoCOfficeReport,
                        dimensions_of_Quality_QoCOfficeReport,
                      ],
                      priority: [lastUpdatedData.data.priority, priority],
                      data_collection: [
                        lastUpdatedData.data.data_collection,
                        data_collection,
                      ],
                      collecting_National_Organization: [
                        lastUpdatedData.data.collecting_National_Organization,
                        collecting_National_Organization,
                      ],
                      proponent_Organization_WG: [
                        lastUpdatedData.data.proponent_Organization_WG,
                        proponent_Organization_WG,
                      ],
                      rationale_Description: [
                        lastUpdatedData.data.rationale_Description,
                        rationale_Description,
                      ],
                      objective: [lastUpdatedData.data.objective, objective],
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
                      target_Population: [
                        lastUpdatedData.data.target_Population,
                        target_Population,
                      ],
                      periodicity: [
                        lastUpdatedData.data.periodicity,
                        periodicity,
                      ],
                      data_Collection_Steps: [
                        lastUpdatedData.data.data_Collection_Steps,
                        data_Collection_Steps,
                      ],
                      legal_Requirements: [
                        lastUpdatedData.data.legal_Requirements,
                        legal_Requirements,
                      ],
                      responsible_for_Monitoring: [
                        lastUpdatedData.data.responsible_for_Monitoring,
                        responsible_for_Monitoring,
                      ],
                      deadline_Reporting: [
                        lastUpdatedData.data.deadline_Reporting,
                        deadline_Reporting,
                      ],
                      supervisor_Body: [
                        lastUpdatedData.data.supervisor_Body,
                        supervisor_Body,
                      ],
                      management_Entity: [
                        lastUpdatedData.data.management_Entity,
                        management_Entity,
                      ],
                      applicable_period: [
                        lastUpdatedData.data.applicable_period,
                        applicable_period,
                      ],
                      unit_of_Measurement: [
                        lastUpdatedData.data.unit_of_Measurement,
                        unit_of_Measurement,
                      ],
                      it_System_Source: [
                        lastUpdatedData.data.it_System_Source,
                        it_System_Source,
                      ],
                      reference_Value_Target: [
                        lastUpdatedData.data.reference_Value_Target,
                        reference_Value_Target,
                      ],
                      base_Value: [lastUpdatedData.data.base_Value, base_Value],
                      notes: [lastUpdatedData.data.notes, notes],
                      sources_and_Further_Reading: [
                        lastUpdatedData.data.sources_and_Further_Reading,
                        sources_and_Further_Reading,
                      ],
                      name_of_selected_indicator_en: [
                        lastUpdatedData.data.name_of_selected_indicator_en,
                        name_of_selected_indicator_en,
                      ],
                      name_of_selected_indicator_gr: [
                        lastUpdatedData.data.name_of_selected_indicator_gr,
                        name_of_selected_indicator_gr,
                      ],
                      observation_gr: [
                        lastUpdatedData.data.observation_gr,
                        observation_gr,
                      ],
                      early_demo_dash_Id: [
                        lastUpdatedData.data.early_demo_dash_Id,
                        early_demo_dash_Id,
                      ],
                      early_demo_dash_ind_Id: [
                        lastUpdatedData.data.early_demo_dash_ind_Id,
                        early_demo_dash_ind_Id,
                      ],
                      early_demo_dash_source: [
                        lastUpdatedData.data.early_demo_dash_source,
                        early_demo_dash_source,
                      ],
                      opinion_from_ODIPY_Other_experts: [
                        lastUpdatedData.data.opinion_from_ODIPY_Other_experts,
                        opinion_from_ODIPY_Other_experts,
                      ],
                      pilot_outcome: [
                        lastUpdatedData.data.pilot_outcome,
                        pilot_outcome,
                      ],
                      pilot_success_criteria: [
                        lastUpdatedData.data.pilot_success_criteria,
                        pilot_success_criteria,
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
          <label htmlFor="indicator_name">Indicator Descriptive Name (EN)</label>
          <SmartInput id="indicator_name" value={indicator_name} onChange={(e) => setIndicator_Name(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="q4all_Ind_number">Q4All Indicator Number</label>
          <InputText id="q4all_Ind_number" value={q4all_Ind_number} onChange={(e) => setQ4all_Ind_Number(e.target.value)}  readOnly disabled/>
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <Dropdown 
            id="status"
            value={status?status:""}
            options={statuses}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setStatus(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="indicator_cluster">Indicator Cluster</label>
          <InputText id="indicator_cluster" value={indicator_cluster} onChange={(e) => setIndicator_Cluster(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="internal_observations">Internal Observations</label>
          <SmartInput id="internal_observations" value={internal_observations} onChange={(e) => setInternal_Observations(e.target.value)} rows={3} />
        </div>

        <div className="field">
          <label htmlFor="dpolist">DPO list</label>
          <Dropdown 
            id="dpolist"
            value={dpolist}
            options={dpoList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;
                setDpolist(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="dpo_org_source2">DPO Org Source2</label>
          <InputText id="dpo_org_source2" value={dpo_org_source2} onChange={(e) => setDpo_Org_Source2(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="dpo_org_source3">DPO Org Source3</label>
          <InputText id="dpo_org_source3" value={dpo_org_source3} onChange={(e) => setDpo_Org_Source3(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="idika">IDIKA</label>
          <Dropdown 
            id="idika"
            value={idika}
            options={idikaList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setIdika(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="ketekny">KETEKNY</label>
          <Dropdown 
            id="ketekny"
            value={ketekny}
            options={keteknyList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setKetekny(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="eoppy">EOPPY</label>
          <Dropdown 
            id="eoppy"
            value={eoppy}
            options={eoppyList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setEoppy(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="odipy">ODIPY</label>
          <Dropdown 
            id="odipy"
            value={odipy}
            options={odipyList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setOdipy(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="moh">MOH</label>
          <Dropdown 
            id="odipy"
            value={moh}
            options={mohList}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setMoh(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="catergory_of_Indicator">Source of proposal for the indicator</label>
          <InputText id="catergory_of_Indicator" value={catergory_of_Indicator} onChange={(e) => setCatergory_Of_Indicator(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="observations_from_meetings">Observations from Meetings</label>
          <SmartInput id="observations_from_meetings" value={observations_from_meetings} onChange={(e) => setObservations_From_Meetings(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="shortlist_indicators">Type of Indicator M, A, P</label>
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

        <div className="field">
          <label htmlFor="decision_and_next_steps">Decision and Next Steps</label>
          <SmartInput id="decision_and_next_steps" value={decision_and_next_steps} onChange={(e) => setDecision_And_Next_Steps(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="forPilot">For Pilot</label>
          <Dropdown 
            id="forPilot"
            value={forPilot}
            options={forPilotlist}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setForPilot(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="publicationsoptions">Publications Options</label>
          <InputText id="publicationsoptions" value={publicationsoptions} onChange={(e) => setPublicationsoptions(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="data_fields_vk">Data Fields VK</label>
          <SmartInput id="data_fields_vk" value={data_fields_vk} onChange={(e) => setData_Fields_Vk(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="dimension">Dimension</label>
          <InputText id="dimension" value={dimension} onChange={(e) => setDimension(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="type_of_healthcare_providers_D1_D7">Type of healthcare providers D1-D7</label>
          <Dropdown 
            id="shortlist_indicators"
            value={type_of_healthcare_providers_D1_D7}
            options={type_of_healthcare_providers_D1_D7list}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setType_Of_Healthcare_Providers_D1_D7(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="cross_Cutting_Dimensions_A_I">Cross Cutting Dimensions A-I </label>
           <MultiSelect
            id="cross_Cutting_Dimensions_A_I"
            value={cross_Cutting_Dimensions_A_I}
            options={classification_dimension}
            onChange={(e) => setCross_Cutting_Dimensions_A_I(e.value)}
            optionLabel="label"
            optionValue="value"
            placeholder="Επιλέξτε"
            display="chip"
            filter
            showClear
            className='multiselect-textarea-style'
        />
            
        </div>

        <div className="field">
          <label htmlFor="cross_Cutting_Dimensions_Inputs_Process_Outputs">Cross Cutting Dimensions (Inputs-Process - Outputs)</label>
          <MultiSelect
            id="cross_Cutting_Dimensions_Inputs_Process_Outputs"
            value={cross_Cutting_Dimensions_Inputs_Process_Outputs}
            options={cross_Cutting_Dimensions_Inputs_Process_Outputlist}
            onChange={(e) => setCross_Cutting_Dimensions_Inputs_Process_Outputs(e.value)}
            optionLabel="label"
            optionValue="value"
            placeholder="Επιλέξτε"
            display="chip"
            filter
            showClear
            className='multiselect-textarea-style'
        />
            
        </div>

        <div className="field">
          <label htmlFor="dimensions_of_Quality_QoCOfficeReport">6 dimensions of Quality (QoCOfficeReport)</label>
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
          <label htmlFor="priority">Priority</label>
          <Dropdown 
            id="priority"
            value={priority}
            options={prioritylist}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setPriority(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="data_collection">Data collection process types</label>
          <Dropdown 
            id="data_collection"
            value={data_collection}
            options={data_collection_list}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setData_Collection(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="collecting_National_Organization">Collecting National Organization</label>
          <InputText id="collecting_National_Organization" value={collecting_National_Organization} onChange={(e) => setCollecting_National_Organization(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="proponent_Organization_WG">Proponent Organization/WG</label>
          <InputText id="proponent_Organization_WG" value={proponent_Organization_WG} onChange={(e) => setProponent_Organization_WG(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="rationale_Description">Rationale Descriptio</label>
          <InputText id="rationale_Description" value={rationale_Description} onChange={(e) => setRationale_Description(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="objective">Objective</label>
          <InputText id="objective" value={objective} onChange={(e) => setObjective(e.target.value)} />
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
          <label htmlFor="target_Population">Target Population</label>
          <SmartInput id="target_Population" value={target_Population} onChange={(e) => setTarget_Population(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="periodicity">Periodicity (frequency of measurement)</label>
          <InputText id="periodicity" value={periodicity} onChange={(e) => setPeriodicity(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="data_Collection_Steps">Data Collection Steps</label>
          <SmartInput id="data_Collection_Steps" value={data_Collection_Steps} onChange={(e) => setData_Collection_Steps(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="legal_Requirements">Legal Requirements</label>
          <SmartInput id="legal_Requirements" value={legal_Requirements} onChange={(e) => setLegal_Requirements(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="responsible_for_Monitoring">Responsible for Monitoring</label>
          <InputText id="responsible_for_Monitoring" value={responsible_for_Monitoring} onChange={(e) => setResponsible_For_Monitoring(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="deadline_Reporting">Deadline Reporting</label>
          <InputText id="deadline_Reporting" value={deadline_Reporting} onChange={(e) => setDeadline_Reporting(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="supervisor_Body">Supervisor Body</label>
          <InputText id="supervisor_Body" value={supervisor_Body} onChange={(e) => setSupervisor_Body(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="management_Entity">Management Entity</label>
          <InputText id="management_Entity" value={management_Entity} onChange={(e) => setManagement_Entity(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="applicable_period">Applicable period</label>
          <InputText id="applicable_period" value={applicable_period} onChange={(e) => setApplicable_Period(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="unit_of_Measurement">Unit of Measurement</label>
          <InputText id="unit_of_Measurement" value={unit_of_Measurement} onChange={(e) => setUnit_Of_Measurement(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="it_System_Source">IT system/data source</label>
          <InputText id="it_System_Source" value={it_System_Source} onChange={(e) => setIt_System_Source(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="reference_Value_Target">Reference Value Target</label>
          <InputText id="reference_Value_Target" value={reference_Value_Target} onChange={(e) => setReference_Value_Target(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="base_Value">Base Value</label>
          <InputText id="base_Value" value={base_Value} onChange={(e) => setBase_Value(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="notes">Notes</label>
          <SmartInput id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="sources_and_Further_Reading">Sources and Further Reading</label>
          <InputText id="sources_and_Further_Reading" value={sources_and_Further_Reading} onChange={(e) => setSources_And_Further_Reading(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="name_of_selected_indicator_en">Indicator Name for DPO list (EN)</label>
          <SmartInput id="name_of_selected_indicator_en" value={name_of_selected_indicator_en} onChange={(e) => setName_Of_Selected_Indicator_En(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="name_of_selected_indicator_gr">Indicator Name for DPO list (GR)</label>
          <SmartInput id="name_of_selected_indicator_gr" value={name_of_selected_indicator_gr} onChange={(e) => setName_Of_Selected_Indicator_Gr(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="observation_gr">Observation for Visualization /Display</label>
          <SmartInput id="observation_gr" value={observation_gr} onChange={(e) => setObservation_Gr(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="early_demo_dash_Id">EarlyDemo Dashboard ID</label>
          <InputText id="early_demo_dash_Id" value={early_demo_dash_Id} onChange={(e) => setEarly_Demo_Dash_Id(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="early_demo_dash_ind_Id">EarlyDemo Dashbord Indicator ID</label>
          <InputText id="early_demo_dash_ind_Id" value={early_demo_dash_ind_Id} onChange={(e) => setEarly_Demo_Dash_Ind_Id(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="early_demo_dash_source">EarlyDemo Dashboard SOURCE</label>
          <InputText id="early_demo_dash_source" value={early_demo_dash_source} onChange={(e) => setEarly_Demo_Dash_Source(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="opinion_from_ODIPY_Other_experts">Piloting Phase: Opinion from ODIPY/Other experts</label>
          <SmartInput id="opinion_from_ODIPY_Other_experts" value={opinion_from_ODIPY_Other_experts} onChange={(e) => setOpinion_From_ODIPY_Other_Experts(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="pilot_outcome">Pilot Outcome</label>
          <Dropdown 
            id="pilot_outcome"
            value={pilot_outcome}
            options={pilot_outcome_list}
            onChange={(e) => {
                const selected = e.value;
                const normalizedValue = selected?.value !== undefined ? selected.value : selected;

                setPilot_Outcome(normalizedValue === '' ? '' : normalizedValue);
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
          <label htmlFor="pilot_success_criteria">Pilot Success Criteria</label>
          <InputText id="pilot_success_criteria" value={pilot_success_criteria} onChange={(e) => setPilot_Success_Criteria(e.target.value)} />
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