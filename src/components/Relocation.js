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
        <div className = "pop-up" style = {{zIndex: 15}}>
            {/* relocation card */}
            <div className = "fade" style = {{zIndex: 0}}></div>
            <div className = "container" id = "relocation" style = {{zIndex: 1}}>
            </div>
        </div>
    );
}

export default Relocation;