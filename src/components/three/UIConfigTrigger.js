import React from "react";

function UIConfigTrigger(props)
{
    function handleEdit()
    {
        props.setEditTriggerMode(!props.editTriggerMode);
    }

    function handleViewData()
    {
        console.log("view trigger data");
    }

    return(
        <div className = "block" id = "trigger">
            <div className = "label">Triggers: </div>
            {/* buttons */}
            <div 
                className = "three-btn trigger-edit"
                id = {props.selectedLights.length > 1 ? "disabled" : ""}
                onClick = {handleEdit}
                style = {{backgroundColor: "#7F849F"}}
            >
                EDIT
            </div>
            <div 
                className = "three-btn trigger-data" 
                id = {props.selectedLights.length > 1 ? "disabled" : ""}
                onClick = {handleViewData}
                style = {{backgroundColor: "#7F849F"}}
            >
                VIEW DATA
            </div>
        </div>
    );
}

export default UIConfigTrigger;