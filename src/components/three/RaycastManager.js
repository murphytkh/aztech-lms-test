import React, {useEffect, useState} from "react";
import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";

function RaycastManager(props)
{
    // get default elements from scene
    const {mouse, camera, raycaster} = useThree();

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera);
        if (props.plane.current)
        {
            var intersect = raycaster.intersectObject(props.plane.current);
            if (intersect.length)
            {
                console.log(intersect);
            }
        }
    })

    return null;
};

export default RaycastManager;