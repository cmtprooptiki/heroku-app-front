import React, { useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import cashflow_logo from "../Images/whologo.png";
import searchIconSvg from "../icons/search.svg";
import settingsIconSvg from "../icons/settings.svg";
import notificationsIconSvg from "../icons/notifications.svg";
import hcprovidersIconSvg from "../icons/hcproviders.svg"
import usersIconSvg from "../icons/users.svg";
import homeSvg from "../icons/home.svg";
import { Link } from 'react-router-dom';
import { Ripple } from 'primereact/ripple';
import { getMe } from "../features/authSlice";

import "../navbar-custom.css";
import apiBaseUrl from "../apiConfig";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
        
        dispatch(getMe());
    },[dispatch]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="navbar-container"
      style={{
        height: "102px",
        top: "31px",
        left: "39px",
        gap: "0px",
        borderRadius: "16px",
        opacity: "0px",
        backgroundColor: "#FFFFFF",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Left Section: Logo and Title */}
      <div style={{ display: "flex", alignItems: "center" ,gap: "30px"}}>
         <h2  style={{
            margin: 0,
            color: "#1400B9",
            fontFamily: "Averta-Semibold",
            fontSize: "28.16px",
            lineHeight: "32.99px",
            letterSpacing: "-0.02em",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none"
          }}>Dashboard</h2>
        <img src={cashflow_logo} alt="Logo" style={{ width:"180.39px", top:"45px", left:"255px",height: "73.97px", marginRight: "10px" }} />
        
      </div>

      {/* Right Section: Icons and Profile */}
      <div  style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flex: "1 1 auto",
          justifyContent: "flex-end",
          flexWrap: "wrap"
        }} >
        {(user?.role === "indicator" || user?.role === "admin") && (
        <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <img src={homeSvg} alt="home" style={{ width: "64px", cursor: "pointer" }} />
                <Ripple />
            </Link>
        )}
  
        {/* Notification Icon */}
        {/* <img src={notificationsIconSvg} alt="Notifications" style={{ width: "32px", cursor: "pointer" }} /> */}

           {/* Search users */}
          {(user?.role === "hcp") && (
            <Link to="/hcproviders" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
            <img src={homeSvg} alt="Search" style={{ width: "64px", cursor: "pointer" }} />

            <Ripple />
        </Link>
          )}

          {(user?.role === "admin") && (
           <Link to="/hcproviders" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <img src={hcprovidersIconSvg} alt="Search" style={{ width: "64px", cursor: "pointer" }} />

                <Ripple />
            </Link>
          )}
        {/* Settings Icon */}
        {/* <img src={settingsIconSvg} alt="Settings" style={{ width: "32px", cursor: "pointer" }} /> */}

        {/* Search users */}
          {(user?.role === "admin") && (
        <Link to="/users" style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <img src={usersIconSvg} alt="Search" style={{ width: "64px", cursor: "pointer" }} />

                <Ripple />
            </Link>
          )}

          {(user?.role !== "admin") && (
        <Link to= {`/simpleUser/edit/${user?.uuid}`} style={{ color: 'inherit', textDecoration: 'none' }} className="p-ripple p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
                <img src={usersIconSvg} alt="Search" style={{ width: "32px", cursor: "pointer" }} />

                <Ripple />
            </Link>
          )}
        {/* Search Icon */}
        {/* <img src={searchIconSvg} alt="Search" style={{ width: "32px", cursor: "pointer" }} /> */}

    
        {/* User Profile Avatar */}
        <div style={{display: 'flex',
    alignContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between' }}>
          <Avatar
            image={
              user?.profileImage
                ? `${apiBaseUrl}/${user?.profileImage}`
                : "https://via.placeholder.com/150"
            }
            shape="circle"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            style={{ cursor: "pointer" }}
          />
           <span style={{ fontFamily: "Averta-Semibold", fontSize: "16px", color: "#000" }}>
            {user && user.name}
          </span>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              {user && user.name} ({user && user.role})
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
