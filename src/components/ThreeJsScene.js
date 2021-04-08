import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, createRef, Suspense, useRef} from "react";
import {Canvas} from "@react-three/fiber";

// data
import {Light, useRefState} from "./Utility.js";
import {getSceneData} from "./MockAPI";

// three components
import Camera from "./three/Camera";
import {useKeyUp, useLMBUp, useRMBUp} from "./three/Input";
import RaycastManager from "./three/RaycastManager";
import Sphere from "./three/Sphere";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";
import axios from "axios";

function ThreeJsScene(props)
{
    // ui
    const [addMode, setAddMode] = useState(false);
    const [phMode, setPhMode] = useState(false);
    const [currPoint, setCurrPoint] = useState([]);

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
        loadData("c1basement1");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //return axios.get("http://10.1.11.181:8080/resources/c1basement1.png")
    //    // get response
    //    .then(function (response) {
    //        return response.data;
    //    })
    //    // error catching
    //    .catch(function (error) {
    //        console.log(error);
    //    })

    // file saving/loading
    function loadData(name)
    {
        setFloorPlan(name);

        //axios.get("http://10.1.11.181:8080/resources/c1basement1.png")
        //    .then(res => {
        //        console.log(res);
        //    })
        //    .catch(err => {
        //        console.log(err);
        //    });

        //var data = getSceneData(name).then(response => {
        //    //setFloorPlan(response);
        //    console.log(response);
        //})
        //setFloorPlan(data);
        //setFloorPlan(data.img);
        //setLightData(data.lights);
    }
    
    function saveScene(name)
    {
        // this works but its so hacky lol
        //setLightData(x => {
        //    console.log(x);
        //    return x;
        //})

        var array = [floorPlan.current];
        array = array.concat(lightData.current);
        const json = JSON.stringify(array);
        const blob = new Blob([json], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${name}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
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
        if (addMode)
        {
            var arr = [...lightData.current];
            arr.push(new Light("testadd", currPoint));
            setLightData(arr);
        }
    }

    // input

    useKeyUp(" ", () => {
        toggleAdd();
    });

    useKeyUp("1", () => {
        loadData("c1basement1");
    });

    useKeyUp("2", () => {
        loadData("c1basement2");
    });

    useKeyUp("s", () => {
        saveScene("test");
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
                <directionalLight color = {0xFFFFFF} intensity = {1.5} />
                {/* elements */}
                <Suspense fallback = {null}>
                    <Plane 
                        ref = {planeRef} 
                        width = {100} 
                        height = {71}
                        img = {url.current + floorPlan.current + ".png"}
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