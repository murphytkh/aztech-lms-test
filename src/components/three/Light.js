import React, {forwardRef, useState} from "react";

// <mesh userData={{hello: "world"}} />

const Light = forwardRef((props, ref) => 
{
    const[hover, setHover] = useState(false);

    function colour()
    {
        if (props.userData.selected)
            return "red";
        else if (hover)
            return "orange";
        else
            return props.colour;
    }

    function handleOnClick()
    {
        props.click(props.userData.name);
    }

    function handleOnOver()
    {
        //setHover(true);
        props.enter(props.userData.name);
    }

    function handleExit()
    {
        //setHover(false);
        props.exit(props.userData.name);
    }

    return (
        <mesh
            {...props}
            ref = {ref}
            // properties
            userData = {props.userData}
            position = {props.userData.pos}
            // default scale 1
            scale = {1}
            // on click
            //onClick = {(event) => setActive(!active)}
            onClick = {handleOnClick}
            // on rollover
            onPointerOver = {handleOnOver}
            // on exit
            onPointerOut = {handleExit}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color = {colour()} />
        </mesh>
    )
});

export default Light;