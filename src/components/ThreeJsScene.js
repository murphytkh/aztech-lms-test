import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, createRef, Suspense} from "react";
import {Canvas} from "@react-three/fiber";

// three components
import Camera from "./three/Camera";
import RaycastManager from "./three/RaycastManager";
import Sphere from "./three/Sphere";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";

function ThreeJsScene(props)
{
    // ui states
    const [addMode, setAddMode] = useState(false);
    const [phMode, setPhMode] = useState(false);

    // element refs
    const planeRef = createRef();

    // data
    const [lightPos, setLightPos] = useState([]);
    const [currPoint, setCurrPoint] = useState([]);
    // array of light positions
    let lights = lightPos.length && lightPos.map((obj, i) =>
        <Sphere key = {i} radius = {0.5} position = {[obj[0], 0, obj[1]]} colour = {0x808080} />
    );

    // simulate getting light positions (move to MockAPI later)
    useEffect(() =>
    {
        var tmp = [];
        //tmp.push([-1.2, 0]);
        //tmp.push([1.2, 0]);

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

    // ui events
    function setPoint(x, y)
    {
        setCurrPoint([x, y]);
    }

    function handlePlaneClick()
    {
        if (addMode)
        {
            var arr = [...lightPos];
            arr.push(currPoint);
            setLightPos(arr);
        }
    }

    return(
        // disable right click context menu, input events
        <div 
            className = "three-scene-page"
            onContextMenu = {(e) => e.preventDefault()}
        >
            {/* ui elements */}
            <div className = "three-btn-container">
                <div onClick = {toggleAdd}>{addMode ? "ADD" : "VIEW"}</div>
                <div onClick = {togglePlaceholder}>{phMode ? "TEST1" : "TEST0"}</div>
                <div onClick = {toggleAdd}>QWE</div>
            </div>
            {/* set bg colour on canvas */}
            <Canvas onCreated = {state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera controlsEnabled = {!addMode} />
                <RaycastManager plane = {planeRef} setPoint = {setPoint} />
                {/* default scene lighting */}
                <directionalLight color = {0xFFFFFF} intensity = {1.0} />
                {/* elements */}
                <Suspense fallback={null}>
                    <Plane 
                        ref = {planeRef} 
                        width = {100} 
                        height = {71}
                        onClick = {handlePlaneClick}
                    />
                </Suspense>
                {/* placement indicator */}
                {addMode && 
                <IndicatorSphere 
                    radius = {0.5} 
                    position = {[currPoint[0], 0, currPoint[1]]} 
                    colour = {0x808080}
                />}
                {lights}
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;