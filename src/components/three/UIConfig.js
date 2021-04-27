import "../../resources/css/three-js-ui-config.css";

import React, {useState} from "react";

import UIConfigName from "./UIConfigName";
import UIConfigMode from "./UIConfigMode";
import UIConfigGroup from "./UIConfigGroup";
import UIConfigTrigger from "./UIConfigTrigger";
import UIConfigTriggerData from "./UIConfigTriggerData";

function UIConfig(props)
{
    const [showTriggerData, setShowTriggerData] = useState(false);

    function toggleEditTrigger()
    {
        props.setEditTriggerMode(!props.editTriggerMode);
    }

    function toggleShowData()
    {
        setShowTriggerData(showData => !showData);
    }

    return(
        <div className = "three-ui-box" id = "config">
            <UIConfigName 
                focus = {props.focus}
                blur = {props.blur}
                selectedLights = {props.selectedLights}
                setLightName = {props.setLightName}
            />
            <UIConfigMode 
                click = {props.setMode} 
                selectedLights = {props.selectedLights}
            />
            <UIConfigGroup 
                focus = {props.focus}
                blur = {props.blur}
                selectedLights = {props.selectedLights}
                setGroup = {props.setGroup}
            />
            <UIConfigTrigger
                selectedLights = {props.selectedLights}
                toggleEditTrigger = {toggleEditTrigger}
                toggleShowData = {toggleShowData}
            />
            {/* add separate panel here */}
            {showTriggerData && props.selectedLights.length === 1 &&
                <UIConfigTriggerData
                    selectedLights = {props.selectedLights}
                />
            }
    </div>
    );
}

export default UIConfig;