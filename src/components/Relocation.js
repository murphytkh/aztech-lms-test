import "../resources/css/view-relocation.css";

import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {setRelocation} from "../redux/dashboardUISlice";

function Relocation(props)
{
    const dispatch = useDispatch();

    const relocation = useSelector((state) => state.relocation.value);
    const [location, setLocation] = useState("");

    // relocation button functions
    function handleChangeLocation(e)
    {
        setLocation(e.target.value);
    }

    function handleRelocate()
    {
        dispatch(setRelocation(!relocation));
    }

    function handleSubmit()
    {
        dispatch(setRelocation(!relocation));
        props.relocate(props.name, location);
    }

    return(
        <div className="pop-up" style={{zIndex: 15}}>
            {/* relocation card */}
            <div className="fade" style={{zIndex: 0}}></div>
            <div className="container" id="relocation" style={{zIndex: 1}}>
                {/* header */}
                <div className="pop-up-header" id="relocation">
                    <h1 className="title">RELOCATION</h1>
                    <h1 className="subtitle">PLEASE ENTER NEW LOCATION FOR LIGHT</h1>
                </div>
                {/* input */}
                <input
                    type="text"
                    name="location"
                    value={location}
                    placeholder={props.name + " - " + props.location}
                    onChange={handleChangeLocation}
                ></input>
                {/* buttons */}
                <div className="btn" id="cancel" onClick={handleRelocate}>CANCEL</div>
                <div className="btn" id="submit" onClick={handleSubmit}>SUBMIT</div>
            </div>
        </div>
    );
}

export default Relocation;