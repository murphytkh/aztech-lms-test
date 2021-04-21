import "../../resources/css/three-js-ui-readme.css";

import React, {useState} from "react";

function UIReadMe(props)
{
    const [hide, setHide] = useState(false);

    function handleClick()
    {
        setHide(hide => !hide);
    }

    return (
        <div className = "three-ui-box" id = "readme">
            <div className = "toggle" onClick = {handleClick}>
                {hide ? "Show Controls" : "Hide Controls"}
            </div>
            {!hide && 
                <div>
                    <h1>View Mode:</h1>
                    <h1>LMB - Pan/Select Light</h1>
                    <h1>RMB - Rotate</h1>
                    <h1>CTRL + LMB - Multiselect</h1>
                    <h1>Scroll Wheel - Zoom</h1>
                    <h1>Space - Toggle Add Mode</h1>
                    <h1>G - Toggle Group Mode</h1>
                    <h1>1/2/3 - Select Groups 0/1/2</h1>
                    <h1>Q - Load c1basement1</h1>
                    <h1>W - Load c1basement2</h1>
                    <h1>N - Toggle Names</h1>
                    <h1>R - Reset Camera</h1>
                    <h1>S - Save</h1>
                    <h1> </h1>
                    <h1>Add Mode:</h1>
                    <h1>LMB - Add Light</h1>
                    <h1>RMB - Remove</h1>
                    <h1> </h1>
                    <h1>
                        Dynamic loading only works locally for now, 
                        loads c1basement1 by default.
                    </h1>
                </div>
            }
        </div>
    );
}

export default UIReadMe;