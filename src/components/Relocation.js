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
        <div className = "relocation-container" style = {{zIndex: 15}}>
            <div className = "pop-up">
                
            </div>
        </div>
    );
}

export default Relocation;