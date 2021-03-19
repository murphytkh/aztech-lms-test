import "../resources/css/view-lightcontrol.css";

import React, {useState, useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";

import Header from "../resources/view/header-medium-white.svg";
import ControlIcon from "../resources/view/lightcontrol-header-icon.svg";
import BulbIcon from "../resources/view/lightcontrol-on.svg";
import BulbFillIcon from "../resources/view/lightcontrol-off.svg";
import LoopIcon from "../resources/view/lightcontrol-loop.svg";

function EnergyConsumption(props)
{
    const ddRef = useRef();

    const [floorOptions, setFloorOptions] = useState([]);
    const [lightOptions, setLightOptions] = useState([]);

    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedLights, setSelectedLights] = useState("");

    useEffect(() =>
    {
        // simulate getting data  
        setFloorOptions(["Level 1-1", "Level 2-1", "Level 3-1"]);
        setLightOptions(["All Lights"]);
    }, []);

    function handleOnButtonClick()
    {
        if (selectedFloor && selectedLights)
            console.log("on " + selectedFloor + " " + selectedLights);
        else
            console.log("please select lights");
    }

    function handleOffButtonClick()
    {
        if (selectedFloor && selectedLights)
            console.log("off " + selectedFloor + " " + selectedLights);
        else
            console.log("please select lights");
    }

    function handleNormalButtonClick()
    {  
        if (selectedFloor && selectedLights)
            console.log("normal " + selectedFloor + " " + selectedLights);
        else
            console.log("please select lights");
    }

    function handleLoopButtonClick()
    {
        if (selectedFloor && selectedLights)
            console.log("loop " + selectedFloor + " " + selectedLights);
        else
            console.log("please select lights");
    }

    return(
        <div className = "medium-container" id = "right">
            {/* header */}
            <div className = "medium-header">
                <img alt = "" src = {Header} className = "bg"></img>
                <h1 className = "header-text">LIGHT CONTROL</h1>
                <img alt = "" src = {ControlIcon} className = "icon"></img>
            </div>
            {/* dropdown and button headers */}
            <h1 className = "lightcontrol-header0">SELECT FLOOR</h1>
            <h1 className = "lightcontrol-header1">SELECT LIGHT</h1>
            <h1 className = "lightcontrol-header2">LIGHTING CONTROL</h1>
            <h1 className = "lightcontrol-header3">ADMIN CONTROL</h1>
            <div className = "border"></div>
            {/* dropdown lists */}
            {floorOptions && lightOptions &&
                <div className = "lightcontrol-dd">
                    <div className = "lightcontrol-dd0" style = {{zIndex: 10}}>
                        <GenericDropdown
                            ref = {ddRef}
                            default = {selectedFloor}
                            options = {floorOptions}
                            selectOption = {setSelectedFloor}
                            disabled = {false}
                        ></GenericDropdown>
                    </div>
                    <div className = "lightcontrol-dd1"  style = {{zIndex: 9}}>
                        <GenericDropdown
                            ref = {ddRef}
                            default = {selectedLights}
                            options = {lightOptions}
                            selectOption = {setSelectedLights}
                            disabled = {selectedFloor === ""}
                        ></GenericDropdown>
                    </div>
                </div>
            }
            {/* buttons */}
            <div className = "lightcontrol-btn" id = "btn0" onClick = {handleOnButtonClick}>
                <img alt = "" src = {BulbIcon}></img>
                <h1>Turn On</h1>
            </div>
            <div className = "lightcontrol-btn" id = "btn1" onClick = {handleOffButtonClick}>
                <img alt = "" src = {BulbFillIcon}></img>
                <h1>Turn Off</h1>
            </div>
            <div className = "lightcontrol-btn" id = "btn2" onClick = {handleNormalButtonClick}>
                <img alt = "" src = {BulbIcon}></img>
                <h1>NORMAL</h1>
            </div>
            <div className = "lightcontrol-btn" id = "btn3" onClick = {handleLoopButtonClick}>
                <img alt = "" src = {LoopIcon}></img>
                <h1>LOOP</h1>
            </div>
        </div>
    );
}

export default EnergyConsumption;