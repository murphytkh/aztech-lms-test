import "../resources/css/editprofile.css";

import React, {useState} from "react";

import EditPhoto from "../resources/dashboard/edit-photo.svg";

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

    function handleImageChange()
    {
        console.log("image select clicked");
    }

    function handleChangeUsername(e)
    {
        setUsername(e.target.value);
    }

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
                    className = "dashboard-editprofile-input"
                    name = "username"
                    value = {username}
                    placeholder = "USERNAME"
                    onChange = {handleChangeUsername}
                ></input>
                {/* buttons */}
                <div className = "dashboard-page-editprofile-cancel" onClick = {handleCancel}>CANCEL</div>
                <div className = "dashboard-page-editprofile-submit" onClick = {handleSubmit}>SUBMIT</div>
            </div>
        </div>
    );
}

export default EditProfile;