import "../resources/css/dashboard-sidebar.css";

import React from "react";
import {useHistory, useLocation} from "react-router-dom";

import SidebarToggleButton from "../resources/dashboard/menu_icon.svg";
import SidebarLogo from "../resources/dashboard/Aztech logo 2020.svg";
import DashboardIcon from "../resources/dashboard/icon-dashboard.svg";
import DashboardSelectedIcon from "../resources/dashboard/icon-dashboard-selected.svg";
import ConfigIcon from "../resources/dashboard/icon-config.svg";
import ConfigSelectedIcon from "../resources/dashboard/icon-config-selected.svg";
import PhotosensorIcon from "../resources/dashboard/icon-photosensor.svg";
import PhotosensorSelectedIcon from "../resources/dashboard/icon-photosensor-selected.svg";
import DatachartsIcon from "../resources/dashboard/icon-datacharts.svg";
import DatachartsSelectedIcon from "../resources/dashboard/icon-datacharts-selected.svg";
import LightCycleIcon from "../resources/dashboard/icon-lightcycle.svg";
import LightCycleSelectedIcon from "../resources/dashboard/icon-lightcycle-selected.svg";
import UsersIcon from "../resources/dashboard/icon-users.svg";
import UsersSelectedIcon from "../resources/dashboard/icon-users-selected.svg";
import LibraryAddIcon from "../resources/dashboard/icon-add.svg";
import LibraryAddSelectedIcon from "../resources/dashboard/icon-add-selected.svg";

import Timestamp from "./Timestamp";
import SidebarIcon from "./SidebarIcon";

function Sidebar(props)
{
    const history = useHistory();
    const location = useLocation();

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

        var dm = document.getElementsByClassName("dashboard-page-sidebar-icon-darkmode-circle");

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
                <img alt = "" src = {SidebarToggleButton}></img>
            </button>
            {/* logo */}
            <img alt = "" src = {SidebarLogo} className = "logo"></img>
            {/* sidebar buttons */}
            <div className = "icon-container">
                <SidebarIcon 
                    onClick = {handleSidebarButton}
                    path = "/dashboard/view" 
                    icon = {DashboardIcon} 
                    selectedicon = {DashboardSelectedIcon} 
                    tooltip = "Dashboard"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/config" 
                    icon = {ConfigIcon}
                    selectedicon = {ConfigSelectedIcon}
                    tooltip = "Configuration"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/photosensor" 
                    icon = {PhotosensorIcon}
                    selectedicon = {PhotosensorSelectedIcon}
                    tooltip = "Photosensor"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/datacharts" 
                    icon = {DatachartsIcon}
                    selectedicon = {DatachartsSelectedIcon} 
                    tooltip = "Data charts"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/lightcycle" 
                    icon = {LightCycleIcon}
                    selectedicon = {LightCycleSelectedIcon} 
                    tooltip = "LightCycle"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/usermanagement" 
                    icon = {UsersIcon}
                    selectedicon = {UsersSelectedIcon} 
                    tooltip = "Users"
                ></SidebarIcon>
                <SidebarIcon 
                    onClick = {handleSidebarButton} 
                    path = "/dashboard/add" 
                    icon = {LibraryAddIcon}
                    selectedicon = {LibraryAddSelectedIcon}
                    tooltip = "Add"
                ></SidebarIcon>
            </div>
            {/* dark mode toggle button */}
            <div
                title = "Dark Mode"
                className = "dashboard-page-sidebar-darkmode-container"
                onClick = {handleSidebarDarkModeToggle}
            >
                <div className = "dashboard-page-sidebar-icon-darkmode-circle"></div>
            </div>
            {/* bottom text */}
            <div className = "dashboard-page-sidebar-bottomtext">
                <Timestamp />
                {props.version != null && 
                <h1 className = "dashboard-page-sidebar-bottomtext-versiontext">VER {props.version}</h1>}
            </div>
        </div>
    );
}

export default Sidebar;