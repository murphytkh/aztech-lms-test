import "../resources/css/photosensor-brightness.css";

import React, {useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";

import HeaderIcon from "../resources/dashboard/icon-photosensor.svg";
import InfoIcon from "../resources/dashboard/icon-question-mark.svg";

var options = [];
var intensityOptions = [];

for (var i = 0; i < 41; ++i)
{
    options.push(i * 5);
}

for (var j = 0; j < 21; ++j)
{
    intensityOptions.push(j * 5);
}

function PhotosensorBrightness(props)
{
    const brightnessRef = useRef();

    useEffect(() =>
    {
        // simulate getting data

    }, []);

    function handleBrightnessButton()
    {
        var circle = document.querySelector(".card-toggle-btn#brightness .circle");
        var container = document.querySelector(".card-toggle-btn#brightness");

        // turn on
        if (circle.style.transform === "translate(-10%, 0%)")
        {
            circle.style.transform = "translate(75%, 0%)";
            container.style.backgroundColor = "#005570";
            props.setBrightnessDetection("ON");
        }
        // turn off
        else
        {
            circle.style.transform = "translate(-10%, 0%)";
            container.style.backgroundColor = "#333132";
            props.setBrightnessDetection("OFF");
        }
    }

    return(
        <div className = "card-container" id = "small">
            {/* header */}
            <div className = "card-header" id = "brightness">
                <h1 className = "header-text">BRIGHTNESS DETECTION</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                {/* header button(s) */}
                <div
                    className = "card-toggle-btn"
                    id = "brightness"
                    style = {props.lights ? {opacity: 1.0} : {pointerEvents: "none", opacity: 0.3}}
                    onClick = {handleBrightnessButton}
                >
                    <div className = "circle"></div>
                </div>
            </div>
            {/* dropdown label */}
            <div className = "card-label" id = "label0">LIGHTING'S OWN OFFSET</div>
            <div className = "card-label" id = "label1">DESIRED INTENSITY</div>
            <div className = "card-label" id = "label2">BRIGHT THRESHOLD</div>
            {/* info icon */}
            <img 
                title = "Lux produced by lighting when it is 'ON'"
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "brightness-info0"
            ></img>
            <img 
                title = "Sensor reading above threshold value turns 'OFF' lighting."
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "brightness-info1"
            ></img>
            {/* dropdown lists */}
            <div className = "card-dropdown" id = "brightness-dd0" style = {{zIndex: 2}}>
                <GenericDropdown
                    ref = {brightnessRef}
                    default = {props.lightingOffset}
                    options = {options}
                    selectOption = {props.setLightingOffset}
                    disabled = {props.brightnessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "brightness-dd1" style = {{zIndex: 1}}>
                <GenericDropdown
                    ref = {brightnessRef}
                    default = {props.brightnessIntensity}
                    options = {intensityOptions}
                    selectOption = {props.setBrightnessIntensity}
                    disabled = {props.brightnessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "brightness-dd2" style = {{zIndex: 0}}>
                <GenericDropdown
                    ref = {brightnessRef}
                    default = {props.brightnessThreshold}
                    options = {options}
                    selectOption = {props.setBrightnessThreshold}
                    disabled = {props.brightnessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
        </div>
    );
}

export default PhotosensorBrightness;