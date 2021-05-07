import "../../resources/css/three-js-ui-lightname.css";

import React from "react";
import {useSelector} from "react-redux";

function UILightName(props)
{
    const add = useSelector((state) => state.add.value);

    function handleChange(e)
    {
        props.onChange(e.target.value);
    }

    return(
        <input
            className = "light-name"
            id = {add ? "" : "hide"}
            type = "text"
            name = "three-light-name"
            value = {props.value}
            placeholder = "Enter light name"
            onChange = {handleChange}
            onFocus = {props.onFocus}
            onBlur = {props.onBlur}
            disabled = {!add}
        />
    );
}

export default UILightName;