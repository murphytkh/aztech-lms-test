import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, useRef, createRef, useMemo, Suspense} from "react";
import {Vector2} from "three";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader";

// data
import {LightData, SceneDataObject, useRefState, saveObj, removeFromArray,
        findLightByName} from "./Utility";
import {getSceneData} from "./MockAPI";

// three components
import UIManager from "./three/UIManager";
import Camera from "./three/Camera";
import {useKeyDown, useKeyUp, useLMBUp, useRMBUp, useCtrlMouseUp} from "./three/Input";
import RaycastManager from "./three/RaycastManager";
import Light from "./three/Light";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";

import defaultImg from "../resources/three/default.png";
import demoDefaultImg from "../resources/three/c1basement1.png";

extend({EffectComposer, RenderPass, OutlinePass, ShaderPass});

// outline of lights when selecting/hovering
const context = React.createContext();
const Outline = ({children}) => 
{
    const {gl, scene, camera, size} = useThree();
    const composer = useRef();
    const [selected, set] = useState([]);
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    useEffect(() => composer.current.setSize(size.width, size.height), [size]);
    useFrame(() => composer.current.render(), 1);
    return (
        <context.Provider value = {set}>
            {children}
            <effectComposer ref = {composer} args = {[gl]}>
                <renderPass attachArray = "passes" args = {[scene, camera]} />
                <outlinePass
                  attachArray = "passes"
                  args = {[aspect, scene, camera]}
                  selectedObjects = {selected}
                  visibleEdgeColor = "white"
                  edgeStrength = {50}
                  edgeThickness = {1}
                />
                <shaderPass 
                    attachArray = "passes" 
                    args = {[FXAAShader]} uniforms-resolution-value = 
                        {[1 / size.width, 1 / size.height]} 
                />
            </effectComposer>
        </context.Provider>
    )
};

