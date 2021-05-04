import "../resources/css/photosensor-darkness.css";

import React, {useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";

import HeaderIcon from "../resources/photosensor/darkness-icon.svg";
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

function PhotosensorDarkness(props)
{
    const darknessRef = useRef();

    useEffect(() =>
    {
        // simulate getting data

    }, []);

    function handleDarknessButton()
    {
        var circle = document.querySelector(".card-toggle-btn#darkness .circle");
        var container = document.querySelector(".card-toggle-btn#darkness");

        // turn on
        if (circle.style.transform === "translate(-10%, 0%)")
        {
            circle.style.transform = "translate(75%, 0%)";
            container.style.backgroundColor = "#005570";
            props.setDarknessDetection("ON");
        }
        // turn off
        else
        {
            circle.style.transform = "translate(-10%, 0%)";
            container.style.backgroundColor = "#333132";
            props.setDarknessDetection("OFF");
        }
    }

    return(
        <div className = "card-container" id = "small">
            {/* header */}
            <div className = "card-header" id = "darkness">
                <h1 className = "header-text">DARKNESS DETECTION</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                {/* header button(s) */}
                <div
                    className = "card-toggle-btn"
                    id = "darkness"
                    style = {props.lights ? {opacity: 1.0} : {pointerEvents: "none", opacity: 0.3}}
                    onClick = {handleDarknessButton}
                >
                    <div className = "circle"></div>
                </div>
            </div>
            {/* dropdown label */}
            <div className = "card-label" id = "label0">ENVIRONMENTAL OFFSET</div>
            <div className = "card-label" id = "label1">DESIRED INTENSITY</div>
            <div className = "card-label" id = "label2">DARK THRESHOLD</div>
            {/* info icon */}
            <img 
                title = "Lux of the environment the lighting is at."
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "darkness-info0"
            ></img>
            <img 
                title = "Sensor reading below threshold value turns 'ON' lighting." 
                alt = "" 
                src = {InfoIcon}
                className = "card-info"
                id = "darkness-info1"
            ></img>
            {/* dropdown list */}
            <div className = "card-dropdown" id = "darkness-dd0" style = {{zIndex: 2}}>
                <GenericDropdown
                    ref = {darknessRef}
                    default = {props.environmentalOffset}
                    options = {options}
                    selectOption = {props.setEnvironmentalOffset}
                    disabled = {props.darknessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "darkness-dd1" style = {{zIndex: 1}}>
                <GenericDropdown
                    ref = {darknessRef}
                    default = {props.darknessIntensity}
                    options = {intensityOptions}
                    selectOption = {props.setDarknessIntensity}
                    disabled = {props.darknessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
            <div className = "card-dropdown" id = "darkness-dd2" style = {{zIndex: 0}}>
                <GenericDropdown
                    ref = {darknessRef}
                    default = {props.darkThreshold}
                    options = {options}
                    selectOption = {props.setDarkThreshold}
                    disabled = {props.darknessDetection === "ON" && props.lights ? false : true}
                ></GenericDropdown>
            </div>
        </div>
    );
}

export default PhotosensorDarkness;