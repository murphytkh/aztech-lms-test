import React, {useEffect, useState} from "react";
import {allEqual} from "../Utility";

function UIConfigGroup(props)
{
    const [initial, setInitial] = useState("-");
    const [editGroupID, setEditGroupID] = useState(props.selectedLights[0].group);

    function disabledUpdateCheck()
    {
        if (editGroupID === "" || editGroupID === "-")
        {
            return "disabled";
        }
        else
        {
            if (allEqual("group", props.selectedLights[0].group, props.selectedLights) &&
                props.selectedLights[0].group === editGroupID)
                return "disabled";
            else
                return "";
        }
    }

    function disabledResetCheck()
    {
        if (initial === editGroupID)
            return "disabled";
        else
            return "";
    }

    function handleChange(e)
    {
        setEditGroupID(e.target.value);
    }

    function handleUpdate()
    {
        props.setGroup(editGroupID);
    }

    function handleReset()
    {
        setEditGroupID(initial);
    }

    useEffect(() =>
    {
        var tmp = "";

        if (props.selectedLights.length === 1)
        {
            tmp = props.selectedLights[0].group;
        }
        else
        {
            if (allEqual("group", props.selectedLights[0].group, props.selectedLights))
                tmp = props.selectedLights[0].group;
            else
                tmp = "-";
        }

        setInitial(tmp);
        setEditGroupID(tmp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="block" id="edit-group">
            <div className="label">Group ID:</div>
            {/* text input */}
            <input
                className="edit-group"
                type="text"
                name="edit-group-name"
                value={editGroupID}
                placeholder="Enter group ID (default 0)"
                onChange={handleChange}
                onFocus={props.focus}
                onBlur={props.blur}
            />
            {/* buttons */}
            <div 
                className="three-btn update" 
                id={disabledUpdateCheck()}
                onClick={handleUpdate}
                style={{backgroundColor: "#7F849F"}}
            >
                UPDATE
            </div>
            <div 
                className="three-btn reset"
                id={disabledResetCheck()}
                onClick={handleReset}
                style={{backgroundColor: "#E65B65"}}
            >
                RESET
            </div>
        </div>
    );
}

export default UIConfigGroup;