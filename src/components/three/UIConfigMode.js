import React from "react";
import {allEqual} from "../Utility";

function UIConfigModeButton(props)
{
    function handleClick()
    {
        props.click(props.text);
    }

    return(
        <div 
            className="three-btn" 
            style={{backgroundColor: props.colour,
                    boxShadow: props.highlight ? "0 0 0 4px #FFFFC1" : ""}}
            onClick={handleClick}
        >
            {props.text}
        </div>
    );
}

function UIConfigMode(props)
{
    function onCheck()
    {
        return allEqual("mode", "ON", props.selectedLights);
    }

    function offCheck()
    {
        return allEqual("mode", "OFF", props.selectedLights);
    }

    function normalCheck()
    {
        return allEqual("mode", "NORMAL", props.selectedLights);
    }

    // on/off/normal buttons
    return(
        <div className="block" id="btn-group">
            <UIConfigModeButton 
                click={props.click} 
                text="ON" 
                colour={"#3497fD"}
                highlight={onCheck()}
            />
            <UIConfigModeButton 
                click={props.click} 
                text="OFF" 
                colour={"#6D6E71"}
                highlight={offCheck()}
            />
            <UIConfigModeButton 
                click={props.click} 
                text="NORMAL" 
                colour={"#A0BC34"}
                highlight={normalCheck()}
            />
        </div>
    );
}

export default UIConfigMode;