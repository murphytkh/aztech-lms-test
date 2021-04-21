import "../../resources/css/three-js-ui-group.css";

import React, {useState, forwardRef} from "react";

const UIGroup = forwardRef((props, ref) =>
{
    const [group, setGroup] = useState("");
    const [colour, setColour] = useState("");

    function handleChange(e)
    {
        setGroup(e.target.value);
    }


    function handleSelect()
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
            </div>
        </div>
    );
});

export default UIGroup;