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
            {/* light name input box */}
            <UILightName
                value={props.currLightName}
                onChange={props.setCurrLightName}
            />
            {/* readme */}
            <UIReadMe />
            {/* group config panel */}
            {props.group &&
                <UIGroup 
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
                    setLightName={props.setLightName}
                    setMode={props.setMode}
                    setGroup={props.setGroup}
                />
            }
            {/* message display */}
            <UIMsgDisplay />
        </div>
    );
}

export default UIManager;