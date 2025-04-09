// headersConfig.js

export const headers = {
    indicator_name: {
        label: "Indicator Descriptive Name (EN)",
        description: "The specific name used to identify the Key Performance Indicator (KPI)."
    },
    q4all_Ind_number: {
        label: "Q4All Indicator Number",
        description: "This will be an internal Number for indicators of 'Q4ALL Q4Alln.xxxx' with 4 digits."
    },
    status: {
        label: "Status",
        description: "S - Suggested; D-Draft; A - Approved; P-Pilot; O-Operational"
    },
    indicator_cluster: {
        label: "Indicator Cluster",
        description: "STILL TO BE DONE - An Indicator Cluster is a logical clustering  of a set of related indicators that share common aspects (group of indicators of related categories) "
    },

    // feedback_from_ODIPY:{
    //     label: "FEEDBACK FROM ODIPY",
    //     description: "PLEASE COMMENT ABOUT THE INDICATOR"
    // },

    // feedback_from_EOPYY:{
    //     label: "FEEDBACK FROM EOPYY",
    //     description: "PLEASE COMMENT ABOUT THE INDICATOR"
    // },
    // feedback_from_IDIKA:{
    //     label: "FEEDBACK FROM IDIKA",
    //     description: "PLEASE COMMENT ABOUT THE INDICATOR"
    // },

    // ind_Merge: {
    //     label: "Indicator Merge",
    //     description: `If 2 indicators are "merged", the one with the lowest number remains and the other is "inactive"; e.g. Q4Alln.000x + Q4Alln.00xy --> Q4Alln.000x - text is adjusted and the "inactivated indicator line of cells is colored light grey.`
    // },
    catergory_of_Indicator: {
        label: "Source of proposal for the indicator",
        description: "The origin or source of inspiration for the KPI, such as whether it is adapted from another country's indicator, an international standard, or developed internally."
    },

    observations_from_meetings:{
        label: "OBSERVATIONS FROM MEETINGS",
        description: ""
    },
    shortlist_indicators:{
        label: "Type of Indicator (M, A, P, A/P)",
        description: "M-Manual; A-Automated; P-Proxy; A/P-Automated / Proxy"
    },
    decision_and_next_steps:{
        label: "DECISION AND NEXT STEPS",
        description: ""
    },
    forPilot:{
        label: "ForPilot",
        description: "(1-Yes;0-No;T-WeWillTry)"
    },

    publicationsoptions:{
        label: "Publications options",
        description: "SomePubHs/IdikaSWHs/ALLPubHs/ALLPrivHs/ALLPub_ProvHs/PHC"
    },


    dimension: {
        label: "Dimension",
        description: "The aspect of healthcare quality the indicator measures, e.g., safety, effectiveness, etc."
    },
//     type_of_healthcare: {
//         label: "Type of Healthcare",
//         description: `D1: Secondary Healthcare (all hospitals, secondary and tertiary hospitals, hospital at home, telehealth services, data from wearables)
// D2: Home/telecare and Active life (hospital at home, telehealth services, data from wearables, health at home social service)
// D3: Primary Care (342 health centers; 127 TOMY local health units; 110 COMY mobile health units; Outpatient prescription)
// D4: Public health indicators (EODY-national center of public health; with-- ODIPY - hospital infections; IDIKA (HIV registry and COVID19)
// D5: NCDs and Mental Health (diagnosis of NCDs in drug prescription; healthstat, perceptions, service use, drugs use, mental health clinics of university hospitals, and 3 psychiatry hospitals), day care centers for mental health units?
// D6: Palliative and Long term care
// D7: All domains`
//     },
    type_of_healthcare_providers_D1_D7: {
        label: "Type of Healthcare Providers",
        description: `D1: Secondary Healthcare (all hospitals, secondary and tertiary hospitals, hospital at home, telehealth services, data from wearables)
D2: Home/telecare and Active life (hospital at home, telehealth services, data from wearables, health at home social service)
D3: Primary Care (342 health centers; 127 TOMY local health units; 110 COMY mobile health units; Outpatient prescription)
D4: Public health indicators (EODY-national center of public health; with-- ODIPY - hospital infections; IDIKA (HIV registry and COVID19)
D5: NCDs and Mental Health (diagnosis of NCDs in drug prescription; healthstat, perceptions, service use, drugs use, mental health clinics of university hospitals, and 3 psychiatry hospitals), day care centers for mental health units?
D6: Palliative and Long term care
D7: All domains`
    },
    cross_Cutting_Dimensions_A_I: {
        label: "Cross Cutting Dimensions A-I",
        description: `Classification according to Dimensions:
A_Inputs_Workforce (Quantity/Training; capacity building)
B_Inputs_Social determinants of health and care
C_Process_Equity (gender balance, minorities, migrants)
D_Process_Access
H_Process_Patient Experience
E_Process_Cost containing and efficiency
F_Process_Green and sustainability
G_Process_Digital and healthcare transformation
H_Outputs_Patient Satisfaction
I_Outputs Health Gains`
    },
    cross_Cutting_Dimensions_Inputs_Process_Outputs: {
        label: "Cross Cutting Dimensions (Inputs-Process - Outputs)",
        description: "Classification according to: Inputs; Process; Outputs"
    },
    dimensions_of_Quality_QoCOfficeReport: {
        label: "6 dimensions of Quality (QoCOfficeReport)",
        description: `Classification according to QoCOfficeReport:
Efficiency
Access
Equity
User experience
Effectiveness
Safety`
    },
    priority: {
        label: "Priority",
        description: `Classification regarding Priority taking into account AIM of Q4All platform and HealthIQ project overall:
1- 1st priority (very useful and somehow tangible);
2 - 2nd priority (useful and with some difficulties);
3 3rd priority (interesting but very difficult) ==== target for "proposed indicators" 180 of cat 1; 100 cat 2; 20 cat 3;`
    },
    data_collection: {
        label: "Data collection process types",
        description: `AUTOMATED (Pre-existing data Source/System): There is a pre-existing data source that could totally or partially cover data needed to use this indicator in the Greek context
MANUAL: Data needs to be collected manually, and retrieved by an existing system (e.g., MoH BI, other) or NEW System
AUTOMATED NEW / INNOVATIVE: Data needs to be collected in an innovative manner (e.g., collecting "nº steps" from each Greek person via connecting their phones' pedometer to a system that collects that for a large sample in real time`
    },
    collecting_National_Organization: {
        label: "Collecting National Organization",
        description: "Name (ideally also system) of the National Level Organization that collects data related to the proposed indicator"
    },
//     legal_Organizational_Requirements: {
//         label: "Legal Requirements",
//         description: `1 - No need
// 2 - Legal base exists but needs to be "operationalized" via a guideline/regulation by ODIPY/Other org
// 3 - New Legal base is needed (MoH order)
// 4 - New Legal base is needed (Law)`
//     },
    proponent_Organization_WG: {
        label: "Proponent Organization/WG",
        description: "Organization or team that proposed or supports the use of this indicator."
    },
    rationale_Description: {
        label: "Rationale Description",
        description: "Can be created from formula…"
    },
    objective: {
        label: "Objective",
        description: "The specific goal this indicator aims to achieve in terms of healthcare outcomes or performance improvement."
    },
    calculation_Formula: {
        label: "Calculation Formula",
        description: "The mathematical equation or method used to compute the indicator’s value."
    },
    numerator: {
        label: "Numerator",
        description: "The top part of the calculation."
    },
    numerator_Definitions: {
        label: "Numerator Definitions",
        description: "Detailed explanation of what is counted in the numerator and how it is measured."
    },
    denominator: {
        label: "Denominator",
        description: "The bottom part of the calculation."
    },
    denominator_Definitions: {
        label: "Denominator Definitions",
        description: "Detailed explanation of what is included in the denominator and how it is measured."
    },
    target_Population: {
        label: "Target Population",
        description: "The group of patients or institutions to which the indicator applies."
    },
    // field_Topic: {
    //     label: "Field Topic",
    //     description: "Search by Field Topic"
    // },
    // extraCol2: {
    //     label: "Extra Column 2",
    //     description: "Search by Extra Column 2"
    // },
    periodicity: {
        label: "Periodicity (frequency of measurement) ",
        description: "How often the data for this indicator is collected, e.g., weekly, monthly, quarterly, annually, etc."
    },
    data_Collection_Steps: {
        label: "Data Collection Steps",
        description: "The specific procedures and actions required to gather data for this indicator."
    },
    legal_Requirements: {
        label: "Legal Requirements",
        description: "Any laws, regulations, or standards that mandate the use or reporting of this indicator."
    },
    responsible_for_Monitoring: {
        label: "Responsible for Monitoring",
        description: "Organization, department, or team accountable for tracking and evaluating this indicator. (In the field)"
    },
    // Add all other headers in the same format

    deadline_Reporting: {
        label: "Deadline Reporting",
        description: "The time frame or specific date by which the data for this indicator must be reported."
    },
    supervisor_Body: {
        label: "Supervisor Body",
        description: "The external entity responsible for overseeing the monitoring of the indicator."
    },
    management_Entity: {
        label: "Management Entity",
        description: "The organization in charge of managing the indicator and ensuring it meets its objectives."
    },
    applicable_period: {
        label: "Applicable Period",
        description: "The time range during which this indicator is relevant or active for measurement and reporting."
    },
    unit_of_Measurement: {
        label: "Unit of Measurement",
        description: "The metric or unit used to express the value of the indicator (e.g., percentage, number of events)."
    },
    // data_Source_Monitoring_Basis: {
    //     label: "Data Source Monitoring",
    //     description: "The origin of the data used to calculate the indicator, such as patient records, surveys, or administrative data."
    // },
    it_System_Source: {
        label: "IT system/data source ",
        description: "The origin of the data used to calculate the indicator, such as patient records, surveys, or administrative data. Exact IT system "
    },
    reference_Value_Target: {
        label: "Reference Value Target",
        description: "The desired or expected value of the indicator, often set as a target for performance improvement."
    },
    base_Value: {
        label: "Base Value",
        description: "The initial value of the indicator before any improvement initiatives, used as a comparison point."
    },
    notes: {
        label: "Notes",
        description: "Additional information or clarifications related to the indicator."
    },
    sources_and_Further_Reading: {
        label: "Sources and Further Reading",
        description: "References to documents, studies, or websites that provide more information about the indicator."
    },
//     selected_indicator: {
//         label: "Selected Indicator",
//         description: `YES - the Potential Indicator is considered useful, feasible, and can be adjusted to the Greek context;
// NO - the Potential Indicator does not seem relevant for Q4All now or in the near (2y) future;
// MAYBE - the Potential Indicator can be useful IF a certain set of conditions (e.g. data collection, legal basis, etc ) are changed.`
//     },
    // adaptation_Needs: {
    //     label: "Adaptation Needs",
    //     description: "Brief description of the needs to adapt the suggested indicator to the Greek Context and Q4ALL/healthIQ aims."
    // },


//hideen column added

    name_of_selected_indicator_en: {
        label: "Indicator Name for DPO list (EN)",
        description: ""
    },
    // frequency_of_measurement_en: {
    //     label: "Frequency of Measurement (EN)",
    //     description: "Annual, Quarterly, Monthly, Daily, Every x mins; Realtime"
    // },
    // description_en: {
    //     label: "Description (EN)",
    //     description: "Can be created from formula…"
    // },
    // unit_of_measurement_en: {
    //     label: "Unit of Measurement (EN)",
    //     description: "The unit used to measure the indicator (English)."
    // },
    // calculation_formula_en: {
    //     label: "Calculation Formula (EN)",
    //     description: "The formula used to calculate the indicator (English)."
    // },
    // numerator_en: {
    //     label: "Numerator (EN)",
    //     description: "The numerator used in the calculation of the indicator (English)."
    // },
    // denominator_en: {
    //     label: "Denominator (EN)",
    //     description: "The denominator used in the calculation of the indicator (English)."
    // },
    // comments_en: {
    //     label: "Comments (EN)",
    //     description: "Comments about the indicator VISIBLE to the general user of Q4ALL"
    // },
    // observation_en: {
    //     label: "Observation (EN)",
    //     description: "General observations about the indicator NOT visible to the general user of Q4ALL"
    // },
    // extrafield_empty: {
    //     label: "ExtraField-EMPTY",
    //     description: "Placeholder for additional data."
    // },
    name_of_selected_indicator_gr: {
        label: "Indicator Name for DPO list (GR)",
        description: ""
    },
    // frequency_of_measurement_gr: {
    //     label: "Frequency of Measurement (GR)",
    //     description: "Annual, Quarterly, Monthly, Daily, Every x mins; Realtime"
    // },
    // description_gr: {
    //     label: "Description (GR)",
    //     description: "Can be created from formula… "
    // },
    // unit_of_measurement_gr: {
    //     label: "Unit of Measurement (GR)",
    //     description: "The unit used to measure the indicator (Greek)."
    // },
    // calculation_formula_gr: {
    //     label: "Calculation Formula (GR)",
    //     description: "The formula used to calculate the indicator (Greek)."
    // },
    // numerator_gr: {
    //     label: "Numerator (GR)",
    //     description: "The numerator used in the calculation of the indicator (Greek)."
    // },
    // denominator_gr: {
    //     label: "Denominator (GR)",
    //     description: "The denominator used in the calculation of the indicator (Greek)."
    // },
    // comments_gr: {
    //     label: "Comments (GR)",
    //     description: "Comments about the indicator VISIBLE to the general user of Q4ALL "
    // },
    observation_gr: {
        label: "Observation for Visualization /Display",
        description: ""
    },
    // extrafield_empty_gr: {
    //     label: "ExtraField-EMPTY (GR)",
    //     description: "Placeholder for additional data in Greek."
    // },
    // it_system_source_process: {
    //     label: "IT System/Source/Process",
    //     description: "Details of the IT system, source, or process used."
    // },
    // aim_of_the_indicator: {
    //     label: "AIM of the INDICATOR",
    //     description: "Brief description of WHY we are measuring this indicator, potential impacts, etc"
    // },
//hidden


//     piloting: {
//         label: "Piloting",
//         description: `YES - This "SELECTED INDICATOR" as is to be included in the Pilot;
// NO - this "SELECTED INDICATOR" is NOT to be included in the Pilot;
// N/A - this "SELECTED INDICATOR" is to be used but does not need to be included in the pilot.`
//     },
    opinion_from_ODIPY_Other_experts: {
        label: "Piloting Phase: Opinion from ODIPY/Other experts ",
        description: "Opinion from ODIPY, and any other experts, including the endorsement/refusal from HealthIQ mission experts."
    },
    pilot_outcome: {
        label: "Pilot Outcome",
        description: `1 - MAINTAIN AS IS;
2- MAINTAIN but adjust - (add columns to the right with changes);
3 - SUSPEND.`
    },
    pilot_success_criteria: {
        label: "Pilot Success Criteria",
        description: "TBD at a later stage - ideas can be listed in cells below."
    },

    internal_observations: {
    label: "Internal Observations",
    description: "This is where we record/document any observations and ongoing work on the indicators, not to be shown outside scope of the project."
    },
    dpolist: {
        label: "DPOList (1/0)",
        description: ""
    },
    dpo_org_source1: {
        label: "DPO Org Source1",
        description: ""
    },
    dpo_org_source2: {
        label: "DPO Org Source2",
        description: ""
    },
    dpo_org_source3: {
        label: "DPO Org Source3",
        description: ""
    },
    idika: {
        label: "IDIKA",
        description: ""
    },
    ketekny: {
        label: "KETEKNY",
        description: ""
    },
    eoppy: {
        label: "EOPPY",
        description: ""
    },
    odipy: {
        label: "ODIPY",
        description: ""
    },
    moh: {
        label: "MoH",
        description: ""
    },
    data_fields_vk: {
        label: "Data Fields (VK)",
        description: ""
    },
    early_demo_dash_Id: {
        label: "EarlyDemo Dashboard ID",
        description: "PLEASE COMMENT ABOUT THE INDICATOR"
    },
    early_demo_dash_ind_Id: {
        label: "EarlyDemo Dashbord Indicator ID",
        description: "PLEASE COMMENT ABOUT THE INDICATOR"
    },
    early_demo_dash_source: {
        label: "EarlyDemo Dashboard SOURCE",
        description: "PLEASE COMMENT ABOUT THE INDICATOR"
    }
  };
  