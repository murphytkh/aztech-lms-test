import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";

import {Rad} from "../Utility";

import floorImg from "../../resources/three/c1basement1.png";

function Plane(props) 
{
    const mesh = useRef();

    const img = useLoader(THREE.TextureLoader, floorImg);

    // place it flat facing up by default
    useEffect(() =>
    {
        mesh.current.rotation.x = Rad(-90);
    }, [mesh]);

    return (
        <mesh
            {...props}
            ref = {mesh}
            // default scale 1
            scale = {1}
        >
            {/* width, height */}
            <planeBufferGeometry args = {[props.width, props.height]} />
            <meshLambertMaterial attach = "material" map = {img} />
        </mesh>
    )
}

export default Plane;