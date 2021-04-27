import React from "react";

function UIConfigTrigger(props)
{
    return (
        <div className = "block" id = "trigger">
            <div className = "label">Triggers: </div>
            {/* buttons */}
            <div 
                className = "three-btn trigger-edit"
                id = {props.selectedLights.length > 1 ? "disabled" : ""}
                onClick = {props.toggleEditTrigger}
                style = {{backgroundColor: "#7F849F"}}
            >
                EDIT
            </div>
            <div 
                className = "three-btn trigger-data" 
                id = {props.selectedLights.length > 1 ? "disabled" : ""}
                onClick = {props.toggleShowData}
                style = {{backgroundColor: "#7F849F"}}
            >
                VIEW
            </div>
        </div>
    );
}

export default UIConfigTrigger;