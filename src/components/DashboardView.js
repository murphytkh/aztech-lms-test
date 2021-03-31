import "../resources/css/dashboard-view.css";

import React, {useState, useEffect} from "react";

import ExportButton from "../resources/view/view-export.svg";
import Map from "../resources/dashboard/map-sg.png";

import BlockLights from "./BlockLights";
import ActiveLights from "./ActiveLights";
import EnergyConsumption from "./EnergyConsumption";
import LightControl from "./LightControl";
import ActivityLog from "./ActivityLog";
import GatewayInfo from "./GatewayInfo";
import LightStatus from "./LightStatus";
import Relocation from "./Relocation";

// objects to manage data
class LightStatusObject
{
    constructor(name, location, date, time, status)
    {
        this.name = name;
        this.location = location;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}

function DashboardView(props)
{
    // store data used in cards
    const [viewData, setViewData] = useState([]);

    // current light relocation data
    const [currName, setCurrName] = useState("");
    const [currLocation, setCurrLocation] = useState("");

    // relocation pop up
    //const [relocation, setRelocation] = useState(false);

    useEffect(() =>
    {
        // simulate getting data for lightstatus
        var a = [];

        a.push(new LightStatusObject("1.1.1", "Front row, nearest to HR", "2020-09-01", "17:44:00", "ON"));
        a.push(new LightStatusObject("1.1.2", "Location undefined", "2020-09-02", "17:44:01", "OFF"));
        a.push(new LightStatusObject("1.1.3", "Location undefined", "2020-09-03", "17:44:03", "ON"));
        a.push(new LightStatusObject("1.1.4", "Location undefined", "2020-09-04", "17:44:04", "ON"));
        a.push(new LightStatusObject("1.1.5", "Location undefined", "2020-09-05", "17:44:05", "OFF"));
        a.push(new LightStatusObject("1.1.6", "Location undefined", "2020-09-06", "17:44:06", "ON"));
        a.push(new LightStatusObject("1.1.7", "Location undefined", "2020-09-07", "17:44:07", "OFF"));
        a.push(new LightStatusObject("1.1.8", "Location undefined", "2020-09-08", "17:44:08", "ON"));
        a.push(new LightStatusObject("1.1.9", "Location undefined", "2020-09-09", "17:44:09", "OFF"));
        a.push(new LightStatusObject("1.2.1", "Location undefined", "2020-09-10", "17:44:10", "ON"));
        a.push(new LightStatusObject("1.2.2", "Location undefined", "2020-09-11", "17:44:11", "OFF"));
        a.push(new LightStatusObject("1.2.3", "Location undefined", "2020-09-12", "17:44:12", "ON"));
        a.push(new LightStatusObject("1.2.4", "Location undefined", "2020-09-13", "17:44:13", "OFF"));
        a.push(new LightStatusObject("1.2.5", "Location undefined", "2020-09-14", "17:44:14", "ON"));
        a.push(new LightStatusObject("1.2.6", "Location undefined", "2020-09-15", "17:44:15", "OFF"));
        a.push(new LightStatusObject("1.2.7", "Location undefined", "2020-09-16", "17:44:16", "ON"));
        a.push(new LightStatusObject("1.2.8", "Location undefined", "2020-09-17", "17:44:17", "OFF"));
        a.push(new LightStatusObject("1.2.9", "Location undefined", "2020-09-18", "17:44:18", "ON"));
        a.push(new LightStatusObject("1.3.1", "Location undefined", "2020-09-19", "17:44:19", "OFF"));
        a.push(new LightStatusObject("1.3.2", "Location undefined", "2020-09-20", "17:44:20", "ON"));
        a.push(new LightStatusObject("1.3.3", "Location undefined", "2020-09-21", "17:44:21", "OFF"));
        a.push(new LightStatusObject("1.3.4", "Location undefined", "2020-09-22", "17:44:22", "ON"));
        a.push(new LightStatusObject("1.3.5", "Location undefined", "2020-09-23", "17:44:23", "OFF"));
        a.push(new LightStatusObject("1.3.6", "Location undefined", "2020-09-24", "17:44:24", "ON"));
        // 24

        // + 40
        for (var i = 0; i < 40; ++i)
            a.push(new LightStatusObject("1.4." + i.toString(), "Location undefined", 
                                         "2020-09-25", "17:44:25", (i % 2) ? "ON" : "OFF"));
        
        setViewData(a);
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
                    <BlockLights    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <ActiveLights    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <EnergyConsumption    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <LightControl    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <ActivityLog    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <GatewayInfo    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <LightStatus
                        data = {viewData}
                        location = {props.location}
                        area = {props.area}
                        block = {props.block}
                        relocation = {handleRelocationClick}
                    />
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