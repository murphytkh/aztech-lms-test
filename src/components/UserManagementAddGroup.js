import "../resources/css/user-management-add.css";

import React, {useState} from "react";

import AddGroupIcon from "../resources/user-management/user-management-add-group.svg";
import ButtonIcon from "../resources/user-management/user-management-plus.svg";

function UserManagementAddGroup(props)
{
    const [groupName, setGroupName] = useState("");

    // events
    function handleOpenMenu()
    {
        props.setOpen(!props.open);
    }

    function handleChangeGroupName(e)
    {
        setGroupName(e.target.value);
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        props.add(groupName);
    }

    return(
        <div className="user-management-add-group">
            {/* main card */}
            <div className="user-management-add"  id={props.open ? "open" : ""}>
                {/* icon */}
                <img alt="" src={AddGroupIcon} className="icon"></img>
                {/* title */}
                <h1 className="big">Add New Group</h1>
                {/* text */}
                <h1 className="small">Create new group to maintain your smart estate.</h1>
                {/* button */}
                <div className="btn" id={props.enabled ? "" : "disabled"} onClick={handleOpenMenu}>
                    <img alt="" src={ButtonIcon}></img>
                    <h1>Create New Group</h1>
                </div>
            </div>
            {/* dropdown menu */}
            {props.open &&
                <div className="user-management-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="user-management-group-name"
                            className="field"
                            name="group-name"
                            value={groupName}
                            placeholder="GROUP NAME"
                            onChange={handleChangeGroupName}
                        ></input>
                        {/* register button */}
                        <button className="submit" type="submit">CREATE GROUP</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default UserManagementAddGroup;