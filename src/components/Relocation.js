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
        //<div className = "relocation-container" style = {{zIndex: 15}}>
        //    <div className = "pop-up">
        //        <div className = "fade" style = {{zIndex: 0}}></div>
        //        <div className = "container" id = "relocation" style = {{zIndex: 1}}>
        //
        //        </div>
        //    </div>
        //</div>
        <div className = "pop-up" style = {{zIndex: 15}}>
            {/* edit profile card */}
            <div className = "fade" id = "relocation" style = {{zIndex: 0}}></div>
            <div className = "container" id = "relocation" style = {{zIndex: 1}}>
            </div>
        </div>
    );
}

export default Relocation;