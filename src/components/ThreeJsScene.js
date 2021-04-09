import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, createRef, Suspense} from "react";
import {Canvas} from "@react-three/fiber";

// data
import {Light, SceneDataObject, useRefState, saveObj} from "./Utility.js";
import {getSceneData} from "./MockAPI";

// three components
import UIManager from "./three/UIManager";
import Camera from "./three/Camera";
import {useKeyUp, useLMBUp, useRMBUp} from "./three/Input";
import RaycastManager from "./three/RaycastManager";
import Sphere from "./three/Sphere";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";

import defaultImg from "../resources/three/default.png";

function ThreeJsScene(props)
{
    // ui
    const [disableHotkeys, setDisableHotkeys] = useRefState(false);
    const [addMode, setAddMode] = useState(false);
    const [phMode, setPhMode] = useState(false);
    const [currPoint, setCurrPoint] = useState([]);
    const [lightName, setLightName] = useState("");

    // refs
    const planeRef = createRef();

    // data
    const [url, setUrl] = useRefState("");
    const [floorPlan, setFloorPlan] = useRefState("");
    const [lightData, setLightData] = useRefState([]);

    // array of light positions
    let lights = lightData.current.length && lightData.current.map((obj, i) =>
        <Sphere key = {i} radius = {0.5} position = {obj.pos} colour = {0x808080} />
    );

    // simulate getting data (from MockAPI)
    useEffect(() =>
    {
        setUrl("http://10.1.11.181:8080/resources/");
        setDisableHotkeys(false);
        loadData("default");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // file loading
    function loadData(name)
    {
        // load from local without .json if default
        if (name === "default")
        {
            setFloorPlan("default");
            setLightData([]);
        }
        else
        {
        // get data from api
            getSceneData(url.current, name)
            // api call successful
            .then((res) => {
                setFloorPlan(res.data.img);
                setLightData(res.data.lights);
            })
            // error
            .catch((err) => {console.log(err)});
        }
    }
    
    function saveScene(name)
    {
        saveObj(new SceneDataObject(floorPlan.current, lightData.current), name);
    }

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
        // add light
        if (addMode)
        {
            var arr = [...lightData.current];
            arr.push(new Light("testadd", currPoint));
            setLightData(arr);
        }
    }

    // input

    function handleFocus()
    {
        setDisableHotkeys(true);
    }

    function handleBlur()
    {
        setDisableHotkeys(false);
    }

    useKeyUp(" ", () => {
        if (!disableHotkeys.current) toggleAdd();
    });

    useKeyUp("1", () => {
        if (!disableHotkeys.current) loadData("c1basement1");
    });

    useKeyUp("2", () => {
        if (!disableHotkeys.current) loadData("c1basement2");
    });

    useKeyUp("s", () => {
        if (!disableHotkeys.current) saveScene("test");
    });

    //useLMBUp(() => {
    //    console.log("akjsas");
    //});

    //useRMBUp(() => {
    //    console.log("rmb");
    //});

    function handleChangeLightName(e)
    {
        setLightName(e.target.value);
    }

    return(
        // prevent right click context menu
        <div className = "three-scene-page" onContextMenu = {(e) => e.preventDefault()}>
            {/* ui elements */}
            <div className = "three-ui-container">
                <div className = "btn-container">
                    <div className = "btn" onClick = {toggleAdd}>
                        {addMode ? "ADD" : "VIEW"}
                    </div>
                    <div className = "btn" onClick = {togglePlaceholder}>{
                        phMode ? "TEST1" : "TEST0"}
                    </div>
                    <div className = "btn" onClick = {toggleAdd}>QWE</div>
                </div>
                <input
                    id = {addMode ? "" : "hide"}
                    type = "text"
                    name = "light-name"
                    value = {lightName}
                    placeholder = "Enter light name"
                    onChange = {handleChangeLightName}
                    onFocus = {handleFocus}
                    onBlur = {handleBlur}
                    disabled = {!addMode}
                />
            </div>
            {/* set bg colour on canvas */}
            <Canvas onCreated = {state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera controlsEnabled = {!addMode} />
                <RaycastManager plane = {planeRef} setPoint = {setPoint} />
                {/* default scene lighting */}
                <directionalLight color = {0xFFFFFF} intensity = {1.5} />
                {/* elements */}
                <Suspense fallback = {null}>
                    <Plane 
                        ref = {planeRef} 
                        width = {100} 
                        height = {71}
                        img = {floorPlan.current === "default" ? 
                                defaultImg : 
                                url.current + floorPlan.current + ".png"}
                        onClick = {handlePlaneClick}
                    />
                </Suspense>
                {/* placement indicator */}
                {addMode && 
                <IndicatorSphere radius = {0.5} position = {currPoint} colour = {0x808080} />}
                {lights}
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;