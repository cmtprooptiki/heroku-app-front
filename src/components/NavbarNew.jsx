import React, { useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, reset, getMe } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import cashflow_logo from "../Images/whologo.png";
import project_logo from "../Images/health_IQ_low.png"
import hcprovidersIconSvg from "../icons/hcproviders.svg";
import usersIconSvg from "../icons/users.svg";
import homeSvg from "../icons/home.svg";
import apiBaseUrl from "../apiConfig";
import { useLocation } from "react-router-dom"; // Already mentioned
import OnlineUsers from '../components/indicators_components/OnlineUsers';

import "../css/navbar.css";
import { icon } from "@fortawesome/fontawesome-svg-core";

const NavbarNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const EditProfile = () => {
        navigate(`/simpleUser/edit/${user?.uuid}`);
    };

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };


    const location = useLocation();

const getPageTitle = () => {
    if (location.pathname === "/hcproviders") {
        return "Health Providers Registry";
    } else if (location.pathname === "/dashboard") {
        return "Q4ALL Indicators Registry";
    }
    return "Q4ALL Indicators Registry";
};
    const items = [
        {
            icon: () => (
                <span className="menu-icon-wrapper">
                <img src={homeSvg} alt="home" />
              </span>            ),
            // visible: user?.role === "indicator" || user?.role === "admin",
            visible: user?.role === "admin",

            className: 'top-level-icon',
            command: () => navigate("/dashboard")
        },
        {
            icon: () => (
                <span className="menu-icon-wrapper">
                <img src={hcprovidersIconSvg} alt="providers" className="menu-icon" />
                </span>

            ),
            // visible: user?.role === "admin" || user?.role === "hcp",
            visible: user?.role === "admin",
            className: 'top-level-icon',
            command: () => navigate("/hcproviders")
        },
        {
            icon: () => (
                <span className="menu-icon-wrapper">

                <img src={usersIconSvg} alt="users" className="menu-icon" />
                </span>
            ),
            visible: user?.role === "admin",
            className: 'top-level-icon',
            command: () => navigate("/users")
        },
        {
            template: (item, options) => (
                <div className="profile-section" onClick={options.onClick}>
                    {/* <Avatar
                        image={user?.profileImage ? `${apiBaseUrl}/${user?.profileImage}` : "https://via.placeholder.com/150"}
                        shape="circle"
                        size="large"
                    />
                    <span className="profile-name">{user?.role}</span> */}
                    {console.log("profile",user?.profileImage === "uploads\\default.png")}
                    {console.log(user?.profileImage)}
                    {console.log("uploads\\default.png")}
                    {user?.profileImage !== "uploads\\default.png" ? (
                        <Avatar
                            image={`${apiBaseUrl}/${user?.profileImage}`}
                            shape="circle"
                            size="large"
                        />
                    ) : (
                        <Avatar
                            label={user?.name?.charAt(0).toUpperCase()}
                            shape="circle"
                            size="large"
                            style={{ backgroundColor: "#d8d8d8", color: "#000", fontWeight: "bold" }}
                        />
                    )}

                </div>
            ),
            items: [
                {
                    template: () => (
                        <div className="dropdown-avatar">
                            {user?.profileImage !== "uploads\\default.png" ? (
                                <Avatar
                                    image={`${apiBaseUrl}/${user?.profileImage}`}
                                    shape="circle"
                                    size="large"
                                />
                            ) : (
                                <Avatar
                                    label={user?.name?.charAt(0).toUpperCase()}
                                    shape="circle"
                                    size="large"
                                    style={{ backgroundColor: "#d8d8d8", color: "#000", fontWeight: "bold" }}
                                />
                            )}
                            <div>
                                <div style={{fontWeight:"bold"}}>
                                    {user?.name} ({user?.role})
                                </div>
                                <div >
                                    {user?.email} 
                                </div>
                            </div>
                            
                        </div>
                    ),
                    disabled: true
                },
                // { label: `${user?.email} `, disabled: true },

                // { label: `${user?.name} (${user?.role})`, disabled: true },
                ...(user?.role !== "admin" ? [{ label: "Edit Profile", command: EditProfile,icon:"pi pi-user-edit",className: "logout-item" }] : []),
                { label: "Logout", command: logout ,icon:"pi pi-sign-out",  className: "logout-item"}
            ]
        }
    ];

    const startTemplate = (
        <div className="logo-section">
             <img src={project_logo} alt="projectlogo"  className="logo-project" />
             <img src={cashflow_logo} alt="Logo" className="logo-image" />
             <h2 className="dashboard-title">{getPageTitle()}</h2>
             <div className="online items-center align space-x-6">

            <OnlineUsers />
            </div>
             
           
        </div>
    );

    return (
        <div className="navbar-container">
            <Menubar
                model={items.filter(item => item.visible !== false)}
                start={startTemplate}
                className="custom-menubar"
            />
        </div>
    );
};
export default NavbarNew;
