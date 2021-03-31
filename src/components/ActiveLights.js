import "../resources/css/view-active-lights.css";

import React, {useState, useEffect} from "react";

import {ActiveLightObject} from "./Utility";

import HeaderIcon from "../resources/view/activelights-header-icon.svg";
import Refresh from "../resources/view/activelights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";

function ActiveLights(props)
{
    const [lightData, setLightData] = useState([]);

    const activeLightsList = lightData.map(light =>
        <tr key = {light.id}>
            <td className = "id"> {light.id} - {light.detections}</td>
            <td className = "date"> {light.date} </td>
            <td className = "time"> {light.time} </td>
            <td className = "stats"> {light.stats} </td>
        </tr>
    );

    useEffect(() =>
    {
        // simulate getting data
        let light0 = new ActiveLightObject("1.1.2", 1234, "2020-09-01", "12:55:55", "IN PROGRESS");
        let light1 = new ActiveLightObject("1.1.3", 1234, "2020-09-01", "13:55:55", "IN PROGRESS");
        let light2 = new ActiveLightObject("1.1.4", 1234, "2020-09-01", "14:55:55", "IN PROGRESS");
        let light3 = new ActiveLightObject("1.1.5", 1234, "2020-09-01", "15:55:55", "IN PROGRESS");
        let light4 = new ActiveLightObject("1.1.6", 1234, "2020-09-01", "16:55:55", "IN PROGRESS");
        let light5 = new ActiveLightObject("1.2.7", 1234, "2020-09-01", "17:55:55", "IN PROGRESS");
        let light6 = new ActiveLightObject("1.1.8", 1234, "2020-09-01", "18:55:55", "IN PROGRESS");
        let light7 = new ActiveLightObject("1.1.9", 1234, "2020-09-01", "19:55:55", "IN PROGRESS");
        let light8 = new ActiveLightObject("1.2.1", 1234, "2020-09-01", "20:55:55", "IN PROGRESS");

        setLightData([light0, light1, light2, light3, light4, light5, light6, light7, light8]);
    }, []);

    function handleActiveRefresh()
    {
        console.log("active refresh");
    }

    function handleActiveInfo()
    {
        console.log("active info");
    }

    return(
        <div className = "card-container" id = "medium">
            {/* header */}
            <div className = "card-header" id = "active-lights">
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                <h1 className = "header-text">MOST ACTIVE LIGHT(S)</h1>
                <img 
                    alt = "" 
                    src = {Refresh} 
                    className = "refresh"
                    onClick = {handleActiveRefresh}
                ></img>
                <div className = "header-divider"></div>
                <img 
                    alt = "" 
                    src = {Info} 
                    className = "info"
                    onClick = {handleActiveInfo}
                ></img>
            </div>
            {/* table */}
            {activeLightsList && 
                <div className = "active-lights-table">
                    <h1 className = "detections">DETECTIONS</h1>
                    <h1 className = "date">DATE</h1>
                    <h1 className = "time">TIME</h1>
                    <h1 className = "stats">STATS</h1>
                    <div className = "table-divider"></div>
                    <table><tbody>{activeLightsList}</tbody></table>
                </div>
            }
        </div>
    );
}

export default ActiveLights;