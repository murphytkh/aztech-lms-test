import "../../resources/css/three-js-ui-config.css";

import React from "react";

import UIConfigName from "./UIConfigName";
import UIConfigMode from "./UIConfigMode";
import UIConfigGroup from "./UIConfigGroup";

function UIConfig(props)
{
    return(
        <div className = "three-ui-box" id = "config">
            <UIConfigName 
                focus = {props.focus}
                blur = {props.blur}
                selectedLights = {props.selectedLights}
                setLightName = {props.setLightName}
            />
            <UIConfigMode click = {props.setMode} />
            <UIConfigGroup 
                focus = {props.focus}
                blur = {props.blur}
                setGroup = {props.setGroup}
            />
    </div>
    );
}

export default UIConfig;