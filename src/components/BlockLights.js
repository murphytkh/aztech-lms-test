import "../resources/css/view-blocklights.css";

import React, {useState, useEffect} from "react";

import HeaderIcon from "../resources/view/blocklights-header-icon.svg";
import Refresh from "../resources/view/blocklights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";
import Faults from "../resources/view/blocklights-faults.svg";
import On from "../resources/dashboard/icon-light-empty.svg";
import Off from "../resources/view/blocklights-off.svg";
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
        <div className = "card-container" id = "medium">
            {/* header */}
            <div className = "card-header" id = "block-lights">
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
            {totalLights && lightsOn && lightsOff && lightsDimmed && lightFaults &&
                <div className = "block-lights-values">
                    <div className = "numlights">
                        <h1>{totalLights.toLocaleString()}</h1>
                    </div>
                    <div className = "faults">
                        <h1>{lightFaults.toLocaleString()}</h1>
                    </div>
                    <div className = "on">
                        <h1>{lightsOn.toLocaleString()}</h1>
                    </div>
                    <div className = "off">
                        <h1>{lightsOff.toLocaleString()}</h1>
                    </div>
                    <div className = "dimmed">
                        <h1>{lightsDimmed.toLocaleString()}</h1>
                    </div>
                </div>
            }
        </div>
    );
}

export default BlockLights;