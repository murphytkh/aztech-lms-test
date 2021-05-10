import "../../resources/css/three-js-ui-msg.css";

import React from "react";
import {useSelector} from "react-redux";

function UIMsgDisplay(props)
{
    const text = useSelector((state) => state.displayMsg.value);
    const colour = useSelector((state) => state.displayColour.value);

    return(
        <div>
            {text &&
                <div className="three-ui-box" id="display-msg" style={{color: colour}}>
                    {text}
                </div>
            }
        </div>
    );
}

export default UIMsgDisplay;