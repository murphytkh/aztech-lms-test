import "../resources/css/dashboard-view.css";

import React, {useState, useEffect} from "react";

import {getBlockData, getActiveLightsData, getEnergyData, getStatusData,
        getActivityData, getGatewayData} from "./MockAPI";
import BlockLights from "./BlockLights";
import ActiveLights from "./ActiveLights";
import EnergyConsumption from "./EnergyConsumption";
import LightControl from "./LightControl";
import ActivityLog from "./ActivityLog";
import GatewayInfo from "./GatewayInfo";
import LightStatus from "./LightStatus";
import Relocation from "./Relocation";

import ExportButton from "../resources/view/view-export.svg";
import Map from "../resources/dashboard/map-sg.png";

function DashboardView(props)
{
    // store data used in cards
    const [blockData, setBlockData] = useState(null);
    const [activeLightsData, setActiveLightsData] = useState(null);
    const [energyData, setEnergyData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [gatewayData, setGatewayData] = useState(null);
    const [statusData, setStatusData] = useState(null);

    // current light relocation data
    const [currName, setCurrName] = useState("");
    const [currLocation, setCurrLocation] = useState("");

    useEffect(() =>
    {
        // simulate getting data
        setBlockData(getBlockData());
        setActiveLightsData(getActiveLightsData());
        setEnergyData(getEnergyData());
        setActivityData(getActivityData());
        setGatewayData(getGatewayData());
        setStatusData(getStatusData());
    }, []);

    // relocation pop-up handling
    function handleRelocationClick(name, location)
    {
        // toggle popup, update current selected light
        props.setRelocation();
        setCurrName(name);
        setCurrLocation(location);
    }

    // editing data
    function relocate(name, location)
    {
        let updatedArray = statusData.map(light =>
            {
                if (light.name === name)
                    return {...light, location: location};

                return light;
            });

        // modify data specific to status card for now
        setStatusData(updatedArray);
    }

    // export button (placeholder for now)
    function handleExportClick()
    {
        console.log("clicked export");
    }

    return(
        <div>
            {props.block ?
                <div className = "view-page">
                    {/* cards */}
                    {blockData && 
                    <BlockLights    
                        data = {blockData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />}
                    {activeLightsData && 
                    <ActiveLights    
                       data = {activeLightsData}
                       location = {props.location}
                       area = {props.area}
                       block = {props.block} 
                    />}
                    {energyData &&
                    <EnergyConsumption
                        data = {energyData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block}
                    />}
                    <LightControl
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    {activityData &&
                    <ActivityLog
                        data = {activityData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />}
                    {gatewayData &&
                    <GatewayInfo
                        data = {gatewayData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />}
                    {statusData &&
                    <LightStatus
                        data = {statusData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block}
                        relocation = {handleRelocationClick}
                    />}
                    {/* relocation popup - placed below due to css issues */}
                    {props.relocation && 
                        <Relocation
                            setRelocation = {props.setRelocation}
                            relocate = {relocate}
                            name = {currName}
                            location = {currLocation}
                        />
                    }
                    {/* export button */}
                    <img 
                        alt = "" 
                        src = {ExportButton} 
                        className = "export-btn"
                        onClick = {handleExportClick}
                    ></img>
                </div> :
                <div>
                    {props.location && <img alt = "" src = {Map} className = "map"></img>}
                </div>
            }
        </div>

    );
}

export default DashboardView;