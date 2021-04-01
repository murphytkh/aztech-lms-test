import React, { useRef, useState } from "react";
//import {useFrame} from "@react-three/fiber";

function Sphere(props) 
{
    const mesh = useRef()

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // called every frame
    //useFrame(() => (mesh.current.rotation.x += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            // default scale 1
            scale={1}
            // on click
            onClick={(event) => setActive(!active)}
            // on rollover
            onPointerOver={(event) => setHover(true)}
            // on exit
            onPointerOut={(event) => setHover(false)}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args={[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color={hovered ? "orange" : props.colour} />
        </mesh>
    )
}

export default Sphere;