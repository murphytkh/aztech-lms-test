import "../../resources/css/three-js-ui-group.css";

import React, {useState, forwardRef} from "react";

const UIGroup = forwardRef((props, ref) =>
{
    const [group, setGroup] = useState("");
    const [colour, setColour] = useState("#FFFFFF");

    function handleChange(e)
    {
        setGroup(e.target.value);
    }

    function handleSelect()
    {
        props.setCurrGroup(group);
    }

    function handleColour()
    {

    }

    return(
        <div className = "three-ui-box" id = "group">
            <div className = "block" id = "group-select">
                <div className = "label">Group ID:</div>
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
                              visibility: group ? "visible" : "hidden"}}
                >
                    &nbsp;
                </div>
                <div 
                    className = "three-btn select" 
                    onClick = {handleSelect}
                    style = {{backgroundColor: "#7F849F"}}
                >
                    SELECT
                </div>
                <div 
                    className = "three-btn colour" 
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