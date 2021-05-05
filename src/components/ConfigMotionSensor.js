import "../resources/css/config-motion-sensor.css";

import React, {useState, useRef} from "react";
import {useSelector} from "react-redux";

import GenericDropdown from "./GenericDropdown";

import HeaderIcon from "../resources/dashboard/icon-motion-black.svg";
import InfoIcon from "../resources/dashboard/icon-question-mark.svg";

function ConfigMotionSensor(props)
{
    const msRef = useRef();

    const lights = useSelector((state) => state.selectedLights.value);
    const [option, setOption] = useState("Medium-High");

    // sliding animation
    function handleMSButton()
    {
        var circle = document.querySelector(".card-toggle-btn#motion-sensor .circle");
        var container = document.querySelector(".card-toggle-btn#motion-sensor");
        // turn on
        if (circle.style.transform === "translate(-10%, 0%)")
        {
            circle.style.transform = "translate(75%, 0%)";
            circle.style.border = "1px solid #005570";
            container.style.backgroundColor = "#005570";
            props.setMD("ON");
        }
        // turn off
        else
        {
            circle.style.transform = "translate(-10%, 0%)";
            circle.style.border = "1px solid #000000";
            container.style.backgroundColor = "#333132";
            props.setMD("OFF");
        }
    }

    function selectOptionHelper(ms)
    {
        props.setMS(ms);
        setOption(ms);
    }

    return(
        <div className="card-container" id="small">
            {/* header */}
            <div className="card-header" id="motion-sensor">
                <h1 className="header-text">MOTION SENSOR</h1>
                <img alt="" src={HeaderIcon} className="header-icon"></img>
                {/* header button(s) */}
                <div
                    className="card-toggle-btn"
                    id="motion-sensor"
                    style={lights ? {opacity: 1.0} : {pointerEvents: "none", opacity: 0.3}}
                    onClick={handleMSButton}
                >
                    <div className="circle"></div>
                </div>
            </div>
            {/* dropdown label */}
            <div className="card-label" id="label0">SENSITIVITY</div>
            {/* info icon */}
            <img 
                title="Higher sensitivity allows for easier triggering of motion sensor." 
                alt="" 
                src={InfoIcon}
                className="card-info"
                id="motion-sensor-info0"
            ></img>
            {/* dropdown list */}
            <div className="card-dropdown" id="motion-sensor-dd0" style={{zIndex: 1}}>
                <GenericDropdown
                    ref={msRef}
                    default={option}
                    options={["High", "Medium-High", "Medium", "Medium-Low", "Low"]}
                    selectOption={selectOptionHelper}
                    disabled={props.MD === "ON" && lights ? false : true}
                ></GenericDropdown>
            </div>
        </div>
    );
}

export default ConfigMotionSensor;