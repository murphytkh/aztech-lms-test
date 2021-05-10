import "../../resources/css/three-js-ui.css";

import React from "react";
import store from "../../redux/store";

//import UIExternal from "./UIExternal";
import UILightName from "./UILightName";
import UIReadMe from "./UIReadMe";
import UIGroup from "./UIGroup";
import UIConfig from "./UIConfig";
import UIMsgDisplay from "./UIMsgDisplay";

function UIManager(props)
{
    return(
        <div className="three-ui-container">
            {/* out of canvas elements */}
            {/*
            <UIExternal 
                add = {props.add}
                toggleAdd = {props.toggleAdd} 
                ph = {props.ph} 
                togglePh = {props.togglePh}
            />
            */}
            {/* light name input box */}
            <UILightName
                value={props.currLightName}
                onChange={props.setCurrLightName}
                onFocus={props.focus}
                onBlur={props.blur}
            />
            {/* readme */}
            <UIReadMe />
            {/* group config panel */}
            {props.group &&
                <UIGroup 
                    focus={props.focus}
                    blur={props.blur}
                    ref={props.groupSearchRef}
                    currGroup={props.currGroup}
                    setCurrGroup={props.setCurrGroup}
                    groupColours={props.groupColours}
                    setGroupColours={props.setGroupColours}
                />
            }
            {/* config */}
            {(store.getState().allLights.value).filter(obj => 
                obj.selected
            ).length > 0 &&
                <UIConfig 
                    focus={props.focus}
                    blur={props.blur}
                    setLightName={props.setLightName}
                    setMode={props.setMode}
                    setGroup={props.setGroup}
                />
            }
            {/* message display */}
            <UIMsgDisplay
                colour={props.displayColour}
                text={props.displayText} 
            />
        </div>
    );
}

export default UIManager;