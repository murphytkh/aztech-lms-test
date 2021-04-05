import React, {useEffect, useState} from "react";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {Rad} from "../Utility";

const Camera = React.forwardRef((props, ref) => 
{
    // get default elements from scene
    const {camera, gl} = useThree();

    // camera parameters
    const [minPan, setMinPan] = useState("");
    const [maxPan, setMaxPan] = useState("");

    // initialise camera
    useEffect(() =>
    {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.mouseButtons ={LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE};
        controls.enableDamping = false;
        // camera properties
        controls.rotateSpeed = 0.5;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Rad(86);
        // camera initial facing
        controls.target.set(0.0, 0.0, 0.0);
        camera.position.set(0.0, 45.4, 0.0);
        controls.update();
        // limit camera panning
        setMinPan(new THREE.Vector3(-40.0, -40.0, -20.0));
        setMaxPan(new THREE.Vector3(40.0, 40.0, 20.0));
        // limit camera zoom
        controls.minDistance = 5.0;
        controls.maxDistance = 45.4;
        return() => {controls.dispose();};
    }, [camera, gl]);

    return null;
});

export default Camera;