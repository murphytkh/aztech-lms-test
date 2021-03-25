import "../resources/css/dashboard-datacharts.css";

import React, {useRef} from "react";

import DatachartsEnergyConsumption from "./DatachartsEnergyConsumption";

import CalendarIcon from "../resources/dashboard/datacharts-calendar-icon.svg";

function DashboardDatacharts(props)
{
    const node = useRef();

    function handleCalendarDropdown()
    {
        console.log("calendar dropdown clicked");
    }

    function placeholder() {}

    const CalendarDropdown =
    (
        <div ref = {node} className = "calendar-selector" onClick = {handleCalendarDropdown}>
            <h1 id = "date">DATE</h1>
            <h1 id = "choice">2021-02-23</h1>
            <img alt = "" src = {CalendarIcon}></img>
        </div>
    );

    return(
        <div className = "datacharts-page">
            {/* calendar dropdown box */}
            {props.lights && CalendarDropdown}
            {/* cards (this is hard-coded for now) */}
            <DatachartsEnergyConsumption />
            {/* buttons */}
            <div 
                className = "datacharts-page-btn"
                id = "cancel"
                onClick = {props.cancel}
            >
                CANCEL
            </div>
            <div
                className = "datacharts-page-btn"
                id = "submit"
                onClick = {placeholder}
            >
                SUBMIT
            </div>
        </div>
    );
}

export default DashboardDatacharts;