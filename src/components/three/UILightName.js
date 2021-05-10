import "../../resources/css/three-js-ui-lightname.css";

import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {setDisableHotkeys} from "../../redux/threeDataSlice";

function UILightName(props)
{
    const dispatch = useDispatch();
    const add = useSelector((state) => state.add.value);

    function handleChange(e)
    {
        props.onChange(e.target.value);
    }

    function focus()
    {
        dispatch(setDisableHotkeys(true));
    }

    function blur()
    {
        dispatch(setDisableHotkeys(false));
    }

    return(
        <input
            className="light-name"
            id={add ? "" : "hide"}
            type="text"
            name="three-light-name"
            value={props.value}
            placeholder="Enter light name"
            onChange={handleChange}
            onFocus={focus}
            onBlur={blur}
            disabled={!add}
        />
    );
}

export default UILightName;