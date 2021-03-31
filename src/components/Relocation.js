import "../resources/css/view-relocation.css";

import React, {useState, useEffect} from "react";

function Relocation(props)
{
    const [location, setLocation] = useState("");

    function handleChangeLocation(e)
    {
        setLocation(e.target.value);
    }

    function handleSubmit()
    {
        props.setRelocation();
        props.relocate(props.name, location);
    }

    // simulate getting data
    useEffect(() =>
    {

    }, []);

    return(
        <div className = "pop-up" style = {{zIndex: 15}}>
            {/* relocation card */}
            <div className = "fade" style = {{zIndex: 0}}></div>
            <div className = "container" id = "relocation" style = {{zIndex: 1}}>
                {/* header */}
                <div className = "pop-up-header" id = "relocation">
                    <h1 className = "title">RELOCATION</h1>
                    <h1 className = "subtitle">PLEASE ENTER NEW LOCATION FOR LIGHT</h1>
                </div>
                {/* input */}
                <input
                    type = "text"
                    name = "location"
                    value = {location}
                    placeholder = {props.name + " - " + props.location}
                    onChange = {handleChangeLocation}
                ></input>
                {/* buttons */}
                <div className = "btn" id = "cancel" onClick = {props.setRelocation}>CANCEL</div>
                <div className = "btn" id = "submit" onClick = {handleSubmit}>SUBMIT</div>
            </div>
        </div>
    );
}

export default Relocation;