import "../../resources/css/three-js-ui-config.css";

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setEditTrigger, setDisableHotkeys} from "../../redux/threeDataSlice";

import UIConfigName from "./UIConfigName";
import UIConfigMode from "./UIConfigMode";
import UIConfigGroup from "./UIConfigGroup";
import UIConfigTrigger from "./UIConfigTrigger";
import UIConfigTriggerData from "./UIConfigTriggerData";
import store from "../../redux/store";

function UIConfig(props)
{
    const dispatch = useDispatch();
    const [showTriggerData, setShowTriggerData] = useState(false);
    const selectedLights = useSelector((state) => state.allLights.value.filter(
                                                    obj => obj.selected)
                                                );

    function toggleEditTrigger()
    {
        dispatch(setEditTrigger(!store.getState().editTrigger.value));
    }

    function toggleShowData()
    {
        setShowTriggerData(showData => !showData);
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
        <div className="three-ui-box" id="config">
            <UIConfigName 
                focus={focus}
                blur={blur}
                selectedLights={selectedLights}
                setLightName={props.setLightName}
            />
            <UIConfigMode 
                click={props.setMode} 
                selectedLights={selectedLights}
            />
            <UIConfigGroup 
                focus={focus}
                blur={blur}
                selectedLights={selectedLights}
                setGroup={props.setGroup}
            />
            <UIConfigTrigger
                selectedLights={selectedLights}
                toggleEditTrigger={toggleEditTrigger}
                toggleShowData={toggleShowData}
                showData={showTriggerData}
            />
            {/* add separate panel here */}
            {showTriggerData && selectedLights.length === 1 &&
                <UIConfigTriggerData selectedLights={selectedLights} />
            }
    </div>
    );
}

export default UIConfig;