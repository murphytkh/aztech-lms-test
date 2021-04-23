import "../../resources/css/three-js-ui-config.css";

import React from "react";

import UIConfigName from "./UIConfigName";
import UIConfigMode from "./UIConfigMode";
import UIConfigGroup from "./UIConfigGroup";
import UIConfigTrigger from "./UIConfigTrigger";

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
                selectedLights = {props.selectedLights}
                setGroup = {props.setGroup}
            />
            <UIConfigTrigger
                selectedLights = {props.selectedLights}
                editTriggerMode = {props.editTriggerMode}
                setEditTriggerMode = {props.setEditTriggerMode}
            />
            {/* add separate panel here */}
            
    </div>
    );
}

export default UIConfig;