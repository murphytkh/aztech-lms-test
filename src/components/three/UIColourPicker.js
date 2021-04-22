import "../../resources/css/three-js-ui-colour-picker.css";

import React, {useState} from "react";
import {HexColorPicker} from "react-colorful";

function UIColourPicker(props)
{
    const [currValue, setCurrValue] = useState(props.colour);

    function handleChange(e)
    {
        setCurrValue(e);
    }

    function handleCancel()
    {
        props.cancel();
    }

    function handleConfirm()
    {
        props.confirm(currValue);
    }

    return(
        <div className = "three-ui-box" id = "colour-picker">
                {/* colour picker */}
                <HexColorPicker
                    color = {currValue}
                    onChange = {handleChange}
                />
                {/* buttons */}
                <div 
                    className = "three-btn cancel"
                    onClick = {handleCancel}
                    style = {{backgroundColor: "#7F849F"}}
                >
                    CANCEL
                </div>
                <div 
                    className = "three-btn confirm" 
                    onClick = {handleConfirm}
                    style = {{backgroundColor: "#7F849F"}}
                >
                    CONFIRM
                </div>
        </div>
    );
}

export default UIColourPicker;