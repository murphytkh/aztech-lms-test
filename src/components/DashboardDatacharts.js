import "../resources/css/dashboard-datacharts.css";

import React, {useRef} from "react";
import {useSelector} from "react-redux";

import DatachartsEnergyConsumption from "./DatachartsEnergyConsumption";

import CalendarIcon from "../resources/datacharts/datacharts-calendar-icon.svg";

function DashboardDatacharts(props)
{
    const node = useRef();
    //const location = useSelector((state) => state.selectedLocation.value);
    //const area = useSelector((state) => state.selectedArea.value);
    //const block = useSelector((state) => state.selectedBlock.value);
    //const level = useSelector((state) => state.selectedLevel.value);
    const lights = useSelector((state) => state.selectedLights.value);

    function handleCalendarDropdown()
    {
        console.log("calendar dropdown clicked");
    }

    function placeholder() {}

    const CalendarDropdown =
    (
        <div ref={node} className="calendar-selector" onClick={handleCalendarDropdown}>
            <h1 id="date">DATE</h1>
            <h1 id="choice">2021-02-23</h1>
            <img alt="" src={CalendarIcon}></img>
        </div>
    );

    return(
        <div className="datacharts-page">
            {/* calendar dropdown box */}
            {lights && CalendarDropdown}
            {/* cards (this is hard-coded for now) */}
            <DatachartsEnergyConsumption />
            {/* buttons */}
            <div className="datacharts-page-btn" id="cancel" onClick={props.cancel}>
                CANCEL
            </div>
            <div className="datacharts-page-btn" id="submit" onClick={placeholder}>
                SUBMIT
            </div>
        </div>
    );
}

export default DashboardDatacharts;