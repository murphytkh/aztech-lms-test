import React from "react";

function UIConfigTrigger(props)
{
    function handleEdit()
    {

    }

    function handleViewData()
    {

    }

    return(
        <div className = "block" id = "trigger">
            <div className = "label">Triggers: </div>
            {/* buttons */}
            <div 
                className = "three-btn trigger-edit"
                //id = {showColour ? "" : "disabled"}
                onClick = {handleEdit}
                style = {{backgroundColor: "#7F849F"}}
            >
                EDIT
            </div>
            <div 
                className = "three-btn trigger-data" 
                //id = {group !== "" ? "" : "disabled"}
                onClick = {handleViewData}
                style = {{backgroundColor: "#7F849F"}}
            >
                VIEW DATA
            </div>
        </div>
    );
}

export default UIConfigTrigger;