import "../resources/css/view-blocklights.css";

import React, {useState, useEffect} from "react";

import Header from "../resources/view/blocklights-header-bg.svg";
import HeaderIcon from "../resources/view/blocklights-header-icon.svg";
import Refresh from "../resources/view/blocklights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";
import Faults from "../resources/view/blocklights-faults.svg";
import On from "../resources/dashboard/Icon material-lightbulb-outline.svg";
import Off from "../resources/dashboard/Icon material-lightbulb-filled.svg";
import Dimmed from "../resources/view/blocklights-dimmed.svg";

function BlockLights(props)
{
    const [totalLights, setTotalLights] = useState(null);
    const [lightsOn, setLightsOn] = useState(null);
    const [lightsOff, setLightsOff] = useState(null);
    const [lightsDimmed, setLightsDimmed] = useState(null);
    const [lightFaults, setLightFaults] = useState(null);

    useEffect(() =>
    {
        // simulate getting data
        setTotalLights(800000);
        setLightFaults(40);
        setLightsOn(80000);
        setLightsOff(1000);
        setLightsDimmed(7000);
    }, []);

    function handleBlockRefresh()
    {
        console.log("block refresh");
    }

    function handleBlockInfo()
    {
        console.log("block info");
    }

    return(
        <div className = "medium-container" id = "top-left">
            {/* header */}
            <div className = "medium-header">
                <img alt = "" src = {Header} className = "bg"></img>
                <h1 className = "header-text">LIGHTS IN THIS BLOCK</h1>
                <img alt = "" src = {HeaderIcon} className = "icon"></img>
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
            <div className = "divider0" id = "blocklights"></div>
            <div className = "divider1" id = "blocklights"></div>
            <div className = "divider2" id = "blocklights"></div>
            {/* section labels */}
            <h1 className = "text-numlights">Total no. of Lights</h1>
            <h1 className = "text-faults">Lights Fault(s)</h1>
            <h1 className = "text-on">Turned On</h1>
            <h1 className = "text-off">Turned OFF</h1>
            <h1 className = "text-dimmed">Dimmed</h1>
            {/* section label icons */}
            <img alt = "" src = {Faults} className = "faults"></img>
            <img alt = "" src = {On} className = "on"></img>
            <img alt = "" src = {Off} className = "off"></img>
            <img alt = "" src = {Dimmed} className = "dimmed"></img>
            {/* section values */}
            {totalLights && lightsOn && lightsOff && lightsDimmed && lightFaults &&
                <div className = "blocklights-value-container">
                    <div className = "numlights">
                        <h1 className = "blocklights-value">{totalLights.toLocaleString()}</h1>
                    </div>
                    <div className = "faults">
                        <h1 className = "blocklights-value">{lightFaults.toLocaleString()}</h1>
                    </div>
                    <div className = "on">
                        <h1 className = "blocklights-value">{lightsOn.toLocaleString()}</h1>
                    </div>
                    <div className = "off">
                        <h1 className = "blocklights-value">{lightsOff.toLocaleString()}</h1>
                    </div>
                    <div className = "dimmed">
                        <h1 className = "blocklights-value">{lightsDimmed.toLocaleString()}</h1>
                    </div>
                </div>
            }
            <div className = "border"></div>
        </div>
    );
}

export default BlockLights;