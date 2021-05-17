import "../resources/css/dashboard-view.css";

import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {setRelocation} from "../redux/dashboardUISlice";
import {setStatusData} from "../redux/blockDataSlice";
import {setGatewayData} from "../redux/miscInfoSlice";

import {getStatusData, getGatewayData} from "./MockAPI";
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
    const dispatch = useDispatch();

    // redux store data
    const locationData = useSelector((state) => state.locationData.value);
    const blockData = useSelector((state) => state.blockData.value);
    const statusData = useSelector((state) => state.statusData.value);
    const gatewayData = useSelector((state) => state.gatewayData.value);
    //const location = useSelector((state) => state.selectedLocation.value);
    const area = useSelector((state) => state.selectedArea.value);
    const block = useSelector((state) => state.selectedBlock.value);
    const relocation = useSelector((state) => state.relocation.value);

    // current light relocation data
    const [currName, setCurrName] = useState("");
    const [currLocation, setCurrLocation] = useState("");

    useEffect(() =>
    {
        // simulate getting data
        dispatch(setGatewayData(getGatewayData()));
        dispatch(setStatusData(getStatusData()));
    }, [dispatch, area, block, locationData]);

    // relocation pop-up handling
    function handleRelocationClick(name, location)
    {
        // toggle popup, update current selected light
        dispatch(setRelocation(!relocation));
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
        dispatch(setStatusData(updatedArray));
    }

    // export button (placeholder for now)
    function handleExportClick()
    {
        console.log("clicked export");
    }

    return(
        // check if block is selected before displaying panels
        <div>
            {block ?
                <div className="view-page">
                    {/* panels */}
                    {/* placeholder loading ui */}
                    {!blockData && area && block &&
                        <div style={{fontSize: "20px"}}>
                            Please wait, loading data...
                        </div>
                    }
                    {blockData && <BlockLights />}
                    {blockData && <ActiveLights />}
                    {blockData && <EnergyConsumption />}
                    {blockData && <LightControl />}
                    {blockData && <ActivityLog />}
                    {gatewayData && <GatewayInfo data={gatewayData} />}
                    {blockData && statusData && 
                        <LightStatus 
                            data={statusData}
                            relocation={handleRelocationClick} 
                        />
                    }
                    {/* relocation popup - placed below due to css issues */}
                    {relocation && 
                        <Relocation
                            relocate={relocate}
                            name={currName}
                            location={currLocation}
                        />
                    }
                    {/* export button */}
                    <img 
                        alt="" 
                        src={ExportButton} 
                        className="export-btn"
                        onClick={handleExportClick}
                    ></img>
                </div> :
                <div>{<img alt="" src={Map} className="map"></img>}</div>
            }
        </div>

    );
}

export default DashboardView;