import "../../resources/css/three-js-ui.css";

import React from "react";

function ThreeConfigButton(props)
{
    function handleClick()
    {
        props.click(props.text);
    }

    return(
        <div 
            className = "three-btn" 
            style = {{backgroundColor: props.colour}}
            onClick = {handleClick}
        >
            {props.text}
        </div>
    );
}

function UIManager(props)
{
    return(
        <div className = "three-ui-container">
            {/* buttons */}
            <div className = "btn-container">
                <div className = "btn" onClick = {props.toggleAdd}>
                    {props.add ? "ADD" : "VIEW"}
                </div>
                <div className = "btn" onClick = {props.togglePh}>
                    {props.ph ? "TEST1" : "TEST0"}
                </div>
                <div className = "btn" onClick = {props.toggleAdd}>123</div>
            </div>
            {/* inputs */}
            <input
                id = {props.add ? "" : "hide"}
                type = "text"
                name = "three-light-name"
                value = {props.lightName}
                placeholder = "Enter light name"
                onChange = {props.setLightName}
                onFocus = {props.focus}
                onBlur = {props.blur}
                disabled = {!props.add}
            />
            {/* readme */}
            <div className = "three-ui-textbox" id = "readme">
                <h1>View Mode:</h1>
                <h1>LMB - Pan/Select Light</h1>
                <h1>RMB - Rotate</h1>
                <h1>CTRL + LMB - Multiselect</h1>
                <h1>Scroll Wheel - Zoom</h1>
                <h1>Space - Toggle Add Mode</h1>
                <h1>S - Save</h1>
                <h1> </h1>
                <h1>Add Mode:</h1>
                <h1>LMB - Add Light</h1>
                <h1>RMB - Remove</h1>
                <h1> </h1>
                <h1>Dynamic loading only works locally for now, 
                    loads c1basement1 by default.</h1>
            </div>
            {/* config */}
            {props.selectedLights.length > 0 &&
            <div className = "three-ui-textbox" id = "config">
                <div className = "light-name">
                    {props.selectedLights.length > 1 ? 
                        "Multiple Lights Selected" : 
                        props.selectedLights[0].name}
                </div>
                <div className = "btn-group">
                    <ThreeConfigButton 
                        click = {props.setMode} 
                        text = "ON" 
                        colour = {"#3497fD"}
                    />
                    <ThreeConfigButton 
                        click = {props.setMode} 
                        text = "OFF" 
                        colour = {"#6D6E71"}
                    />
                    <ThreeConfigButton 
                        click = {props.setMode} 
                        text = "NORMAL" 
                        colour = {"#A0BC34"}
                    />
                </div>
            </div>}
            {/* message display */}
            {props.displayText &&
            <div 
                className = "three-ui-textbox" 
                id = "display-msg" 
                style = {{color: props.displayColour}}
            >
                {props.displayText}
            </div>}
        </div>
    );
}

export default UIManager;