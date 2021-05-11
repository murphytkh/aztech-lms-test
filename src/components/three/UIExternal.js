import "../../resources/css/three-js-ui-external.css";

import React from "react";

function UIExternal(props)
{
    return(
        <div className="btn-container">
            <div className="btn" onClick={props.toggleAdd}>
                {props.add ? "ADD" : "VIEW"}
            </div>
            <div className="btn" onClick={props.togglePh}>
                {props.ph ? "TEST1" : "TEST0"}
            </div>
            <div className="btn" onClick={props.toggleAdd}>123</div>
        </div>
    );
}

export default UIExternal;