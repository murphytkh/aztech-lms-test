import "../resources/css/view-active-lights.css";

import React, {useState, useEffect} from "react";
//import {useSelector} from "react-redux";

import {getActiveLightsData} from "./MockAPI";

import HeaderIcon from "../resources/view/activelights-header-icon.svg";
import Refresh from "../resources/view/activelights-refresh.svg";
import Info from "../resources/dashboard/icon-info.svg";

function ActiveLights(props)
{
    //const blockData = useSelector((state) => state.blockData.value);
    const [data, setData] = useState([]);

    const activeLightsList = data.map(light =>
        <tr key={light.id}>
            <td className="id"> {light.id} - {light.detections}</td>
            <td className="date"> {light.date} </td>
            <td className="time"> {light.time} </td>
            <td className="stats"> {light.stats} </td>
        </tr>
    );

    // button placeholders
    function handleActiveRefresh()
    {
        console.log("active refresh");
    }

    function handleActiveInfo()
    {
        console.log("active info");
    }

    useEffect(() =>
    {
        setData(getActiveLightsData());
    }, []);

    return(
        <div className="card-container" id="medium">
            {/* header */}
            <div className="card-header" id="active-lights">
                <img alt="" src={HeaderIcon} className="header-icon"></img>
                <h1 className="header-text">MOST ACTIVE LIGHT(S)</h1>
                <img 
                    alt="" 
                    src={Refresh} 
                    className="refresh"
                    onClick={handleActiveRefresh}
                ></img>
                <div className="header-divider"></div>
                <img 
                    alt="" 
                    src={Info} 
                    className="info"
                    onClick={handleActiveInfo}
                ></img>
            </div>
            {/* table */}
            <div className="active-lights-table">
                <h1 className="detections">DETECTIONS</h1>
                <h1 className="date">DATE</h1>
                <h1 className="time">TIME</h1>
                <h1 className="stats">STATS</h1>
                <div className="table-divider"></div>
                <table><tbody>{activeLightsList}</tbody></table>
            </div>
        </div>
    );
}

export default ActiveLights;