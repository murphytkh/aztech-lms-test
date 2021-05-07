import "../../resources/css/three-js-ui-config.css";

import React, {useState} from "react";
import store from "../../redux/store";

import UIConfigName from "./UIConfigName";
import UIConfigMode from "./UIConfigMode";
import UIConfigGroup from "./UIConfigGroup";
import UIConfigTrigger from "./UIConfigTrigger";
import UIConfigTriggerData from "./UIConfigTriggerData";

function UIConfig(props)
{
    const [showTriggerData, setShowTriggerData] = useState(false);
    const [selectedLights , setSelectedLights] = useState(
        (store.getState().allLights.value).filter(obj => obj.selected)
    );

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
                selectedLights = {selectedLights}
                setLightName = {props.setLightName}
            />
            <UIConfigMode 
                click = {props.setMode} 
                selectedLights = {selectedLights}
            />
            <UIConfigGroup 
                focus = {props.focus}
                blur = {props.blur}
                selectedLights = {selectedLights}
                setGroup = {props.setGroup}
            />
            <UIConfigTrigger
                selectedLights = {selectedLights}
                toggleEditTrigger = {toggleEditTrigger}
                toggleShowData = {toggleShowData}
            />
            {/* add separate panel here */}
            {showTriggerData && selectedLights.length === 1 &&
                <UIConfigTriggerData
                    selectedLights = {selectedLights}
                />
            }
    </div>
    );
}

export default UIConfig;