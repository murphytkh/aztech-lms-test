import React, {useEffect} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {useKeyUp} from "./Input";
import {Rad} from "../Utility";

let controls;

const Camera = React.forwardRef((props, ref) => 
{
    // get default elements from scene
    const {camera, gl} = useThree();

    function ResetCamera()
    {
        controls.target.set(0.0, 0.0, 0.0);
        camera.position.set(0.0, 45.4, 0.0);
        controls.update();
    }

    useFrame(() =>
    {
        if (controls)
            controls.enabled = props.controlsEnabled;
    });

    // key input
    useKeyUp("r", () => {
        ResetCamera();
    });

    // initialise camera
    useEffect(() =>
    {
        controls = new OrbitControls(camera, gl.domElement);
        controls.mouseButtons ={LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE};
        controls.enableDamping = false;
        // camera properties
        controls.rotateSpeed = 0.5;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Rad(86);
        // camera initial facing
        controls.target.set(0.0, 0.0, 0.0);
        camera.position.set(0.0, 45.4, 0.0);
        // limit camera zoom
        controls.minDistance = 5.0;
        controls.maxDistance = 45.4;
        controls.update();
        
        return() => {controls.dispose();};
    }, [camera, gl]);

    return null;
});

export default Camera;