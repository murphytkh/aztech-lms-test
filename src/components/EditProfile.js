import "../resources/css/editprofile.css";

import React, {useState, useEffect} from "react";

import EditPhoto from "../resources/dashboard/edit-photo.svg";
import UpArrowIcon from "../resources/dashboard/icon-triangle-up.svg";
import DownArrowIcon from "../resources/dashboard/icon-triangle-down.svg";
import EyeIcon from "../resources/dashboard/icon-eye.svg";
import EyeOffIcon from "../resources/dashboard/icon-eye-off.svg";

class UserObject
{
    constructor(name, role, image)
    {
        this.name = name;
        this.role = role;
        this.image = image;
    }
}

function EditProfile(props)
{
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currTypeIndex, setCurrTypeIndex] = useState(0);
    const [lastTypeIndex, setLastTypeIndex] = useState(0);

    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // simulate getting data
    useEffect(() =>
    {
        setCurrTypeIndex(0);
        setLastTypeIndex(props.userTypes.length - 1);
    }, [props.userTypes]);

    function handleImageChange()
    {
        console.log("image select clicked");
    }

    function handleChangeUsername(e)
    {
        setUsername(e.target.value);
    }

    function handleChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function handleChangeContactNumber(e)
    {
        setContactNumber(e.target.value);
    }

    function handleChangeCurrPassword(e)
    {
        setCurrPassword(e.target.value);
    }

    function handleChangeNewPassword(e)
    {
        setNewPassword(e.target.value);
    }

    function handleChangeConfirmPassword(e)
    {
        setConfirmPassword(e.target.value);
    }

    function handleToggleCurrPasswordHide()
    {
        setShowCurrPassword(!showCurrPassword);
    }

    function handleToggleNewPasswordHide()
    {
        setShowNewPassword(!showNewPassword);
    }

    function handleToggleConfirmPasswordHide()
    {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function handleUpArrow()
    {
        if (position === "" || currTypeIndex === lastTypeIndex)
        {
            setCurrTypeIndex(0);
            setPosition(props.userTypes[0]);
        }
        else
        {
            setCurrTypeIndex(currTypeIndex + 1);
            setPosition(props.userTypes[currTypeIndex + 1]);
        }
    }

    function handleDownArrow()
    {
        if (position === "" || currTypeIndex === 0)
        {
            setCurrTypeIndex(lastTypeIndex);
            setPosition(props.userTypes[lastTypeIndex]);
        }
        else
        {
            setCurrTypeIndex(currTypeIndex - 1);
            setPosition(props.userTypes[currTypeIndex - 1]);
        }
    }

    function placeholder() {}

    function handleCancel()
    {
        props.setEditProfile();
    }

    function handleSubmit()
    {
        let user = new UserObject(username, position, props.currUser.image);
        props.setCurrUser(user);
        props.setEditProfile();
        console.log("submitted profile edit");
    }

    return(
        <div className = "dashboard-page-editprofile" style = {{zIndex: 15}}>
            {/* bg colour */}
            <div className = "dashboard-page-editprofile-bg" style = {{zIndex: 0}}></div>
            <div className = "dashboard-page-editprofile-container" style = {{zIndex: 1}}>
                {/* header */}
                <div className = "dashboard-page-editprofile-header">
                    <div className = "dashboard-page-editprofile-header-text0">USER SETTINGS</div>
                    <div className = "dashboard-page-editprofile-header-text1">EDIT PROFILE</div>
                    <img alt = "" src = {props.currUser.image} className = "dashboard-page-editprofile-header-img"></img>
                    <img 
                        alt = "" 
                        src = {EditPhoto} 
                        className = "dashboard-page-editprofile-header-button"
                        onClick = {handleImageChange}
                    ></img>
                </div>
                {/* inputs */}
                <input
                    type = "text"
                    id = "editprofile-input-username"
                    className = "dashboard-editprofile-input-first"
                    name = "username"
                    value = {username}
                    placeholder = "USERNAME"
                    onChange = {handleChangeUsername}
                ></input>
                <div style = {{position: "relative"}}>
                    <input
                        style = {{pointerEvents: "none"}}
                        type = "text"
                        id = "editprofile-input-position"
                        className = "dashboard-editprofile-input"
                        name = "position"
                        value = {position}
                        placeholder = "POSITION"
                        onChange = {placeholder}
                    ></input>
                    <img
                        alt = ""
                        src = {UpArrowIcon}
                        className = "dashboard-editprofile-input-up"
                        onClick = {handleUpArrow}
                    ></img>
                    <img
                        alt = ""
                        src = {DownArrowIcon}
                        className = "dashboard-editprofile-input-down"
                        onClick = {handleDownArrow}
                    ></img>
                </div>
                <input
                    type = "text"
                    id = "editprofile-input-email"
                    className = "dashboard-editprofile-input"
                    name = "email"
                    value = {email}
                    placeholder = "EMAIL"
                    onChange = {handleChangeEmail}
                ></input>
                <input
                    type = "text"
                    id = "editprofile-input-contactnumber"
                    className = "dashboard-editprofile-input"
                    name = "contactnumber"
                    value = {contactNumber}
                    placeholder = "CONTACT NUMBER"
                    onChange = {handleChangeContactNumber}
                ></input>
                <div style = {{position: "relative"}}>
                    <input
                        type = {showCurrPassword ? "text" : "password"}
                        id = "editprofile-input-currpassword"
                        className = "dashboard-editprofile-input"
                        name = "currpassword"
                        value = {currPassword}
                        placeholder = "CURRENT PASSWORD"
                        onChange = {handleChangeCurrPassword}
                    ></input>
                    <img 
                        alt = "" 
                        src = {showCurrPassword ? EyeIcon : EyeOffIcon} 
                        className = "dashboard-editprofile-hide"
                        onClick = {handleToggleCurrPasswordHide}
                    ></img>
                </div>
                <div style = {{position: "relative"}}>
                    <input
                        type = {showNewPassword ? "text" : "password"}
                        id = "editprofile-input-newpassword"
                        className = "dashboard-editprofile-input"
                        name = "newpassword"
                        value = {newPassword}
                        placeholder = "NEW PASSWORD"
                        onChange = {handleChangeNewPassword}
                    ></input>
                    <img 
                        alt = "" 
                        src = {showNewPassword ? EyeIcon : EyeOffIcon} 
                        className = "dashboard-editprofile-hide"
                        onClick = {handleToggleNewPasswordHide}
                    ></img>
                </div>
                <div style = {{position: "relative"}}>
                    <input
                        type = {showConfirmPassword ? "text" : "password"}
                        id = "editprofile-input-confirmpassword"
                        className = "dashboard-editprofile-input"
                        name = "confirmpassword"
                        value = {confirmPassword}
                        placeholder = "CONFIRM PASSWORD"
                        onChange = {handleChangeConfirmPassword}
                    ></input>
                    <img 
                        alt = "" 
                        src = {showConfirmPassword ? EyeIcon : EyeOffIcon} 
                        className = "dashboard-editprofile-hide"
                        onClick = {handleToggleConfirmPasswordHide}
                    ></img>
                </div>
                {/* buttons */}
                <div className = "dashboard-page-editprofile-cancel" onClick = {handleCancel}>CANCEL</div>
                <div className = "dashboard-page-editprofile-submit" onClick = {handleSubmit}>SUBMIT</div>
            </div>
        </div>
    );
}

export default EditProfile;