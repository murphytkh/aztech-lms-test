import "../resources/css/datacharts-energy-consumption.css";

import React, {useState, useEffect} from "react";

import EnergyConsumptionOption from "./EnergyConsumptionOption";
import EnergyConsumptionGraph from "./EnergyConsumptionGraph";

import HeaderIcon from "../resources/dashboard/icon-chart.svg";
import ArrowDivider from "../resources/datacharts/datacharts-arrow-divider.svg";
import Arrow from "../resources/dashboard/icon-dropdown-down.svg";

const optionText = ["1D", "5D", "1M", "1Y", "3Y"];

function DatachartsEnergyConsumption(props)
{
    // 1D, 5D, 1M, 1Y, 3Y
    const [currDisplayOption, setCurrDisplayOption] = useState("1D");
    const [energyData, setEnergyData] = useState([]);

    useEffect(() =>
    {
        // simulate getting data
        const data0 = [
            {t: 59400, Present: 0.02},
            {t: 73800, Present: 0.035},
            {t: 88200, Present: 0.025},
            {t: 102600, Present: 0.042},
            {t: 117000, Present: 0.078},
            {t: 131400, Present: 0.07},
            {t: 145800, Present: 0.06},
        ];
        
        const data1 = [
            {t: 59400, Past: 0.005},
            {t: 73800, Past: 0.019},
            {t: 88200, Past: 0.018},
            {t: 102600, Past: 0.021},
            {t: 117000, Past: 0.017},
            {t: 131400, Past: 0.042},
            {t: 145800, Past: 0.048},
        ];

        const data2 = [
            {t: 1, Present: 0.29},
            {t: 2, Present: 0.31},
            {t: 3, Present: 0.19},
            {t: 4, Present: 0.39},
            {t: 5, Present: 0.35},
        ];
    
        const data3 = [
            {t: 1, Past: 0.25},
            {t: 2, Past: 0.31},
            {t: 3, Past: 0.29},
            {t: 4, Past: 0.23},
            {t: 5, Past: 0.17},
        ];

        const data4 = [
            {t: 1, Present: 1.9},
            {t: 2, Present: 2.34},
            {t: 3, Present: 2.18},
            {t: 4, Present: 2.45},
        ];
    
        const data5 = [
            {t: 1, Past: 2.6},
            {t: 2, Past: 2.5},
            {t: 3, Past: 1.79},
            {t: 4, Past: 2.22},
        ];

        const data6 = [
            {t: 1, Present: 8.79},
            {t: 2, Present: 6.98},
            {t: 3, Present: 7.12},
            {t: 4, Present: 7.89},
            {t: 5, Present: 8.3},
            {t: 6, Present: 8.01},
            {t: 7, Present: 7.5},
            {t: 8, Present: 7.68},
            {t: 9, Present: 7.48},
            {t: 10, Present: 6.54},
            {t: 11, Present: 9.3},
            {t: 12, Present: 8.87},
        ];

        const data7 = [
            {t: 1, Past: 7.45},
            {t: 2, Past: 7.5},
            {t: 3, Past: 7.32},
            {t: 4, Past: 6.89},
            {t: 5, Past: 8.72},
            {t: 6, Past: 8.21},
            {t: 7, Past: 9.02},
            {t: 8, Past: 9.1},
            {t: 9, Past: 7.923},
            {t: 10, Past: 6.89},
            {t: 11, Past: 6.93},
            {t: 12, Past: 8.64},
        ];

        const data8 = [
            {t: 1, Present: 79.98},
            {t: 2, Present: 90.273},
            {t: 3, Present: 85.46},
        ];
    
        const data9 = [
            {t: 1, Past: 85.23},
            {t: 2, Past: 92.21},
            {t: 3, Past: 89.59},
        ];

        setEnergyData([data0, data1, data2, data3, data4, data5, data6, data7,
                       data8, data9]);
    }, []);
    
    // create list of options
    const optionMap = optionText.map(option =>
        <EnergyConsumptionOption
            key={option}
            text={option}
            curr={currDisplayOption}
            set={setCurrDisplayOption}
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
                data={energyData} 
                option={currDisplayOption} 
                class="datacharts-graph-container"
            />
        </div>
    )
}

export default DatachartsEnergyConsumption;