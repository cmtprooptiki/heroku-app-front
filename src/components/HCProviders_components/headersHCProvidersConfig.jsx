// headersConfig.js

export const headers = {
    ype: {
        label: "YPE (Region)",
        description: "Greek Health region"
    },
    Q4ALL_code: {
        label: "Q4ALL_code",
        description: "Code for Q4ALL, Y(number) for region, _ (H) for Hospital, (P) primary care facility …. And serial number with 3 digits"
    },
    type_Of_Hcp: {
        label: "Type of HCP",
        description: "Hospital; PrimaryCareFacility; …."
    },
    Name_GR: {
        label: "Name (GR)",
        description: "Use SMALL letter and NO abreviations in names"
    },
    Name_EN: {
        label: "Name (EN) ",
        description: `(use some translation, BUT should be verified if there is an offical reporting in english with a specific EN translation - verify with ELSTAT, also if the organization as Website in EN, name there should match this one)`
    },
    category_As_Per_HealthAtlas: {
        label: "Category (as per HealthAtlas)",
        description: `401+ Beds
201-400 Beds
101-200 Beds
0-100 Beds
CHILDREN'S HOSPITAL
ONCOLOGY HOSPITALS
PSYCHIATRIC HOSPITALS  and REHABILITATION"
`
    },
    category_As_Per_Sha_2011_Elstat: {
        label: "Category (as per SHA 2011) ELSTAT",
        description: "(See SHA 2022 grouping sheet)"
    },
    lat: {
        label: "Latitude",
        description: ""
    },
    lon: {
        label: "Longitude",
        description: ""
    },
    address: {
        label: "Address",
        description: ""
    },
    post_Code: {
        label: "Post Code",
        description: ""
    },
    email_Contact: {
        label: "email contact",
        description: ""
    },
    general_Email_Contact: {
        label: "general email contact",
        description: ""
    },
    website: {
        label: "website",
        description: ""
    },
    Idika_Ehr: {
        label: "IDIKA EHR",
        description: ""
    },
    Odipy_Inidcator_Collection: {
        label: "ODIPY INDICATOR COLLECTION",
        description: ""
    },
    Drg_Mature_Usage: {
        label: "DRG MATURE USAGE",
        description: ""
    },
    HEALTH_Center_In_The_Network: {
        label: "HEALTH CENTER IN THE NETWORK",
        description: ""
    }
  };
  