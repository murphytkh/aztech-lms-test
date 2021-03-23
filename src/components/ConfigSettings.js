import "../resources/css/config-settings.css";

import React, {useState, useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";

import HeaderIcon from "../resources/config/settings-header-icon.svg";
import InfoIcon from "../resources/dashboard/icon-question-mark.svg";
import RadioButtonOff from "../resources/dashboard/icon-radio-button-off.svg";
import RadioButtonOn from "../resources/dashboard/icon-radio-button-on.svg";

let ddTime = Array.from({length: 60}, (_, i) => i + 1);

function ConfigSettings(props)
{
    const ddRef = useRef();

    const [selectedIntensity, setSelectedIntensity] = useState("Fast");
    const [selectedHoldTime, setSelectedHoldTime] = useState("15");
    const [selectedHoldTimeUnits, setSelectedHoldTimeUnits] = useState("Seconds");

    useEffect(() =>
    {
        // simulate getting data

    }, []);

    function handleRadioButton()
    {
        if (props.sync === "ON")
            props.setSync("OFF");
        else
            props.setSync("ON");
    }

    function placeholder() {}

    function setLightIntensityHelper(light)
    {
        props.setIntensity(light);
        setSelectedIntensity(light);
    }

    function setHoldTimeHelper(time)
    {
        props.setHoldTime(time);
        setSelectedHoldTime(time);
    }

    function setHoldTimeUnitsHelper(units)
    {
        props.setHoldTimeUnits(units);
        setSelectedHoldTimeUnits(units);
    }

    return(
        <div className = "card-container" id = "small">
            {/* header */}
            <div className = "card-header" id = "settings">
                <h1 className = "header-text">SETTINGS</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
            </div>
            {/* info icons */}
            <img 
                title = "Sync device clock to PC clock."
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "settings-info0"
            ></img>
            <img 
                title = "Brightness transition speed."
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "settings-info1"
            ></img>
            <img 
                title = "Amount of time to stay in triggered brightness."
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "settings-info2"
            ></img>
            {/* labels */}
            <div className = "card-label" id = "label0">SYNCHRONIZE</div>
            <div className = "card-label" id = "label1">LIGHT INTENSITY</div>
            <div className = "card-label" id = "label2">HOLD-TIME</div>
            {/* radio button text */}
            <div 
                className = "clock-radio-text" 
                style = {props.lights ? {opacity: 1.0} : {opacity: 0.5}}
            >
                Clock
            </div>
            {/* radio button */}
            <img 
                alt = "" 
                src = {props.sync === "ON" ? RadioButtonOn : RadioButtonOff} 
                className = "clock-radio"
                style = {props.lights ? {opacity: 1.0, cursor: "pointer"} : {opacity: 0.5, cursor: "default"}}
                onClick = {props.lights ? handleRadioButton : placeholder}
            ></img>
            {/* dropdown lists */}
            <div className = "card-dropdown" id = "settings-dd0" style = {{zIndex: 11}}>
                <GenericDropdown
                    ref = {ddRef}
                    default = {selectedIntensity}
                    options = {["Fast", "Medium", "Slow"]}
                    selectOption = {setLightIntensityHelper}
                    disabled = {props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "settings-dd1" style = {{zIndex: 10}}>
                <GenericDropdown
                    ref = {ddRef}
                    default = {selectedHoldTime}
                    options = {ddTime}
                    selectOption = {setHoldTimeHelper}
                    disabled = {props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "settings-dd2" style = {{zIndex: 10}}>
                <GenericDropdown
                    ref = {ddRef}
                    default = {selectedHoldTimeUnits}
                    options = {["Seconds", "Minutes"]}
                    selectOption = {setHoldTimeUnitsHelper}
                    disabled = {props.lights ? false : true}
                ></GenericDropdown>
            </div>
        </div>
    );
}

export default ConfigSettings;