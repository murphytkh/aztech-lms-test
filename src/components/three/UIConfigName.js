import React, {useState} from "react";

function UIConfigName(props)
{
    const [editLightName, setEditLightName] = useState(props.selectedLights[0].name);

    function disabledUpdateCheck()
    {
        if (editLightName === props.selectedLights[0].name ||
            props.selectedLights.length > 1 ||
            editLightName === "")
            return "disabled";
        else
            return "";
    }

    function disabledResetCheck()
    {
        if (editLightName === props.selectedLights[0].name ||
            props.selectedLights.length > 1)
            return "disabled";
        else
            return "";
    }

    function handleChange(e)
    {
        setEditLightName(e.target.value);
    }

    function handleUpdate()
    {
        props.setLightName(props.selectedLights[0].name, editLightName);
    }

    function handleReset()
    {
        setEditLightName(props.selectedLights[0].name);
    }

    return(
        <div className = "block" id = "edit-name">
            <div className = "label">Light: </div>
            {/* text input */}
            <input
                className = "edit-name"
                type = "text"
                name = "edit-light-name"
                value = {props.selectedLights.length > 1 ? 
                        "-" : editLightName}
                placeholder = "Enter light name"
                onChange = {handleChange}
                onFocus = {props.focus}
                onBlur = {props.blur}
                disabled = {props.selectedLights.length > 1}
            />
            {/* buttons */}
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
                id = {disabledResetCheck()}
                onClick = {handleReset}
                style = {{backgroundColor: "#E65B65"}}
            >
                RESET
            </div>
        </div>
    );
}

export default UIConfigName;