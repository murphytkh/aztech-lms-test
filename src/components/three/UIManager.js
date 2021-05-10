import "../../resources/css/three-js-ui.css";

import React from "react";
import {useSelector} from "react-redux";

import store from "../../redux/store";

//import UIExternal from "./UIExternal";
import UILightName from "./UILightName";
import UIReadMe from "./UIReadMe";
import UIGroup from "./UIGroup";
import UIConfig from "./UIConfig";
import UIMsgDisplay from "./UIMsgDisplay";

function UIManager(props)
{
    const showGroups = useSelector((state) => state.showGroups.value);

    return(
        <div className="three-ui-container">
            {/* light name input box */}
            <UILightName />
            {/* readme */}
            <UIReadMe />
            {/* group config panel */}
            {showGroups &&
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