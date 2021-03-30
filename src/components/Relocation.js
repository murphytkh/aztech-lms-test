import "../resources/css/view-relocation.css";

import React, {useState, useEffect} from "react";

function Relocation(props)
{
    const [location, setLocation] = useState("");

    function handleChangeLocation(e)
    {
        setLocation(e.target.value);
    }

    // simulate getting data
    useEffect(() =>
    {

    }, []);

    return(
        //<div className = "dashboard-page-editprofile" style = {{zIndex: 15}}>
        //    {/* bg colour */}
        //    <div className = "dashboard-page-editprofile-bg" style = {{zIndex: 0}}></div>
        //    <div className = "dashboard-page-editprofile-container" style = {{zIndex: 1}}>
        //        {/* header */}
        //        <div className = "dashboard-page-editprofile-header"></div>
        //        {/* inputs */}
        //        <input
        //            type = "text"
        //            id = "relocation"
        //            className = "dashboard-editprofile-input-first"
        //            name = "location"
        //            value = {location}
        //            placeholder = "LOCATION"
        //            onChange = {handleChangeLocation}
        //        ></input>
        //        {/* buttons */}
        //        <div className = "dashboard-page-editprofile-cancel" onClick = {handleCancel}>CANCEL</div>
        //        <div className = "dashboard-page-editprofile-submit" onClick = {handleOk}>OK</div>
        //    </div>
        //</div>
        <div className = "relocation-container" style = {{zIndex: 15}}>
            <div className = "pop-up">
                
            </div>
        </div>
    );
}

export default Relocation;