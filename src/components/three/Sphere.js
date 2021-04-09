import React, {useRef, forwardRef, useState} from "react";

const Sphere = forwardRef((props, ref) => 
{
    const [hovered, setHover] = useState(false)

    function printName()
    {
        console.log(props.name);
    }

    return (
        <mesh
            {...props}
            ref = {ref}
            // default scale 1
            scale = {1}
            // on click
            //onClick = {(event) => setActive(!active)}
            onClick = {printName}
            // on rollover
            onPointerOver = {(event) => setHover(true)}
            // on exit
            onPointerOut = {(event) => setHover(false)}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color = {hovered ? "orange" : props.colour} />
        </mesh>
    )
});

export default Sphere;