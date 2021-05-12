import "../resources/css/view-light-control.css";

import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";

import GenericDropdown from "./GenericDropdown";

import ControlIcon from "../resources/view/lightcontrol-header-icon.svg";
import BulbIcon from "../resources/view/lightcontrol-on.svg";
import BulbFillIcon from "../resources/view/lightcontrol-off.svg";
import LoopIcon from "../resources/view/lightcontrol-loop.svg";

function EnergyConsumption(props)
{
    const ddRef = useRef();

    const levels = useSelector((state) => state.levels.value);
    const lights = useSelector((state) => state.lights.value);

    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedLights, setSelectedLights] = useState("");

    useEffect(() =>
    {
        // simulate getting data  

    }, []);

    // button placeholders
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
        <div className="card-container" id="medium">
            {/* header */}
            <div className="card-header" id="light-control">
                <h1 className="header-text">LIGHT CONTROL</h1>
                <img alt="" src={ControlIcon} className="header-icon"></img>
            </div>
            {/* dropdown and button headers */}
            <h1 className="light-control-header" id="header0">SELECT FLOOR</h1>
            <h1 className="light-control-header" id="header1">SELECT LIGHT</h1>
            <h1 className="light-control-header" id="header2">LIGHTING CONTROL</h1>
            <h1 className="light-control-header" id="header3">ADMIN CONTROL</h1>
            {/* dropdown lists */}
            {true &&
                <div className="light-control-dd">
                    <div className="light-control-dd0" style={{zIndex: 10}}>
                        <GenericDropdown
                            ref={ddRef}
                            default={selectedFloor}
                            options={levels}
                            selectOption={setSelectedFloor}
                            disabled={false}
                        ></GenericDropdown>
                    </div>
                    <div className="light-control-dd1"  style={{zIndex: 9}}>
                        <GenericDropdown
                            ref={ddRef}
                            default={selectedLights}
                            options={lights}
                            selectOption={setSelectedLights}
                            disabled={selectedFloor === ""}
                        ></GenericDropdown>
                    </div>
                </div>
            }
            {/* buttons */}
            <div className="light-control-btn" id="btn0" onClick={handleOnButtonClick}>
                <img alt="" src={BulbIcon}></img>
                <h1>Turn On</h1>
            </div>
            <div className="light-control-btn" id="btn1" onClick={handleOffButtonClick}>
                <img alt="" src={BulbFillIcon}></img>
                <h1>Turn Off</h1>
            </div>
            <div className="light-control-btn" id="btn2" onClick={handleNormalButtonClick}>
                <img alt="" src={BulbIcon}></img>
                <h1>NORMAL</h1>
            </div>
            <div className="light-control-btn" id="btn3" onClick={handleLoopButtonClick}>
                <img alt="" src={LoopIcon}></img>
                <h1>LOOP</h1>
            </div>
        </div>
    );
}

export default EnergyConsumption;