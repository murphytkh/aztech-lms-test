import "../resources/css/dashboard-sidebar.css";

import React from "react";
import {useHistory, useLocation} from "react-router-dom";

import Toggle from "../resources/sidebar/sidebar-toggle.svg";
import SidebarLogo from "../resources/sidebar/sidebar-logo.svg";
import Dashboard from "../resources/sidebar/sidebar-dashboard.svg";
import DashboardActive from "../resources/sidebar/sidebar-dashboard-active.svg";
import Config from "../resources/sidebar/sidebar-config.svg";
import ConfigActive from "../resources/sidebar/sidebar-config-active.svg";
import Photosensor from "../resources/sidebar/sidebar-photosensor.svg";
import PhotosensorActive from "../resources/sidebar/sidebar-photosensor-active.svg";
import Datacharts from "../resources/sidebar/sidebar-datacharts.svg";
import DatachartsActive from "../resources/sidebar/sidebar-datacharts-active.svg";
import LightCycle from "../resources/sidebar/sidebar-lightcycle.svg";
import LightCycleActive from "../resources/sidebar/sidebar-lightcycle-active.svg";
import UserManagement from "../resources/sidebar/sidebar-usermanagement.svg";
import UserManagementActive from "../resources/sidebar/sidebar-usermanagement-active.svg";
import Add from "../resources/sidebar/sidebar-add.svg";
import AddActive from "../resources/sidebar/sidebar-add-active.svg";

import Timestamp from "./Timestamp";
import SidebarIcon from "./SidebarIcon";

function Sidebar(props)
{
    const history = useHistory();
    const location = useLocation();

    // sliding animations
    function sidebarToggle()
    {
        var sb = document.getElementsByClassName("sidebar");

        if (sb[0].style.transform === "translate3d(-100%, 0px, 0px)")
            sb[0].style.transform = "translate3d(0%, 0px, 0px)";
        else
            sb[0].style.transform = "translate3d(-100%, 0px, 0px)";
    }

    function handleSidebarDarkModeToggle()
    {
        props.setDarkMode(!props.darkMode);

        var dm = document.getElementsByClassName("darkmode-circle");

        if (dm[0].style.transform === "translate(70%, -35%)")
            dm[0].style.transform = "translate(-25%, -35%)";
        else
            dm[0].style.transform = "translate(70%, -35%)";
    }

    function goToPath(path)
    {
        if(location.pathname !== path)
            history.push(path);
    }

    function handleSidebarButton(path)
    {
        goToPath(path);
    }

    return(
        <div className = "sidebar">
            {/* path buttons */}
            {props.pathHelper()}
            {/* sidebar toggle button */}
            <button 
                onClick = {sidebarToggle} 
                className = "toggle">
                <img alt = "" src = {Toggle}></img>
            </button>
            {/* logo */}
            <img alt = "" src = {SidebarLogo} className = "logo"></img>
            {/* sidebar buttons */}
            <div className = "icon-container">
                <SidebarIcon 
                    onClick = {handleSidebarButton}
                    path = "/dashboard/view" 
                    default = {Dashboard} 
                    active = {DashboardActive} 
                    tooltip = "Dashboard"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/config" 
                    default = {Config}
                    active = {ConfigActive}
                    tooltip = "Configuration"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/photosensor" 
                    default = {Photosensor}
                    active = {PhotosensorActive}
                    tooltip = "Photosensor"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/datacharts" 
                    default = {Datacharts}
                    active = {DatachartsActive} 
                    tooltip = "Data charts"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/placeholder" 
                    default = {LightCycle}
                    active = {LightCycleActive} 
                    tooltip = "Placeholder"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/usermanagement" 
                    default = {UserManagement}
                    active = {UserManagementActive} 
                    tooltip = "Users"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/add" 
                    default = {Add}
                    active = {AddActive}
                    tooltip = "Add"
                ></SidebarIcon>
            </div>
            {/* dark mode toggle button */}
            <div
                title = "Dark Mode"
                className = "darkmode-container"
                onClick = {handleSidebarDarkModeToggle}
            >
                <div className = "darkmode-circle"></div>
            </div>
            {/* bottom text */}
            <div className = "text-container">
                <Timestamp />
                {props.version != null && 
                <h1 className = "version">VER {props.version}</h1>}
            </div>
        </div>
    );
}

export default Sidebar;