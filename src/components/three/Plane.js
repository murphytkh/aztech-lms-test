import React, {useEffect} from "react";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";

import {Rad} from "../Utility";

import floorImg from "../../resources/three/c1basement1.png";

const Plane = React.forwardRef((props, ref) => 
{
    const img = useLoader(THREE.TextureLoader, floorImg);

    // place it flat facing up by default
    useEffect(() =>
    {
        ref.current.rotation.x = Rad(-90);
    }, [ref]);

    return (
        <mesh
            {...props}
            ref = {ref}
            // default scale 1
            scale = {1}
        >
            {/* width, height */}
            <planeBufferGeometry args = {[props.width, props.height]} />
            <meshLambertMaterial attach = "material" map = {img} />
        </mesh>
    )
});

export default Plane;