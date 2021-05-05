import "../resources/css/view-energy-consumption.css";

import React, {useEffect, useState} from "react";
//import {useSelector} from "react-redux";

import {getEnergyData} from "./MockAPI";

import EnergyIcon from "../resources/dashboard/icon-chart.svg";

import EnergyConsumptionOption from "./EnergyConsumptionOption";
import EnergyConsumptionGraph from "./EnergyConsumptionGraph";

const optionText = ["1D", "5D", "1M", "1Y", "3Y"];

function EnergyConsumption(props)
{
    //const activeLightsData = useSelector((state) => state.blockData.value);
    const [data, setData] = useState([]);

    // 1D, 5D, 1M, 1Y, 3Y
    const [currDisplayOption, setCurrDisplayOption] = useState("1D");

    // options for viewing graph
    const optionMap = optionText.map((option, i) =>
        <EnergyConsumptionOption
            key={i}
            text={option}
            curr={currDisplayOption}
            set={setCurrDisplayOption}
        />
    );

    useEffect(() => {
        setData(getEnergyData());
    }, []);

    return(
        <div className="card-container" id="medium">
            {/* header */}
            <div className="card-header" id="energy-consumption">
                <h1 className="header-text">ENERGY CONSUMPTION</h1>
                <img alt="" src={EnergyIcon} className="header-icon"></img>
            </div>
            {/* present, past labels */}
            <div className="energy-consumption-label" id="label0">Present</div>
            <div className="energy-consumption-img" id="img0"></div>
            <div className="energy-consumption-label" id="label1">Past</div>
            <div className="energy-consumption-img" id="img1"></div>
            {/* graph */}
            <div className="energy-options-container">{optionMap}</div>
            <EnergyConsumptionGraph 
                data={data} 
                option={currDisplayOption}
                class="graph-container"
            />
        </div>
    );
}

export default EnergyConsumption;