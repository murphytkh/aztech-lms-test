import "../../resources/css/three-js-ui.css";

import React from "react";

function UIManager(props)
{
    return(
        <div className = "three-ui-container">
            {/* buttons */}
            <div className = "btn-container">
                <div className = "btn" onClick = {props.toggleAdd}>
                    {props.add ? "ADD" : "VIEW"}
                </div>
                <div className = "btn" onClick = {props.togglePh}>
                    {props.ph ? "TEST1" : "TEST0"}
                </div>
                <div className = "btn" onClick = {props.toggleAdd}>QWE</div>
            </div>
            {/* inputs */}
            <input
                id = {props.add ? "" : "hide"}
                type = "text"
                name = "light-name"
                value = {props.lightName}
                placeholder = "Enter light name"
                onChange = {props.setLightName}
                onFocus = {props.focus}
                onBlur = {props.blur}
                disabled = {!props.add}
            />
        </div>
    );
}

export default UIManager;