function ThreeJsScene(props)
{
    // ui states
    const [disableHotkeys, setDisableHotkeys] = useRefState(false);
    const [cameraEnabled, setCameraEnabled] = useRefState(true);
    const [addMode, setAddMode] = useRefState(false);
    const [phMode, setPhMode] = useState(false);
    const [displayedMsg, setDisplayedMsg] = useState(false);
    const [displayTimeID, setDisplayTimeID] = useState(null);
    const [displayedMsgColour, setDisplayedMsgColour] = useState("#000000");

    // light selection
    const [currPoint, setCurrPoint] = useState([]);
    const [currLightName, setCurrLightName] = useState("");
    const [selectedLights, setSelectedLights] = useRefState([]);
    const [lightHover, setLightHover] = useRefState(null);

    // refs
    const planeRef = createRef();
    const lightArrayRef = useRef([]);

    // data
    const [url, setUrl] = useRefState("");
    const [sceneName, setSceneName] = useRefState("");
    const [floorPlan, setFloorPlan] = useRefState("");
    const [lightData, setLightData] = useRefState([]);

    // makes sure that the sizes of the array holding three objects and
    // lightData are equal
    if (lightArrayRef.current.length !== lightData.current.length)
    {
        lightArrayRef.current = Array(lightData.current.length)
            .fill()
            .map((_, i) => lightArrayRef.current[i] || createRef());
    }

    // array of light positions
    let lights = lightData.current.length && lightData.current.map((obj, i) =>
        {
            return (
                <Light 
                    ref = {lightArrayRef.current[i]}
                    userData = {obj}
                    key = {i} 
                    radius = {0.5} 
                    // callbacks
                    enter = {lightEnter}
                    exit = {lightExit}
                    context = {context}
                />
            );
        }
    );

    // simulate getting data (from MockAPI)
    useEffect(() =>
    {
        setUrl("http://10.1.11.181:8080/resources/");
        setDisableHotkeys(false);
        loadData("default");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // operations on light data
    function addLight(data)
    {
        var arr = [...lightData.current];

        if (!findLightByName(arr, data.name))
        {
            arr.push(data);
            setLightData(arr);
        }
        else
        {
            showMsg("Error: Duplicate light name found", 3000, "#FF0000");
        }
    }

    function removeLight(name)
    {
        var arr = [...lightData.current];
        arr = removeFromArray(arr, name);
        setLightData(arr);
    }

    function lightEnter(name)
    {
        setLightHover(name);
    }

    function lightExit(name)
    {
        setLightHover(null);
    }

    function selectLight(name)
    {
        // disable light selection if currently in add mode
        if (addMode.current)
            return;
        // toggle light selected state
        var arr = [...lightData.current];
        var light = findLightByName(arr, name);

        if (light)
        {
            light.selected = true;

            // add to array of selected lights
            // check if already selected first
            var selectedArr = [...selectedLights.current];
            if (!findLightByName(selectedArr, name))
            {
                selectedArr.push(light);
                setSelectedLights(selectedArr);
            }
        }
    }

    function deselectLight(name)
    {
        // toggle light selected state
        var arr = [...lightData.current];
        var light = findLightByName(arr, name); 

        if (light)
        {
            light.selected = false;

            // remove from aray of selected lights
            // check if exists in array first
            var selectedArr = [...selectedLights.current];
            if (findLightByName(selectedArr, name))
            {
                selectedArr = removeFromArray(selectedArr, name);
                setSelectedLights(selectedArr);
            }
        }
    }

    function deselectLights()
    {
        var arr = [...selectedLights.current];
        for (var i = 0; i < arr.length; ++i)
        {
            deselectLight(arr[i].name);
        }
    }

    function moveToLight(name)
    {
        console.log("move to " + name);
    }

    // file loading
    function loadData(name)
    {
        setSceneName(name);
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

    // config

    function setMode(mode)
    {
        showMsg(mode, 3000, "#000000");
        var arr = [...selectedLights.current];
        for (var i = 0; i < arr.length; ++i)
            arr[i].mode = mode;
        setSelectedLights(arr);
    }

    // ui state handling
    function toggleAdd()
    {
        setAddMode(!addMode.current);
    }

    function togglePlaceholder()
    {
        setPhMode(phMode => !phMode);
    }

    function showMsg(msg, time = 3000, colour = "#FF0000")
    {
        setDisplayedMsg(msg);
        if (displayTimeID)
            clearTimeout(displayTimeID);
        var id = setTimeout(() => {setDisplayedMsg(""); setDisplayTimeID(null);}, time);
        setDisplayTimeID(id);
        setDisplayedMsgColour(colour);
    }

    // input

    // called when mouse is moved on plane
    function setPoint(x, y)
    {
        // update current clicked point
        if (addMode.current)
            setCurrPoint([x, 0, y]);
    }

    function handlePlaneClick()
    {
        // deselect lights if clicked on empty space
        if (selectedLights.current.length && lightHover.current === null)
            deselectLights();

        // add light
        if (addMode.current)
        {
            var data = new LightData(currLightName, currPoint, false, "ON");
            if (currLightName !== "")
                addLight(data);
            else
                showMsg("Error: Please enter light name", 3000, "#FF0000");
        }
    }

    function handleChangeLightName(e)
    {
        setCurrLightName(e.target.value);
    }

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
        if (!disableHotkeys.current) saveScene(sceneName.current);
    });

    useKeyDown("Control", () => {
        setCameraEnabled(false);
    });

    useKeyUp("Control", () => {
        setCameraEnabled(true);
    });

    useLMBUp(() => {
        // select light if rollover-ed any
        if (lightHover.current !== null)
        {
            selectLight(lightHover.current);
            moveToLight(lightHover.current);
        }
    });

    useRMBUp(() => {
        if (addMode.current)
        {
            if (lightHover.current !== null)
            {
                removeLight(lightHover.current);
            }
        }
    });

    useCtrlMouseUp(() => {
        if (lightHover.current !== null)
        {
            var light = findLightByName(lightData.current, lightHover.current);
            if (light)
            {
                light.selected ? deselectLight(lightHover.current) : 
                                 selectLight(lightHover.current);
            }
        }
    });

    return(
        // prevent right click context menu
        <div className = "three-scene-page" onContextMenu = {(e) => e.preventDefault()}>
            {/* ui */}
            <UIManager 
                // ui state tracking
                add = {addMode.current}
                ph = {phMode}
                // data
                selectedLights = {selectedLights.current}
                // buttons
                toggleAdd = {toggleAdd} 
                togglePh = {togglePlaceholder}
                // input fields
                lightName = {currLightName}
                setLightName = {handleChangeLightName}
                setMode = {setMode}
                // focus setting
                focus = {handleFocus}
                blur = {handleBlur}
                // display messages
                displayText = {displayedMsg}
                displayColour = {displayedMsgColour}
            />
            {/* set bg colour on canvas */}
            <Canvas onCreated = {state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera 
                    disableHotkeys = {disableHotkeys.current} 
                    controlsEnabled = {!addMode.current && cameraEnabled.current} 
                />
                <RaycastManager plane = {planeRef} setPoint = {setPoint} />
                {/* default scene lighting */}
                <directionalLight color = {0xFFFFFF} intensity = {2} />
                <ambientLight />
                {/* elements */}
                <Suspense fallback = {null}>
                    <Plane 
                        ref = {planeRef} 
                        width = {100} 
                        height = {71}
                        /* 
                        img = {floorPlan.current === "default" ? 
                                defaultImg : 
                                url.current + floorPlan.current + ".png"}
                        */
                       img = {floorPlan.current === "default" ?
                                demoDefaultImg :
                                url.current + floorPlan.current + ".png"}
                        onClick = {handlePlaneClick}
                    />
                </Suspense>
                {/* placement indicator */}
                {addMode.current && 
                <IndicatorSphere radius = {0.5} position = {currPoint} colour = {0x000000} />}
                <Outline>
                    {lights}
                </Outline>
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;