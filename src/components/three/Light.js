import React, {forwardRef, useState} from "react";

// <mesh userData={{hello: "world"}} />

const Light = forwardRef((props, ref) => 
{
    const [hovered, setHover] = useState(false)

    function printName()
    {
        console.log(props.userData.name);
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
            onClick = {printName}
            // on rollover
            onPointerOver = {(e) => setHover(true)}
            // on exit
            onPointerOut = {(e) => setHover(false)}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color = {hovered ? "orange" : props.colour} />
        </mesh>
    )
});

export default Light;