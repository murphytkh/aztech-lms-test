import "../../resources/css/three-js-ui-msg.css";

import React from "react";

function UIMsgDisplay(props)
{
    return(
        <div>
            {props.text &&
                <div 
                    className = "three-ui-box" 
                    id = "display-msg" 
                    style = {{color: props.colour}}
                >
                    {props.text}
                </div>
            }
        </div>
    );
}

export default UIMsgDisplay;