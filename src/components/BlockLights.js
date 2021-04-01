import "../resources/css/view-block-lights.css";

import React from "react";

import HeaderIcon from "../resources/view/blocklights-header-icon.svg";
import Refresh from "../resources/view/blocklights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";
import Faults from "../resources/view/blocklights-faults.svg";
import On from "../resources/dashboard/icon-light-empty.svg";
import Off from "../resources/view/blocklights-off.svg";
import Dimmed from "../resources/view/blocklights-dimmed.svg";

function BlockLights(props)
{
    function handleBlockRefresh()
    {
        console.log("block refresh");
    }

    function handleBlockInfo()
    {
        console.log("block info");
    }

    return(
        <div className = "card-container" id = "medium">
            {/* header */}
            <div className = "card-header" id = "block-lights">
                <h1 className = "header-text">LIGHTS IN THIS BLOCK</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                <img 
                    alt = "" 
                    src = {Refresh} 
                    className = "refresh" 
                    onClick = {handleBlockRefresh}
                ></img>
                <div className = "header-divider"></div>
                <img 
                    alt = ""  src = {Info} 
                    className = "info"
                    onClick = {handleBlockInfo}
                ></img>
            </div>
            {/* dividing lines */}
            <div className = "block-lights-divider" id = "divider0"></div>
            <div className = "block-lights-divider" id = "divider1"></div>
            <div className = "block-lights-divider" id = "divider2"></div>
            {/* section labels */}
            <h1 className = "block-lights-label" id = "numlights">Total no. of Lights</h1>
            <h1 className = "block-lights-label" id = "faults">Lights Fault(s)</h1>
            <h1 className = "block-lights-label" id = "on">Turned On</h1>
            <h1 className = "block-lights-label" id = "off">Turned OFF</h1>
            <h1 className = "block-lights-label" id = "dimmed">Dimmed</h1>
            {/* section label icons */}
            <img alt = "" src = {Faults} className = "block-lights-icon" id = "faults"></img>
            <img alt = "" src = {On} className = "block-lights-icon" id = "on"></img>
            <img alt = "" src = {Off} className = "block-lights-icon" id = "off"></img>
            <img alt = "" src = {Dimmed} className = "block-lights-icon" id = "dimmed"></img>
            {/* section values */}
            <div className = "block-lights-values">
                <div className = "numlights">
                    <h1>{props.data.get("total").toLocaleString()}</h1>
                </div>
                <div className = "faults">
                    <h1>{props.data.get("faults").toLocaleString()}</h1>
                </div>
                <div className = "on">
                    <h1>{props.data.get("on").toLocaleString()}</h1>
                </div>
                <div className = "off">
                    <h1>{props.data.get("off").toLocaleString()}</h1>
                </div>
                <div className = "dimmed">
                    <h1>{props.data.get("dimmed").toLocaleString()}</h1>
                </div>
            </div>
        </div>
    );
}

export default BlockLights;