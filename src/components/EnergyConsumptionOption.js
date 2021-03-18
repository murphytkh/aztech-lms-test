import React from "react";

function EnergyConsumptionOption(props)
{
    return(
        <span>
            <div 
                className = {props.text === props.curr ? props.classSelected : props.class}
                onClick = {props.click}
            >
                {props.text}
            </div>
        </span>
    );
};

export default EnergyConsumptionOption;