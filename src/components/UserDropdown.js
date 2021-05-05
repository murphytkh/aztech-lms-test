import "../resources/css/dashboard-user-dropdown.css"

import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";

import {setEditProfile} from "../redux/dashboardUISlice";

import DownArrow from "../resources/dashboard/icon-dropdown-down.svg";
import UpArrow from "../resources/dashboard/icon-dropdown-up.svg";
import AddUser from "../resources/user-dropdown/user-dropdown-add.svg";
import UserSettings from "../resources/user-dropdown/user-dropdown-settings.svg";
import Logout from "../resources/user-dropdown/user-dropdown-logout.svg";

function UserDropdown(props)
{
    const dispatch = useDispatch();
    const node = useRef();

    const editProfile = useSelector((state) => state.editProfile.value);
    const [isOpen, setIsOpen] = useState(false);
    const [lastLogin, setLastLogin] = useState(null);

    // list of users
    const userList = props.userList.map(user =>
        <li key={user.name} onClick={handleClick.bind(this, user.name)}>
            <h1 className="name">{user.name}</h1>
            <h2 className="role">{user.role}</h2>
            <img alt="" src={user.image}></img>
        </li>
    );

    function handleClick(str)
    {
        props.changeUser(str);
    }

    const handleClickOutside = e => 
    {
        if (node.current)
            if (node.current.contains(e.target)) 
                return;
            else
                setIsOpen(false);
    };

    function handleDropdownClick()
    {
        setIsOpen(!isOpen);
    }

    // simulate getting data
    useEffect(() => 
    {    
        setLastLogin("Last login: 23/10/20 17:30:30");
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    function handleSettings()
    {
        dispatch(setEditProfile(!editProfile));
    }

    // persistent optons other than list of users
    const openTemplate =
    (
        <ul>
            {userList}
            <li onClick={props.addUser}>
                <h1 className="misc">ADD USER</h1>
                <img alt="" src={AddUser}></img>
            </li>
            <li onClick={handleSettings}>
                <h1 className="misc">USER SETTINGS</h1>
                <img alt="" src={UserSettings}></img>
            </li>
            <li onClick={props.logout}>
                <h1 className="logout">LOGOUT</h1>
                {lastLogin != null && 
                <h2 className="logout-time">{lastLogin}</h2>}
                <img alt="" src={Logout}></img>
            </li>
        </ul>
    );

    return(
        <div ref={node} className="user-dropdown" onClick={handleDropdownClick}>
            {/* current user */}
            <h1>{props.currUser.name}</h1>
            <h2>{props.currUser.role}</h2>
            <img alt="" src={props.currUser.image} className="curr-image"></img>
            <img alt="" src={isOpen ? UpArrow : DownArrow} className="arrow"></img>
            {isOpen && openTemplate}
        </div>
    );
}

export default UserDropdown;