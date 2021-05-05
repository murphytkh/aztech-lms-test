import React from "react";

function EnergyConsumptionOption(props)
{
    function handleClick()
    {
        props.set(props.text);
    }

    return(
        <div 
            className="btn"
            id={props.text === props.curr ? "selected" : ""}
            onClick={handleClick}
        >
            {props.text}
        </div>
    );
};

export default EnergyConsumptionOption;