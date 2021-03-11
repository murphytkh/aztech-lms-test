import React from "react";

function EnergyConsumptionOption(props)
{
    return(
        <span>
            {props.text === props.curr ?
            <div
                className = {props.classSelected}
                onClick = {props.click}
            >
                {props.text}
            </div> :
            <div
                className = {props.class}
                onClick = {props.click}
            >
                {props.text}
            </div>}
        </span>
    );
};

export default EnergyConsumptionOption;