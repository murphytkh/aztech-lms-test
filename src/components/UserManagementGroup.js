import "../resources/css/user-management-group.css";

import React, {useState} from "react";

import DeleteIconBlack from "../resources/user-management/user-management-delete-black.svg";
//import DeleteIconOrange from "../resources/dashboard/usermanagement-delete-orange.svg";
import RadioButtonOn from "../resources/dashboard/icon-radio-button-on.svg";
import RadioButtonOff from "../resources/dashboard/icon-radio-button-off.svg";
import NewMemberIcon from "../resources/user-management/user-management-new-user.svg";

// individual entry in group listing
function UserCard(props)
{
    return(
        <div className="user" id={props.active ? "" : "inactive"}>
            <img alt="" src={props.icon} className="user-icon"></img>
            <h1 id="name">{props.name}</h1>
            <h1 id="type">{props.type}</h1>
            <h1 id="date">{props.loginDate}</h1>
            <h1 id="time">{props.loginTime}</h1>
            <div className="indicator" id={props.active ? "" : "inactive"}></div>
        </div>
    );
}

// radio buttons
function BlockDisplay(props)
{
    const [selected, setSelected] = useState(true);

    function handleClick()
    {
        setSelected(!selected);
    }

    return(
        <div className="block">
            <div>{props.name}</div>
            <img 
                alt="" 
                src={selected ? RadioButtonOn : RadioButtonOff} 
                onClick={handleClick}
            ></img>
        </div>
    );
}

// group panel
function UserManagementGroup(props)
{
    const blockList=props.blocks.map(block => 
        <BlockDisplay key={block} name={block} />
    );

    const userList=props.users.map(user =>
        <UserCard 
            key={user.name}
            icon={user.userIcon} 
            name={user.name}
            type={user.type}
            loginDate={user.lastLoginDate}
            loginTime={user.lastLoginTime}
            active={user.active}
        />
    );

    function handleDelete()
    {
        props.delete(props.name);
    }

    return(
        <div className="user-management-group">
            {/* header */}
            <div className="group-header" style={{backgroundColor: props.headerColour}}>
                <img alt="" src={props.headerIcon} className="icon"></img>
                <h1 className="title">{props.name}</h1>
                <h1 className="subtitle">{props.description}</h1>
                <img 
                    alt="" 
                    src={DeleteIconBlack} 
                    className="delete"
                    onClick={handleDelete}
                ></img>
                <div className="block-container">{blockList}</div>
            </div>
            {/* list of entries with add new member at the bottom */}
            <div className="user-container">
                {userList}
                <div className="new-member">
                    <img alt="" src={NewMemberIcon} className="user-icon"></img>
                    <h1>Add New Member</h1>
                </div>
            </div>
        </div>
    );
}

export default UserManagementGroup;