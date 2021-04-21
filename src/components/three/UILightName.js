import "../../resources/css/three-js-ui-lightname.css";

import React from "react";

function UILightName(props)
{
    function handleChange(e)
    {
        props.onChange(e.target.value);
    }

    return(
        <input
            className = "light-name"
            id = {props.add ? "" : "hide"}
            type = "text"
            name = "three-light-name"
            value = {props.value}
            placeholder = "Enter light name"
            onChange = {handleChange}
            onFocus = {props.onFocus}
            onBlur = {props.onBlur}
            disabled = {!props.add}
        />
    );
}

export default UILightName;