import "../../resources/css/three-js-ui-lightname.css";

import React from "react";
import store from "../../redux/store";

function UILightName(props)
{
    function handleChange(e)
    {
        props.onChange(e.target.value);
    }

    return(
        <input
            className="light-name"
            id={store.getState().add.value ? "" : "hide"}
            type="text"
            name="three-light-name"
            value={props.value}
            placeholder="Enter light name"
            onChange={handleChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            disabled={!store.getState().add.value}
        />
    );
}

export default UILightName;