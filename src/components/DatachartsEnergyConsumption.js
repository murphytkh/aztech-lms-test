import "../resources/css/datacharts-energy-consumption.css";

import React from "react";
import {useSelector, useDispatch} from "react-redux";

import EnergyConsumptionOption from "./EnergyConsumptionOption";
import EnergyConsumptionGraph from "./EnergyConsumptionGraph";
import {setCurrGraphOption, setEnergyData} from "../redux/blockDataSlice";

import HeaderIcon from "../resources/dashboard/icon-chart.svg";
import ArrowDivider from "../resources/datacharts/datacharts-arrow-divider.svg";
import Arrow from "../resources/dashboard/icon-dropdown-down.svg";

const optionText = ["1D", "5D", "1M", "1Y", "3Y"];

function DatachartsEnergyConsumption(props)
{
    const dispatch = useDispatch();
    const currDisplayOption = useSelector((state) => state.currGraphOption.value);
    
    // create list of options
    const optionMap = optionText.map((option, i) =>
        <EnergyConsumptionOption
            key={i}
            text={option}
            curr={currDisplayOption}
            set={setOption}
        />
    );

    // arrow buttons (?)
    const displayArrows =
    (
        <div className="datacharts-arrow-container">
            <img alt="" src={Arrow} className="arrow"></img>
            <img alt="" src={ArrowDivider} className="divider"></img>
            <img alt="" src={Arrow} className="arrow"></img>
            <img alt="" src={ArrowDivider} className="divider"></img>
            <img alt="" src={Arrow} className="arrow"></img>
            <img alt="" src={ArrowDivider} className="divider"></img>
            <img alt="" src={Arrow} className="arrow"></img>
            <img alt="" src={ArrowDivider} className="divider"></img>
            <img alt="" src={Arrow} className="arrow"></img>
            <img alt="" src={ArrowDivider} className="divider"></img>
        </div>
    );

    function setOption(option)
    {
        if (option === currDisplayOption)
            return;

        dispatch(setEnergyData(null));
        dispatch(setCurrGraphOption(option));
    }

    return(
        <div className="card-container" id="full">
            {/* header */}
            <div className="card-header" id="datacharts-energy">
                <h1 className="header-text">ENERGY CONSUMPTION (KwH)</h1>
                <img alt="" src={HeaderIcon} className="header-icon"></img>
                {/* arrow buttons */}
                {displayArrows}
            </div>
            {/* present, past labels */}
            <div className="datacharts-label" id="label0">Present</div>
            <div className="datacharts-img" id="img0"></div>
            <div className="datacharts-label" id="label1">Past</div>
            <div className="datacharts-img" id="img1"></div>
            {/* graph */}
            <div className="datacharts-options">{optionMap}</div>
            <EnergyConsumptionGraph 
                option={currDisplayOption}
                class="datacharts-graph-container"
            />
        </div>
    )
}

export default DatachartsEnergyConsumption;