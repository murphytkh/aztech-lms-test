import React from "react";

function UIConfigTriggerData(props)
{
    // display connected triggerers/triggerees in text form
    return (
        <div className="three-ui-box" id="trigger-data">
            <div className="block" id="triggerers">
                <div className="label">Triggerers: </div>
                <div className="trigger-list">
                    {props.selectedLights[0].triggerers.length > 0 ?
                        props.selectedLights[0].triggerers.join(", ") : "-"}
                </div>
            </div>
            <div className="block" id="triggerees">
                <div className="label">Triggerees: </div>
                <div className="trigger-list">
                    {props.selectedLights[0].triggerees.length > 0 ?
                            props.selectedLights[0].triggerees.join(", ") : "-"}
                </div>
            </div>
        </div>
    );
}

export default UIConfigTriggerData;