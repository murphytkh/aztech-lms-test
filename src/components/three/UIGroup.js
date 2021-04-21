import "../../resources/css/three-js-ui-group.css";

import React, {useState, useEffect, forwardRef} from "react";
import {PhotoshopPicker} from 'react-color';

const UIGroup = forwardRef((props, ref) =>
{
    const [group, setGroup] = useState("");
    const [colour, setColour] = useState("#FFFFFF");
    const [showPicker, setShowPicker] = useState(false);

    function handleChange(e)
    {
        setGroup(e.target.value);
    }

    function handleSelect()
    {
        props.setCurrGroup(group);

        if (group in props.groupColours)
        {
            setColour(props.groupColours[group]);
        }
        else
        {
            setColour("#808080");
        }
    }

    function handleColour()
    {
        setShowPicker(showPicker => !showPicker);
    }

    return(
        <div className = "three-ui-box" id = "group">
            <div className = "block" id = "group-select">
                <div className = "label">Group ID:</div>
                {/* text input */}
                <input
                    ref = {ref}
                    className = "group-select"
                    type = "text"
                    name = "group-select"
                    value = {group}
                    placeholder = "Enter group ID"
                    onChange = {handleChange}
                    onFocus = {props.focus}
                    onBlur = {props.blur}
                /> 
                <div
                    className = "colour-display"
                    style = {{backgroundColor: colour, 
                              visibility: props.currGroup ? "visible" : "hidden"}}
                >
                    &nbsp;
                </div>
                {/* colour picker */}
                {showPicker && 
                    <PhotoshopPicker />
                }
                {/* buttons */}
                <div 
                    className = "three-btn select"
                    id = {group !== "" ? "" : "disabled"}
                    onClick = {handleSelect}
                    style = {{backgroundColor: "#7F849F"}}
                >
                    SELECT
                </div>
                <div 
                    className = "three-btn colour" 
                    id = {props.currGroup ? "" : "disabled"}
                    onClick = {handleColour}
                    style = {{backgroundColor: "#7F849F"}}
                >
                    COLOUR
                </div>
            </div>
        </div>
    );
});

export default UIGroup;