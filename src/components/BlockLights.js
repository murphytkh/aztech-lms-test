import "../resources/css/view-block-lights.css";

import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import HeaderIcon from "../resources/view/blocklights-header-icon.svg";
import Refresh from "../resources/view/blocklights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";
import Faults from "../resources/view/blocklights-faults.svg";
import On from "../resources/dashboard/icon-light-empty.svg";
import Off from "../resources/view/blocklights-off.svg";
import Dimmed from "../resources/view/blocklights-dimmed.svg";

function BlockLights(props)
{
    const blockData = useSelector((state) => state.blockData.value);

    const [total, setTotal] = useState(800000);
    const [faults, setFaults] = useState(40);
    const [on, setOn] = useState(80000);
    const [off, setOff] = useState(1000);
    const [dimmed, setDimmed] = useState(7000);

    function handleBlockRefresh()
    {
        console.log("block refresh");
    }

    function handleBlockInfo()
    {
        console.log("block info");
    }

    useEffect(() =>
    {
        let workTotal = 0;
        let workFaults = 0;
        let workOn = 0;
        let workOff = 0;
        let workDimmed = 0;

        blockData.floors.forEach((obj) => {
            workTotal += obj.lights.length;
        
            obj.lights.forEach((obj) => {
                if (obj.fault !== null)
                    workFaults += 1;
                if (obj.offline === "false")
                    workOn += 1;
                else
                    workOff += 1;
                if (obj.dimmed === "true")
                    workDimmed += 1;
            });
        });

        setTotal(workTotal);
        setFaults(workFaults);
        setOn(workOn);
        setOff(workOff);
        setDimmed(workDimmed);
    }, [blockData])

    return(
        <div className="card-container" id="medium">
            {/* header */}
            <div className="card-header" id="block-lights">
                <h1 className="header-text">LIGHTS IN THIS BLOCK</h1>
                <img alt="" src={HeaderIcon} className="header-icon"></img>
                <img 
                    alt="" 
                    src={Refresh} 
                    className="refresh" 
                    onClick={handleBlockRefresh}
                ></img>
                <div className="header-divider"></div>
                <img 
                    alt="" src={Info} 
                    className="info"
                    onClick={handleBlockInfo}
                ></img>
            </div>
            {/* dividing lines */}
            <div className="block-lights-divider" id="divider0"></div>
            <div className="block-lights-divider" id="divider1"></div>
            <div className="block-lights-divider" id="divider2"></div>
            {/* section labels */}
            <h1 className="block-lights-label" id="numlights">Total no. of Lights</h1>
            <h1 className="block-lights-label" id="faults">Lights Fault(s)</h1>
            <h1 className="block-lights-label" id="on">Turned On</h1>
            <h1 className="block-lights-label" id="off">Turned OFF</h1>
            <h1 className="block-lights-label" id="dimmed">Dimmed</h1>
            {/* section label icons */}
            <img alt="" src={Faults} className="block-lights-icon" id="faults"></img>
            <img alt="" src={On} className="block-lights-icon" id="on"></img>
            <img alt="" src={Off} className="block-lights-icon" id="off"></img>
            <img alt="" src={Dimmed} className="block-lights-icon" id="dimmed"></img>
            {/* section values */}
            <div className="block-lights-values">
                <div className="numlights">{total.toLocaleString()}</div>
                <div className="faults">{faults.toLocaleString()}</div>
                <div className="on">{on.toLocaleString()}</div>
                <div className="off">{off.toLocaleString()}</div>
                <div className="dimmed">{dimmed.toLocaleString()}</div>
            </div>
        </div>
    );
}

export default BlockLights;