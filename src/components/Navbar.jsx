import React,{ useState, useRef }from "react";
import {NavLink} from "react-router-dom";
import logo from "../logo2.png";
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {LogOut, LoginUser,reset} from "../features/authSlice"
import '../navbar-custom.css';
import {IoPerson,IoPricetag,IoHome,IoLogOut} from "react-icons/io5";


import {ReactComponent as CashFlowIcon} from '../icons/cashflowicon2.svg';


import {ReactComponent as CustoEditIcon} from '../icons/customersediticon.svg';
import {ReactComponent as BudgetIcon} from '../icons/budgeticonedit.svg';
import {ReactComponent as UsersIcon} from '../icons/userlist2.svg';
import {ReactComponent as SettingsIcon } from '../icons/settings.svg';

import {ReactComponent as StatisticsIcon } from '../icons/statistics.svg';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import cmt from "../logocmt.png";
import cashflow_logo from "../Images/who2.png"
import { ReactComponent as WizardIcon } from '../icons/wizardicon.svg'; // Import the SVG as a React component

import { Toolbar } from "primereact/toolbar";

import {useClickOutside} from "primereact/hooks";

// import apiBaseUrl from '../../apiConfig';
import apiBaseUrl from "../apiConfig";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { AutoComplete } from "primereact/autocomplete";
import { Navigate } from "react-router-dom";

const Navbar =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth)
    const logout = ()=>{
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [visible, setVisible] = useState(false);
    const [ShowSearch,setShowSearch] = useState(false);

    const overlayRef = useRef(null);

    useClickOutside(overlayRef, () => {
        setVisible(false);
    });
    //ref={overlayRef}


    const startContent = (
        <React.Fragment>
     
            <div >
                <Avatar icon="p-ripple pi pi-plus" style={{borderRadius:"20px"}} onClick={() => setVisible(true)} ><Ripple/></Avatar>
                <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '280px',backgroundImage: 'linear-gradient(to right, #1400B9, #00B4D8)' }}>
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                    <img 
                                      src={cashflow_logo}
                                      width="180" 
                                      alt="logo"
                                    />
                                    <span >
                                        <Button type="button" ref={closeIconRef} onClick={(e) => {hide(e)}} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                                    </span>
                                </div>
                                <div className="overflow-y-auto " >
                              






                             


                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef4} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                <div className="mr-2 text-gray-50" >
                                                            <SettingsIcon style={{ width: '3.5em', height: '3.5em' }}  className="" /> 
                                                        </div> 
                                                    <span className="font-medium">Γενική Διαχείριση</span>
                                                    <i className="pi pi-chevron-down text-gray-50"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="list-none p-0 m-0 overflow-hidden">

                                            <li><Link to="/users" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    <div className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700  transition-duration-150 transition-colors w-full">
                                                        {/* <i className="pi pi-users mr-2 text-gray-50"></i> */}
                                                        <div className="mr-2 text-gray-50" >
                                                            <UsersIcon style={{ width: '3.5em', height: '3.5em' }}  className="" /> 
                                                        </div>
                                                        <span className="font-medium">Διαχείριση Χρηστών</span>
                                                        <Ripple />
                                                    </div>
                                                    </Link>
                                                </li>
                                           


                                          
                                            </ul>
                                        </li>
                                    </ul>



                                </div>
                                <div className="mt-auto">
                                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                    <a v-ripple className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700  transition-duration-150 transition-colors p-ripple">
                                        {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                                        <span className="font-bold">Amy Elsner</span> */}
                                        {/* {console.log("here is the profile pci",user?.profileImage)} */}
                                         <Avatar
                                                    image={`${apiBaseUrl}/uploads/${user?.profileImage.split('/').pop()}`}
                                                    shape="circle"
                                                />
                                                <span className="font-bold">{user?.name || "Amy Elsner"}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
            </div>
        </React.Fragment>
    );
    const op = useRef(null);
  
    const navigation = useNavigate();
 

    const centerContent = (
        <div className="flex flex-wrap align-items-center gap-3">
            <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-home text-2xl"></i>
                <Ripple />
            </Link>
            <Link to="/users" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <i className="pi pi-user text-2xl"></i>
                <Ripple />
            </Link>
       
        </div>
    );

    const endContent = (
        <React.Fragment>
            {/* <div className="flex align-items-center gap-2">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-bluegray-50">Amy Elsner</span>
            </div> */}
            
            <div>
                <Avatar
                    image={`${apiBaseUrl}/uploads/${user?.profileImage.split('/').pop()}`}
                    shape="circle"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                {/* <AccountCircle /> */}
                </Avatar>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >

                    <MenuItem><FaUser/><span style={{paddingLeft:"10px"}}>{user && user.name} ({user && user.role})</span></MenuItem>
                    {user && user.role ==="admin" && ( 
                    <MenuItem  component={Link} to="/users" ><FaUsersGear/><span style={{paddingLeft:"10px"}}> Διαχείριση Χρηστών</span></MenuItem>
                    )}

                    <MenuItem onClick={logout}><IoLogOut/><span style={{paddingLeft:"10px"}}> Αποσύνδεση</span></MenuItem>

                
                </Menu>
            </div>
        </React.Fragment>
    );

    return(
      
        <div className="card" >
            <Toolbar start={startContent} center={centerContent} end={endContent} className="bg-gray-900 shadow-2" 
            style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, #1400B9, #00B4D8)' }} />
        </div>
    )
}
export default Navbar