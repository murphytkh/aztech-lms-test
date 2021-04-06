import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, createRef, Suspense} from "react";
import {Canvas} from "@react-three/fiber";

// data
import {getThreeData} from "./MockAPI";

// three components
import Camera from "./three/Camera";
import {useKeyUp, useLMBUp, useRMBUp} from "./three/Input";
import RaycastManager from "./three/RaycastManager";
import Sphere from "./three/Sphere";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";

function ThreeJsScene(props)
{
    // ui
    const [addMode, setAddMode] = useState(false);
    const [phMode, setPhMode] = useState(false);
    const [currPoint, setCurrPoint] = useState([]);

    // refs
    const planeRef = createRef();

    // data
    const [floorPlan, setFloorPlan] = useState([]);
    const [lightPos, setLightPos] = useState([]);

    // array of light positions
    let lights = lightPos.length && lightPos.map((obj, i) =>
        <Sphere key = {i} radius = {0.5} position = {obj} colour = {0x808080} />
    );

    // data loading
    function loadData(id)
    {
        var data = getThreeData(id);
        let tmp = data.lights.map(obj => 
            [obj.pos[0], 0, obj.pos[1]]
        );

        setFloorPlan(data.img);
        setLightPos(tmp);
    }

    // simulate getting data (move to MockAPI or JSON later)
    useEffect(() =>
    {
        // load c1basement1 by default
        loadData(0);
    }, []);

    // ui state handling
    function toggleAdd()
    {
        setAddMode(addMode => !addMode);
    }

    function togglePlaceholder()
    {
        setPhMode(phMode => !phMode);
    }

    // ui events

    // called when mouse is moved on plane
    function setPoint(x, y)
    {
        // update current clicked point
        if (addMode)
            setCurrPoint([x, 0, y]);
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

    // input

    useKeyUp(" ", () => {
        toggleAdd();
    });

    useKeyUp("1", () => {
        loadData(0);
    });

    useKeyUp("2", () => {
        loadData(1);
    });

    //useLMBUp(() => {
    //    console.log("akjsas");
    //});

    //useRMBUp(() => {
    //    console.log("rmb");
    //});

    return(
        // prevent right click context menu
        <div className = "three-scene-page" onContextMenu = {(e) => e.preventDefault()}>
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
                <Suspense fallback = {null}>
                    <Plane 
                        ref = {planeRef} 
                        width = {100} 
                        height = {71}
                        img = {floorPlan}
                        onClick = {handlePlaneClick}
                    />
                </Suspense>
                {/* placement indicator */}
                {addMode && 
                <IndicatorSphere 
                    radius = {0.5} 
                    position = {currPoint} 
                    colour = {0x808080}
                />}
                {lights}
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;