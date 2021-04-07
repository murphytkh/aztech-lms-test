import React, {useEffect, forwardRef} from "react";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";

import {Rad} from "../Utility";

const Plane = forwardRef((props, ref) => 
{
    const img = useLoader(THREE.TextureLoader, props.img);
    // place it flat facing up by default
    useEffect(() =>
    {
        ref.current.rotation.x = Rad(-90);
    }, [ref]);

    return (
        <mesh {...props} ref = {ref} scale = {1}>
            {/* width, height */}
            <planeBufferGeometry args = {[props.width, props.height]} />
            <meshLambertMaterial attach = "material" map = {img} />
        </mesh>
    )
});

export default Plane;