import React,{useState,useEffect, useRef} from 'react'
import FilterName from './FilterName';
import FilterMap from './FilterMap';
import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux';
// import '../../buildinglist.css';
import apiBaseUrl from '../../apiConfig';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { useParams } from 'react-router-dom';

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
import { HcprovidersMap2 } from './HcprovidersMap2';
import { HcprovidersMap3 } from './HcprovidersMap3';
import { headers } from './headersHCProvidersConfig';  // Import the header configuration
import FilterHCProviders from './FilterHCProviders';
import { HcprovidersMap } from './HcprovidersMap';
//import "./datatable2-custom.css"; // Your custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/datatable.css"

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Swap Icon

import FilterYpe from './FilterYpe';

import HospitalTable from './HospitalTable';
import { Slider } from "primereact/slider";

import { TabView, TabPanel } from "primereact/tabview";
import CircleLayerComponent from './testmap';
import HospitalBedsChart from './HospitalBeds';


import hospitalIcon from "../../icons/hospitalicon.png";
import healthCareIcon from "../../icons/health-center.png";
import tomyIcon from "../../icons/tomyicon.png";
import { useNavigate } from "react-router-dom";

import { Toast } from 'primereact/toast';
const HCPUsers = () => {
    // Create individual state variables and setters for each field
    // const [id,setId]=useState('');
    const [notification, setNotification] = useState('');
    const toast = useRef(null);
    const navigate = useNavigate();

    const [ype, setYpe] = useState('');
    const [Q4ALL_code, setQ4ALL_code] = useState('');
    const [type_Of_Hcp, setType_Of_Hcp] = useState('');
    const [Name_GR, setName_GR] = useState('');
    const [Name_EN, setName_EN] = useState('');
    const [category_As_Per_HealthAtlas, setCategory_As_Per_HealthAtlas] = useState('');
    const [category_As_Per_Sha_2011_Elstat, setCategory_As_Per_Sha_2011_Elstat] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [address, setAddress] = useState('');
    const [post_Code, setPost_Code] = useState('');
    const [email_Contact, setEmail_Contact] = useState('');
    const [general_Email_Contact, setGeneral_Email_Contact] = useState('');
    const [website, setWebsite] = useState('');
    const [Idika_Ehr, setIdika_Ehr] = useState('');
    const [Odipy_Inidcator_Collection, setOdipy_Inidcator_Collection] = useState('');
    const [Drg_Mature_Usage, setDrg_Mature_Usage] = useState('');
    const [HEALTH_Center_In_The_Network, setHEALTH_Center_In_The_Network] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload,setReload]=useState(false)
    const{id} = useParams();
  
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      getHcprovidersByUser();
      console.log("reloadr",reload)
    }, [user,reload]);
  
    const getHcprovidersByUser = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/HCProviders/${id}`, { timeout: 5000 });
        
          const provider = response.data;
          console.log("PR: ",provider)
        //   setId(provider.id)
          setYpe(provider.ype);
          setQ4ALL_code(provider.Q4ALL_code);
          setType_Of_Hcp(provider.type_Of_Hcp);
          setName_GR(provider.Name_GR);
          setName_EN(provider.Name_EN);
          setCategory_As_Per_HealthAtlas(provider.category_As_Per_HealthAtlas);
          setCategory_As_Per_Sha_2011_Elstat(provider.category_As_Per_Sha_2011_Elstat);
          setLat(provider.lat);
          setLon(provider.lon);
          setAddress(provider.address);
          setPost_Code(provider.post_Code);
          setEmail_Contact(provider.email_Contact);
          setGeneral_Email_Contact(provider.general_Email_Contact);
          setWebsite(provider.website);
          setIdika_Ehr(provider.Idika_Ehr);
          setOdipy_Inidcator_Collection(provider.Odipy_Inidcator_Collection);
          setDrg_Mature_Usage(provider.Drg_Mature_Usage);
          setHEALTH_Center_In_The_Network(provider.HEALTH_Center_In_The_Network);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    const updateHCPUsers = async(e) =>{
        e.preventDefault();
        try
        {
            await axios.patch(`${apiBaseUrl}/HCProviders/${id}`, {
                ype:ype,
                Q4ALL_code:Q4ALL_code,
                type_Of_Hcp:type_Of_Hcp,
                Name_GR:Name_GR,
                Name_EN:Name_EN,
                category_As_Per_HealthAtlas:category_As_Per_HealthAtlas,
                category_As_Per_Sha_2011_Elstat:category_As_Per_Sha_2011_Elstat,
                lat: lat,
                lon:lon,
                address: address,
                post_Code: post_Code,
                email_Contact: email_Contact,
                general_Email_Contact:general_Email_Contact,
                website:website,
                Idika_Ehr:Idika_Ehr,
                Odipy_Inidcator_Collection : Odipy_Inidcator_Collection,
                Drg_Mature_Usage: Drg_Mature_Usage,
                HEALTH_Center_In_The_Network: HEALTH_Center_In_The_Network

            });
            setTimeout(() => {
                setNotification('Changes have been saved successfully!');
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Changes saved!', life: 3000 });
            }, 1000);
            setReload((prev)=>!prev)
                // window.location.reload();


            // if(user.id === undefined)
            // {
            //     onHide();
            //     window.location.reload();
            // }
            // else
            // {
            //     window.location.reload();

            //     navigate(-1);
            // }

            // navigate("/paradotea");
        }
        catch(error)
        {
            if(error.response){
                console.log(error.response.data.msg);
            }
        }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }

    console.log("User", user)


    const getHcpIcon = (type) => {
        switch (type) {
            case 'Hospital':
                return hospitalIcon;
            case 'Health Centre':
                return healthCareIcon;
            case 'TOMY':
                return tomyIcon;
            default:
                return hospitalIcon;
        }
    };
  
    return (
        <>
            <Toast ref={toast} />

<Card className="p-5">
      <h3 className="title2-temp text-decor">Provider Info</h3>
      <Button 
        onClick={() => navigate(-1)} 
        className="mb-4"
        style={{
          background: "#0F00AB",
          color: "white",
          fontSize: "14px",
          padding: "8px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back
      </Button>
      <div className="class-custom border-temp" >
      <img src={getHcpIcon(type_Of_Hcp)} alt="Hospital Logo" className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <h4 className="font-bold title-temp">{Name_EN}</h4>
          <p className='p-temp'>Type of Healthcare Provider (HCP): <span style={{color:"#0F00AB"}}>{type_Of_Hcp}</span></p>
          <p className='p-temp' >Q4ALL Code: <span style={{color:"#0F00AB"}}>{Q4ALL_code}</span></p>
        </div>
      </div>
      
      <form onSubmit={updateHCPUsers}>
      <h4 className="section-title mt-6">Basic Information</h4>

        <div class="form-row">
            <div class="col">
            <label>Name (GR)</label>

            <InputText className='form-control' value={Name_GR} onChange={(e) => setName_GR(e.target.value)} />

            {/* <input type="text" class="form-control" placeholder="First name"> */}
            </div>
            <div class="col">
            <label>Name (EN)                          </label>
            <InputText className='form-control' value={Name_EN} onChange={(e) => setName_EN(e.target.value)} />

            {/* <input type="text" class="form-control" placeholder="Last name"> */}
            </div>

        </div>
        <div class="form-row">

            <div class="col">
                <label>Type of Healthcare Provider (HCP)</label>
                <InputText className='form-control'  value={type_Of_Hcp} onChange={(e) => setType_Of_Hcp(e.target.value)} />
            </div>
            <div class="col">
                <label>Q4ALL Code</label>
                <InputText className='form-control'  value={Q4ALL_code} onChange={(e) => setQ4ALL_code(e.target.value)}/>
            </div>
        </div>

        <h4 className="section-title mt-6">Category Information</h4>
        <div class="form-row">
            <div class="col">
            <label>HealthAtlas Category:</label>
            <InputText className='form-control' value={category_As_Per_HealthAtlas} onChange={(e) => setCategory_As_Per_HealthAtlas(e.target.value)} />
            </div>
            <div class="col">
            <label>Sha 2011 Elstat Category:</label>
            <InputText className='form-control' value={category_As_Per_Sha_2011_Elstat} onChange={(e) => setCategory_As_Per_Sha_2011_Elstat(e.target.value)}  />
            </div>

        </div>

        <h4 className="section-title mt-6">Digital Network</h4>
        <div class="form-row">
            <div class="col">
            <label>Idika EHR (Electronic Health Record):</label>
            <InputText className='form-control' value={Idika_Ehr} onChange={(e) => setIdika_Ehr(e.target.value)}  />
            </div>
            <div class="col">
            <label>Odipy Indicator Collection:</label>
            <InputText className='form-control' value={Odipy_Inidcator_Collection}  onChange={(e) => setOdipy_Inidcator_Collection(e.target.value)} />
            </div>
        </div>
        <div class="form-row">
        <div class="col">
          <label>DRG Mature Usage:</label>
          <InputText className='form-control' value={Drg_Mature_Usage} onChange={(e) => setDrg_Mature_Usage(e.target.value)}  />
        </div>
        <div class="col">
          <label>Health Center In The Network:</label>
          <InputText className='form-control' value={HEALTH_Center_In_The_Network}  onChange={(e) => setHEALTH_Center_In_The_Network(e.target.value)} />
        </div>
        </div>

        <h4 className="section-title mt-6">Location & Contact Details</h4>
        <div class="form-row">
            <div class="col">
            <label>Address</label>
            <InputText className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div class="col">
            <label>Post Code</label>
            <InputText className='form-control' value={post_Code} onChange={(e) => setPost_Code(e.target.value)}  />
            </div>
        </div>

        <div class="form-row">
            <div class="col">
            <label>Latitude</label>
            <InputText className='form-control' value={lat} onChange={(e) => setLat(e.target.value)} />
            </div>
            <div class="col">
            <label>Longitude</label>
            <InputText className='form-control' value={lon} onChange={(e) => setLon(e.target.value)} />
            </div>
        </div>

        <div class="form-row">
            <div class="col">
            <label>Email Contact</label>
            <InputText className='form-control' value={email_Contact} onChange={(e) => setEmail_Contact(e.target.value)} />
            </div>
            <div class="col">
            <label>General Email Contact</label>
            <InputText className='form-control' value={general_Email_Contact} onChange={(e) => setGeneral_Email_Contact(e.target.value)} />
            </div>
        </div>

        <div class="form-row">
            <div class="col">
            <label>Website</label>
            <InputText className='form-control' value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div class="col">
            </div>
        </div>


      <div className="control" style={{paddingTop: "20px"}}>
                <Button  type="submit" style={{
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
                }}>Save Changes</Button>
            </div>
      </form>
      {notification && (
                    <div className="notification" style={{
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        border: "1px solid #c3e6cb",
                        borderRadius: "5px"
                    }}>
                        {notification}
                    </div>
                )}
    </Card>
    {type_Of_Hcp === "Hospital" && (

    <Card className="p-5" style={{marginTop:"25px"}}>
    <h3 className="title2-temp text-decor">Beds Information</h3>

    <HospitalBedsChart id={id}/>

    </Card>
    )}

      </>
    );
  };
  
  export default HCPUsers;

