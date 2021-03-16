import "../resources/css/dashboard-sidebar.css";

import React from "react";
import {useLocation} from "react-router-dom";

function SidebarIcon(props)
{
    const location = useLocation();

    function handleClick()
    {
        props.onClick(props.path);
    }

    return(
        <div
            title = {props.tooltip}
            className = "icon"
            onClick = {handleClick}
        >
            {location.pathname === props.path ?
            <img alt = "" src = {props.selectedicon} className = "active"></img> :
            <img alt = "" src = {props.icon} className = "default"></img>}
        </div>
    );
}

export default SidebarIcon;