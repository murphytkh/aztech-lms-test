import React from "react";
import {useLocation} from "react-router-dom";

import IconBG from "../resources/sidebar/sidebar-icon-bg.svg";

function SidebarIcon(props)
{
    const location = useLocation();

    function handleClick()
    {
        props.onClick(props.path);
    }

    return(
        <div
            title = {props.tooltip} className = "icon" onClick = {handleClick}>
            <img 
                alt = "" 
                src = {location.pathname === props.path ? props.active : props.default} 
                className = "base"
            ></img>
            {location.pathname === props.path &&
            <img alt = "" src = {IconBG} className = "bg"></img>}
        </div>
    );
}

export default SidebarIcon;