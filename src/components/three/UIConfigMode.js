import React from "react";

function UIConfigModeButton(props)
{
    function handleClick()
    {
        props.click(props.text);
    }

    return(
        <div 
            className = "three-btn" 
            style = {{backgroundColor: props.colour}}
            onClick = {handleClick}
        >
            {props.text}
        </div>
    );
}

function UIConfigMode(props)
{
    return(
        <div className = "btn-group">
            <UIConfigModeButton 
                click = {props.click} 
                text = "ON" 
                colour = {"#3497fD"}
            />
            <UIConfigModeButton 
                click = {props.click} 
                text = "OFF" 
                colour = {"#6D6E71"}
            />
            <UIConfigModeButton 
                click = {props.click} 
                text = "NORMAL" 
                colour = {"#A0BC34"}
            />
        </div>
    );
}

export default UIConfigMode;