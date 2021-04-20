import React, {useState} from "react";

function UIConfigGroup(props)
{
    const [editGroupID, setEditGroupID] = useState(props.selectedLights[0].group);

    function valueDisplay()
    {
        return editGroupID;
    }

    function disabledUpdateCheck()
    {
        if (editGroupID === props.selectedLights[0].group || editGroupID === "")
            return "disabled";
        else
            return "";
    }

    function disabledCheck()
    {
        if (editGroupID === props.selectedLights[0].group)
            return "disabled";
        else
            return "";
    }

    function handleChange(e)
    {
        setEditGroupID(e.target.value);
    }

    function handleUpdate()
    {
        props.setGroup(editGroupID);
    }

    function handleReset()
    {
        setEditGroupID(props.selectedLights[0].group);
    }

    return(
        <div className = "block" id = "edit-group">
            <div className = "label">Group ID:</div>
            <input
                className = "edit-group"
                type = "text"
                name = "edit-group-name"
                value = {valueDisplay()}
                placeholder = "Enter group ID (default 0)"
                onChange = {handleChange}
                onFocus = {props.focus}
                onBlur = {props.blur}
            />
            <div 
                className = "three-btn update" 
                id = {disabledUpdateCheck()}
                onClick = {handleUpdate}
                style = {{backgroundColor: "#7F849F"}}
            >
                UPDATE
            </div>
            <div 
                className = "three-btn reset"
                id = {disabledCheck()}
                onClick = {handleReset}
                style = {{backgroundColor: "#E65B65"}}
            >
                RESET
            </div>
        </div>
    );
}

export default UIConfigGroup;