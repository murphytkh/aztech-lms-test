import "../resources/css/editprofile.css";

import React from "react";

function EditProfile(props)
{
    return(
        <div className = "dashboard-page-editprofile" style = {{zIndex: 15}}>
            <div className = "dashboard-page-editprofile-bg" style = {{zIndex: -1}}></div>
            <h1 style = {{zIndex: 10, color: "#FFFFFF"}} onClick = {props.setEditProfile}>EEDIT PROFILE</h1>
        </div>
    );
}

export default EditProfile;