import "../resources/css/config-brightness.css";

import React, {useEffect} from "react";

import ConfigBrightnessInput from "./ConfigBrightnessInput";

import HeaderIcon from "../resources/dashboard/icon-light-empty.svg";

function ConfigBrightness(props)
{
    useEffect(() =>
    {
        // simulate getting data

    }, []);

    return(
        <div className = "card-container" id = "large">
            {/* header */}
            <div className = "card-header" id = "brightness-level">
                <h1 className = "header-text">BRIGHTNESS LEVEL</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
            </div>
            {/* inputs */}
            <ConfigBrightnessInput
                label = {"Dimmed"} 
                info = {"Brightness when dimmed (idle)."}
                level = {props.dimmedBrightness} 
                set = {props.setDimmed}
                disabled = {!props.lights}
            />
            <ConfigBrightnessInput
                label = {"Motion Triggered"}
                info = {"Brightness when triggered by motion sensor."}
                level = {props.motionBrightness} 
                set = {props.setMotion}
                disabled = {!props.lights}
            />
            <ConfigBrightnessInput
                label = {"Max. Brightness"}
                info = {"Brightness when turned ON."}
                level = {props.maxBrightness} 
                set = {props.setMax}
                disabled = {!props.lights}
            />
        </div>
    );
}

export default ConfigBrightness;