import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, useRef, createRef, Suspense} from "react";
import {Canvas,} from "@react-three/fiber";

// data
import {LightData, useRefState, saveObj, removeFromArray, findLightByName,
        selectLight, deselectLight, setLightsProperty} from "./Utility";
import {getSceneData} from "./MockAPI";

// three components
import Effects from "./three/Effects";
import UIManager from "./three/UIManager";
import Camera from "./three/Camera";
import {useKeyDown, useKeyUp, useLMBUp, useRMBUp, useCtrlMouseUp} from "./three/Input";
import RaycastManager from "./three/RaycastManager";
import SelectionBoxHelper from "./three/SelectionBoxHelper";
import Light from "./three/Light";
import IndicatorSphere from "./three/IndicatorSphere";
import Plane from "./three/Plane";

//import defaultImg from "../resources/three/default.png";
import demoDefaultImg from "../resources/three/c1basement1.png";

// colours
const COLOUR = {
    BLACK : "#000000",
    WHITE : "#FFFFFF",
    RED : "#FF0000",
    GREEN : "#00FF00",
    BLUE : "#0000FF"
}

// outline of lights when selecting/hovering
const context = React.createContext();
const Outline = ({children}) => 
{
    const composer = useRef();
    const [selected, set] = useState([]);
    return (
        <context.Provider value = {set}>
            {children}
            <Effects ref = {composer} selected = {selected} />
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
    const [displayTimeID, setDisplayTimeID] = useRefState(null);
    const [displayedMsgColour, setDisplayedMsgColour] = useState(COLOUR.BLACK);

    // light selection
    const [currPoint, setCurrPoint] = useState([]);
    const [currLightName, setCurrLightName] = useState("");
    const [selectedLights, setSelectedLights] = useRefState([]);
    const [lightHover, setLightHover] = useRefState(null);
    const [width, setWidth] = useState("0");
    const [height, setHeight] = useState("0");

    // refs
    const cameraRef = useRef();
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
            showMsg("Added " + data.name, 3000, "#A0BC34");
        }
        else
        {
            showMsg("Error: Duplicate light name found", 3000, COLOUR.RED);
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
        setLightsProperty([name], "highlight", true, lightData.current, setLightData);
    }

    function lightExit(name)
    {
        setLightHover(null);
        setLightsProperty([name], "highlight", false, lightData.current, setLightData);
    }

    function deselectLights()
    {
        var arr = [...selectedLights.current];
        for (var i = 0; i < arr.length; ++i)
        {
            deselectLight(arr[i].name, selectedLights.current, setSelectedLights);
        }
    }

    function moveToLight(name)
    {
        var light = findLightByName(lightData.current, name);
        if (light)
            cameraRef.current.setMoveCamera(light.pos[0], light.pos[1], light.pos[2]);
    }

    function setLightName(name, newName)
    {
        var arr = [...lightData.current];
        var light = findLightByName(arr, name);

        if (light)
        {
            if (findLightByName(arr, newName))
            {
                showMsg("Error: Name already exists", 3000, COLOUR.RED);
            }
            else
            {
                light.name = newName;
                setLightData(arr);
                showMsg("Updated successfully", 3000, "#A0BC34");
            }
        }
    }

    function selectInBox(selection)
    {
        for (var i = 0; i < selection.length; ++i)
        {
            selection[i].userData.selected = true;
            selectLight(selection[i].userData.name, lightData.current, 
                        selectedLights.current, setSelectedLights)
        }
    }

    function setHighlight(selection)
    {
        var names = selection.map((obj) => obj.userData.name);
        setLightsProperty(names, "highlight", true, lightData.current, setLightData);
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
                showMsg("Loaded " + res.data.img, 3000, COLOUR.GREEN);
            })
            // error
            .catch((err) => {
                console.log(err);
                showMsg("Error: Failed to load " + name);
            });
        }
    }
    
    function saveScene(name)
    {
        saveObj({img: floorPlan.current, lights: lightData.current}, name);
    }

    // config

    function setMode(mode)
    {
        showMsg(mode, 3000, COLOUR.BLACK);
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

    function showMsg(msg, time = 3000, colour = COLOUR.RED)
    {
        setDisplayedMsg(msg);
        if (displayTimeID.current)
            clearTimeout(displayTimeID.current);
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
        if (selectedLights.current.length && 
            lightHover.current === null && 
            cameraEnabled.current)
            deselectLights();

        // add light
        if (addMode.current)
        {
            var data = new LightData(currLightName, currPoint, false, false, "ON");
            if (currLightName !== "")
                addLight(data);
            else
                showMsg("Error: Please enter light name", 3000, COLOUR.RED);
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
        var light = lightHover.current;
        // select light if rollover-ed any
        if (light !== null)
        {
            deselectLights();
            selectLight(light, lightData.current, selectedLights.current, setSelectedLights);
            moveToLight(light);
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
                if (light.selected)
                    deselectLight(light.name, selectedLights.current, setSelectedLights);
                else if (!addMode.current)
                    selectLight(light.name, lightData.current, 
                                selectedLights.current, setSelectedLights);
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
                currLightName = {currLightName}
                setCurrLightName = {handleChangeLightName}
                setLightName = {setLightName}
                //setEditLightName = {}
                setMode = {setMode}
                // focus setting
                focus = {handleFocus}
                blur = {handleBlur}
                // display messages
                displayText = {displayedMsg}
                displayColour = {displayedMsgColour}
            />
            <div 
                className = "testing-box"
                style = {{width: width + "px", height: height + "px"}}
            />
            {/* set bg colour on canvas */}
            <Canvas onCreated = {state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera 
                    ref = {cameraRef}
                    disableHotkeys = {disableHotkeys} 
                    controlsEnabled = {!addMode.current && cameraEnabled.current} 
                />
                <RaycastManager plane = {planeRef} setPoint = {setPoint} />
                {/* multiselect selection box */}
                <SelectionBoxHelper 
                    setSelection = {selectInBox}
                    setHighlight = {setHighlight}
                    selected = {selectedLights.current}
                    setWidth = {setWidth}
                    setHeight = {setHeight}
                />
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
                <IndicatorSphere 
                    radius = {0.5} 
                    position = {currPoint} 
                    colour = {0x000000} 
                />}
                <Outline>
                    {lights}
                </Outline>
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;