import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, createRef, Suspense} from "react";
import * as THREE from "three";
import {useThree, Canvas} from "@react-three/fiber";

// three components
import Camera from "./three/Camera";
import RaycastManager from "./three/RaycastManager";
import Sphere from "./three/Sphere";
import Plane from "./three/Plane";

function ThreeJsScene(props)
{
    // ui states
    const [addMode, setAddMode] = useState(false);
    const [phMode, setPhMode] = useState(false);

    // element refs
    const planeRef = createRef();

    // data
    const [lightPos, setLightPos] = useState("");

    // array of light positions
    let lights = lightPos.length && lightPos.map((obj, i) =>
        <Sphere key = {i} radius = {0.5} position = {[obj[0], obj[1], 0]} colour = {0x808080} />
    );

    // simulate getting light positions (move to MockAPI later)
    useEffect(() =>
    {
        var tmp = [];
        tmp.push([-1.2, 0]);
        tmp.push([1.2, 0]);

        setLightPos(tmp);
    }, []);

    // ui state handling
    function toggleAdd()
    {
        setAddMode(!addMode);
    }

    function togglePlaceholder()
    {
        setPhMode(!phMode);
    }

    return(
        <div className = "three-scene-page">
            {/* ui elements */}
            <div className = "three-btn-container">
                <div className = "btn" onClick = {toggleAdd}>
                    {addMode ? "ADD" : "VIEW"}
                </div>
                <div className = "btn" onClick = {togglePlaceholder}>
                    {phMode ? "TEST1" : "TEST0"}
                </div>
                <div className = "btn" onClick = {toggleAdd}>
                    QWE
                </div>
            </div>
            {/* set bg colour on canvas */}
            <Canvas onCreated = {state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera />
                <RaycastManager plane = {planeRef} />
                {/* default scene lighting */}
                <directionalLight color = {0xFFFFFF} intensity = {1.5} />
                {/* elements */}
                {lights}
                <Suspense fallback={null}>
                    <Plane ref = {planeRef} width = {100} height = {71} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;