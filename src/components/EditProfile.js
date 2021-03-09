import "../resources/css/editprofile.css";

import React from "react";

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
    function handleCancel()
    {
        props.setEditProfile();
    }

    function handleSubmit()
    {
        props.setEditProfile();
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
                </div>
                {/* inputs */}

                {/* buttons */}
                <div className = "dashboard-page-editprofile-cancel" onClick = {handleCancel}>CANCEL</div>
                <div className = "dashboard-page-editprofile-submit" onClick = {handleSubmit}>SUBMIT</div>
            </div>
        </div>
    );
}

export default EditProfile;