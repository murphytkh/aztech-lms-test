import "../../resources/css/three-js-ui-lightname.css";

import React from "react";

function UILightName(props)
{
    return(
        <input
            className = "light-name"
            id = {props.add ? "" : "hide"}
            type = "text"
            name = "three-light-name"
            value = {props.value}
            placeholder = "Enter light name"
            onChange = {props.onChange}
            onFocus = {props.onFocus}
            onBlur = {props.onBlur}
            disabled = {!props.add}
        />
    );
}

export default UILightName;