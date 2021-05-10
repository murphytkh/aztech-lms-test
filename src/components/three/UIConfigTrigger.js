import React from "react";
import store from "../../redux/store";

function UIConfigTrigger(props)
{
    return (
        <div className="block" id="trigger">
            <div className="label">Triggers: </div>
            {/* buttons */}
            <div 
                className="three-btn trigger-edit"
                id={props.selectedLights.length > 1 ? "disabled" : ""}
                onClick={props.toggleEditTrigger}
                style={{backgroundColor: "#7F849F", 
                        boxShadow: store.getState().editTrigger.value ? 
                                        "0 0 0 4px #FFFFC1" : 
                                        ""}}
            >
                EDIT
            </div>
            <div 
                className="three-btn trigger-data" 
                id={props.selectedLights.length > 1 ? "disabled" : ""}
                onClick={props.toggleShowData}
                style={{backgroundColor: "#7F849F",
                        boxShadow: props.showData ? "0 0 0 4px #FFFFC1" : ""}}
            >
                VIEW
            </div>
        </div>
    );
}

export default UIConfigTrigger;