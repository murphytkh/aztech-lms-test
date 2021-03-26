import React, {useEffect, useState} from "react";

import AddUserIcon from "../resources/dashboard/usermanagement-adduser.svg";
import ButtonIcon from "../resources/dashboard/usermanagement-addbox-button.svg";
import UpArrowIcon from "../resources/dashboard/icon-triangle-up.svg";
import DownArrowIcon from "../resources/dashboard/icon-triangle-down.svg";
import EyeIcon from "../resources/dashboard/icon-eye.svg";
import EyeOffIcon from "../resources/dashboard/icon-eye-off.svg";

function UserManagementAddUser(props)
{
    const [username, setUserName] = useState("");
    const [usertype, setUsertype] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currTypeIndex, setCurrTypeIndex] = useState(0);
    const [lastTypeIndex, setLastTypeIndex] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // simulate getting data
    useEffect(() =>
    {
        setCurrTypeIndex(0);
        setLastTypeIndex(props.userTypes.length - 1);
    }, [props.userTypes]);

    function handleOpenMenu()
    {
        props.setOpen(!props.open);
    }

    function handleChangeUsername(e)
    {
        setUserName(e.target.value);
    }

    function handleChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function handleChangeContactNumber(e)
    {
        setContactNumber(e.target.value);
    }

    function handleChangePassword(e)
    {
        setPassword(e.target.value);
    }

    function handleChangeConfirmPassword(e)
    {
        setConfirmPassword(e.target.value);
    }

    function handleUpArrow()
    {
        if (usertype === "" || currTypeIndex === lastTypeIndex)
        {
            setCurrTypeIndex(0);
            setUsertype(props.userTypes[0]);
        }
        else
        {
            setCurrTypeIndex(currTypeIndex + 1);
            setUsertype(props.userTypes[currTypeIndex + 1]);
        }
    }

    function handleDownArrow()
    {
        if (usertype === "" || currTypeIndex === 0)
        {
            setCurrTypeIndex(lastTypeIndex);
            setUsertype(props.userTypes[lastTypeIndex]);
        }
        else
        {
            setCurrTypeIndex(currTypeIndex - 1);
            setUsertype(props.userTypes[currTypeIndex - 1]);
        }
    }

    function handleTogglePasswordHide()
    {
        setShowPassword(!showPassword);
    }

    function handleToggleConfirmPasswordHide()
    {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function placeholder() {}

    function handleSubmit(e)
    {
        e.preventDefault();
        props.add(username);
    }

    return(
        <div className = "user">
            {/* main card */}
            <div className = "user-management-add"  id = {props.open ? "open" : ""}>
                {/* icon */}
                <img alt = "" src = {AddUserIcon} className = "icon"></img>
                {/* title */}
                <h1 className = "big">Register New User</h1>
                {/* text */}
                <h1 className = "small">
                    Register new user to control the smart system light for your estate.
                </h1>
                {/* button */}
                <div className = "btn" id = {props.enabled ? "" : "disabled"} onClick = {handleOpenMenu}>
                    <img alt = "" src = {ButtonIcon}></img>
                    <h1>Register New User</h1>
                </div>
            </div>
            {/* dropdown menu */}
            {props.open &&
                <div className = "dashboard-usermanagement-addbox-dropdown-container">
                    <form onSubmit = {handleSubmit}>
                        <input
                            type = "text"
                            id = "usermanagement-input-username"
                            className = "dashboard-usermanagement-addbox-input"
                            name = "username"
                            value = {username}
                            placeholder = "USER NAME"
                            onChange = {handleChangeUsername}
                        ></input>
                        <div style = {{position: "relative"}}>
                            <input
                                style = {{pointerEvents: "none"}}
                                type = "text"
                                id = "usermanagement-input-usertype"
                                className = "dashboard-usermanagement-addbox-input"
                                name = "usertype"
                                value = {usertype}
                                placeholder = "USER TYPE"
                                onChange = {placeholder}
                            ></input>
                            {/* user type select buttons */}
                            <img
                                alt = ""
                                src = {UpArrowIcon}
                                className = "dashboard-usermanagement-addbox-up"
                                onClick = {handleUpArrow}
                            ></img>
                            <img
                                alt = ""
                                src = {DownArrowIcon}
                                className = "dashboard-usermanagement-addbox-down"
                                onClick = {handleDownArrow}
                            ></img>
                        </div>
                        <input
                            type = "text"
                            id = "usermanagement-input-email"
                            className = "dashboard-usermanagement-addbox-input"
                            name = "email"
                            value = {email}
                            placeholder = "EMAIL"
                            onChange = {handleChangeEmail}
                        ></input>
                        <input
                            type = "text"
                            id = "usermanagement-input-contactnumber"
                            className = "dashboard-usermanagement-addbox-input"
                            name = "contactnumber"
                            value = {contactNumber}
                            placeholder = "CONTACT NUMBER"
                            onChange = {handleChangeContactNumber}
                        ></input>
                        <div style = {{position: "relative"}}>
                            <input
                                type = {showPassword ? "text" : "password"}
                                id = "usermanagement-input-password"
                                className = "dashboard-usermanagement-addbox-input"
                                name = "password"
                                value = {password}
                                placeholder = "PASSWORD"
                                onChange = {handleChangePassword}
                            ></input>
                            {/* show/hide password button */}
                            <img 
                                alt = "" 
                                src = {showPassword ? EyeIcon : EyeOffIcon} 
                                className = "dashboard-usermanagement-addbox-hide"
                                onClick = {handleTogglePasswordHide}
                            ></img>
                        </div>
                        <div style = {{position: "relative"}}>
                            <input
                                type = {showConfirmPassword ? "text" : "password"}
                                id = "usermanagement-input-confirmpassword"
                                className = "dashboard-usermanagement-addbox-input"
                                name = "confirmpassword"
                                value = {confirmPassword}
                                placeholder = "CONFIRM PASSWORD"
                                onChange = {handleChangeConfirmPassword}
                            >
                            </input>
                            {/* show/hide password button */}
                            <img 
                                alt = "" 
                                src = {showConfirmPassword ? EyeIcon : EyeOffIcon} 
                                className = "dashboard-usermanagement-addbox-hide"
                                onClick = {handleToggleConfirmPasswordHide}
                            ></img>
                        </div>
                        {/* register button */}
                        <button className = "dashboard-usermanagement-addbox-submit" type = "submit">
                            REGISTER
                        </button>
                    </form>
                </div>
            }
        </div>
    );
}

export default UserManagementAddUser;