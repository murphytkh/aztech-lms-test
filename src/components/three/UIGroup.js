import "../../resources/css/three-js-ui-group.css";

import React, {useState, forwardRef} from "react";
import UIColourPicker from "./UIColourPicker";

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

    function handleCancel()
    {
        setShowPicker(false);
        
    }

    function handleConfirm(colour)
    {
        setShowPicker(false);
        setColour(colour);
        var obj = {...props.groupColours};
        obj[props.currGroup] = colour;
        props.setGroupColours(obj);
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
                    <UIColourPicker
                        colour = {colour}
                        setColour = {setColour}
                        cancel = {handleCancel}
                        confirm = {handleConfirm}
                    />
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