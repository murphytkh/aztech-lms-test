import "../resources/css/editprofile.css";

import React from "react";

function EditProfile(props)
{
    return(
        <div className = "dashboard-page-editprofile" style = {{zIndex: 15}}>
            {/* bg colour */}
            <div className = "dashboard-page-editprofile-bg" style = {{zIndex: 0}}></div>
            <div className = "dashboard-page-editprofile-container" style = {{zIndex: 16}}>
                {/* header */}
                <div onClick = {props.setEditProfile} className = "dashboard-page-editprofile-header">

                </div>
                {/* inputs */}

                {/* buttons */}

            </div>


        </div>
    );
}

export default EditProfile;