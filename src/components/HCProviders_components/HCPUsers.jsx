import React,{useState,useEffect, useRef} from 'react'
import FilterName from './FilterName';
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
import { HcprovidersMap2 } from './HcprovidersMap2';
import { HcprovidersMap3 } from './HcprovidersMap3';
import { headers } from './headersHCProvidersConfig';  // Import the header configuration
import FilterHCProviders from './FilterHCProviders';
import { HcprovidersMap } from './HcprovidersMap';
import "./datatable2-custom.css"; // Your custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons"; // FontAwesome Swap Icon

import FilterYpe from './FilterYpe';

import HospitalTable from './HospitalTable';
import { Slider } from "primereact/slider";

import { TabView, TabPanel } from "primereact/tabview";
import CircleLayerComponent from './testmap';


const HCPUsers = () => {
    // Create individual state variables and setters for each field
    const [id,setId]=useState('');
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
  
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      getHcprovidersByUser();
      console.log("reloadr",reload)
    }, [user,reload]);
  
    const getHcprovidersByUser = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/HCProvidersByUser/${user.id}`, { timeout: 5000 });
        if (response.data && response.data.length > 0) {
          const provider = response.data[0];
          setId(provider.id)
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
        }
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
                website:website,
                Idika_Ehr:Idika_Ehr,
                Odipy_Inidcator_Collection : Odipy_Inidcator_Collection,
                Drg_Mature_Usage: Drg_Mature_Usage,
                HEALTH_Center_In_The_Network: HEALTH_Center_In_The_Network

            });
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
  
    return (
        <>
      <Card>
        
        <h3>Edit Healthcare Provider Data</h3>
        <form onSubmit={updateHCPUsers}>
            <div className="flex flex-wrap justify-content-around gap-1">
                <Card >
                    <h4>Provider Info</h4>
                    <div style={{paddingBottom:"10px"}}>
                        <label>ype: </label>
                        <InputText value={ype} onChange={(e) => setYpe(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Q4ALL Code: </label>
                        <InputText value={Q4ALL_code} onChange={(e) => setQ4ALL_code(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Type Of HCP: </label>
                        <InputText value={type_Of_Hcp} onChange={(e) => setType_Of_Hcp(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Name (GR): </label>
                        <InputText value={Name_GR} onChange={(e) => setName_GR(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Name (EN): </label>
                        <InputText value={Name_EN} onChange={(e) => setName_EN(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Category (HealthAtlas): </label>
                        <InputText value={category_As_Per_HealthAtlas} onChange={(e) => setCategory_As_Per_HealthAtlas(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Category (Sha 2011 Elstat): </label>
                        <InputText value={category_As_Per_Sha_2011_Elstat} onChange={(e) => setCategory_As_Per_Sha_2011_Elstat(e.target.value)} />
                    </div>

                    <div style={{paddingBottom:"10px"}}>
                        <label>Idika EHR: </label>
                        <InputText value={Idika_Ehr} onChange={(e) => setIdika_Ehr(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Odipy Indicator Collection: </label>
                        <InputText value={Odipy_Inidcator_Collection} onChange={(e) => setOdipy_Inidcator_Collection(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>DRG Mature Usage: </label>
                        <InputText value={Drg_Mature_Usage} onChange={(e) => setDrg_Mature_Usage(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Health Center In The Network: </label>
                        <InputText value={HEALTH_Center_In_The_Network} onChange={(e) => setHEALTH_Center_In_The_Network(e.target.value)} />
                    </div>
                </Card>

                <Card>
                    <h4>Contact Details</h4>

                    <div style={{paddingBottom:"10px"}}>
                        <label>Latitude: </label>
                        <InputText value={lat} onChange={(e) => setLat(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Longitude: </label>
                        <InputText value={lon} onChange={(e) => setLon(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Address: </label>
                        <InputText value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Post Code: </label>
                        <InputText value={post_Code} onChange={(e) => setPost_Code(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Email Contact: </label>
                        <InputText value={email_Contact} onChange={(e) => setEmail_Contact(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>General Email Contact: </label>
                        <InputText value={general_Email_Contact} onChange={(e) => setGeneral_Email_Contact(e.target.value)} />
                    </div>
                    <div style={{paddingBottom:"10px"}}>
                        <label>Website: </label>
                        <InputText value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                </Card>
            </div>
            <div className="control" style={{paddingTop: "20px"}}>
                <Button style={{width: "-webkit-fill-available",display: "flex",justifyContent: "center"}} type="submit" className="button is-success is-fullwidth">Ενημέρωση</Button>
            </div>
          
          
          
          
          
          
         
        </form>
      </Card>
      <br/>
      <Card >


        
      </Card>
      </>
    );
  };
  
  export default HCPUsers;

