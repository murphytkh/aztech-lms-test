import "../resources/css/dashboarddatacharts.css";

import React, {useState, useEffect, useRef} from "react";

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
        <div 
            ref = {node} 
            className = "dashboard-page-datacharts-dropdown"
            onClick = {handleCalendarDropdown}>
            <h1 className = "dashboard-page-datacharts-dropdown-titletext">
                DATE
            </h1>
            <h1 className = "dashboard-page-datacharts-dropdown-choicetext">
                2021-02-23
            </h1>
            <img
                alt = ""
                src = {CalendarIcon}
                className = "dashboard-page-datacharts-dropdown-icon">
            </img>
        </div>
    );

    return(
        <div className = "dashboard-page-datacharts">
            {/* calendar dropdown box */}
            {props.lights && CalendarDropdown}
            <DatachartsEnergyConsumption />
            {/* buttons */}
            <div 
                className = "dashboard-page-datacharts-cancel" 
                onClick = {props.cancel}
            >
                CANCEL
            </div>
            <div
                className = "dashboard-page-datacharts-submit" 
                onClick = {placeholder}
            >
                SUBMIT
            </div>
        </div>
    );
}

export default DashboardDatacharts;