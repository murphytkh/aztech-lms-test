import "../../resources/css/three-js-ui.css";

import React from "react";

import UIExternal from "./UIExternal";
import UILightName from "./UILightName";
import UIReadMe from "./UIReadMe";
import UIConfig from "./UIConfig";
import UIMsgDisplay from "./UIMsgDisplay";

function UIManager(props)
{
    return(
        <div className = "three-ui-container">
            {/* out of canvas elements */}
            <UIExternal 
                add = {props.add}
                toggleAdd = {props.toggleAdd} 
                ph = {props.ph} 
                togglePh = {props.togglePh}
            />
            {/* light name input box */}
            <UILightName
                add = {props.add}
                value = {props.currLightName}
                onChange = {props.setCurrLightName}
                onFocus = {props.focus}
                onBlur = {props.blur}
            />
            {/* readme */}
            <UIReadMe />
            {/* config */}
            {props.selectedLights.length > 0 &&
                <UIConfig 
                    focus = {props.focus}
                    blur = {props.blur}
                    selectedLights = {props.selectedLights}
                    setLightName = {props.setLightName}
                    setMode = {props.setMode}
                    setGroup = {props.setGroup}
                />
            }
            {/* message display */}
            <UIMsgDisplay
                colour = {props.displayColour}
                text = {props.displayText} 
            />
        </div>
    );
}

export default UIManager;