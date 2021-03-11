import React from "react";

import HeaderImg from "../resources/dashboard/status header.svg";
import HeaderIcon from "../resources/dashboard/chart-area-solid.svg";

function DatachartsEnergyConsumption(props)
{
    return(
        <div className = "dashboard-page-datacharts-energyconsumption-container">
            <div className = "dashboard-page-datacharts-energyconsumption-header">
                <img alt = "" src = {HeaderIcon} className = "dashboard-page-energyconsumption-energyconsumption-icon"></img>
                <h1 className = "dashboard-page-datacharts-energyconsumption-header-text">ENERGY CONSUMPTION (kwH)</h1>
                <img alt = "" src = {HeaderImg} className = "dashboard-page-datacharts-energyconsumption-headerimg"></img>
            </div>
        </div>
    )
}

export default DatachartsEnergyConsumption;