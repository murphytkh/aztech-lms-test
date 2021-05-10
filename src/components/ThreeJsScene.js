import "../resources/css/three-js-scene.css";

import React, {useState, useEffect, useRef, createRef, Suspense} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Canvas} from "@react-three/fiber";

// redux store
import store from "../redux/store";
import {setAdd, setDisableHotkeys, setEditTrigger, 
        setAllLights} from "../redux/threeDataSlice";

// data
import {useRefState, saveObj, initLight, removeLight, findLightByName, selectLight, 
        deselectLight, deselectLights, setLightsProperty, selectLightsByProperty, 
        selectionBoxHighlight, deepCopy, clearTriggers} from "./Utility";
import {getSceneData} from "./MockAPI";

// three components
import Effects from "./three/Effects";
import UIManager from "./three/UIManager";
import Camera from "./three/Camera";
import {useKeyDown, useKeyUp, useLMBDown, useMouseMove,
        useLMBUp, useRMBUp, useCtrlMouseUp} from "./three/Input";
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
    BLUE : "#0000FF",
    SUCCESS_GREEN: "#A0BC34"
}

// outline of lights when selecting/hovering
const context = React.createContext();
const Outline = ({children}) => 
{
    const composer = useRef();
    const [selected, set] = useState([]);

    return(
        <context.Provider value={set}>
            {children}
            <Effects ref={composer} selected={selected} />
        </context.Provider>
    );
};

function ThreeJsScene(props)
{
    const dispatch = useDispatch();

    // ui states in redux store

    // overall light data
    const allLights = useSelector((state) => state.allLights.value);

    // wrappers for set functions (if needed)
    function setLights(lights)
    {
        dispatch(setAllLights(lights));
    }

    // ui states
    const [cameraEnabled, setCameraEnabled] = useRefState(true);
    const [phMode, setPhMode] = useState(false);
    const [displayedMsg, setDisplayedMsg] = useState(false);
    const [displayTimeID, setDisplayTimeID] = useRefState(null);
    const [displayedMsgColour, setDisplayedMsgColour] = useState(COLOUR.BLACK);
    const [showNames, setShowNames] = useRefState(true);
    const [showGroups, setShowGroups] = useRefState(false);
    const [showTriggers, setShowTriggers] = useRefState(true);
    const [mouseMoved, setMouseMoved] = useRefState(false);

    // light selection
    const [currPoint, setCurrPoint] = useState([]);
    const [currLightName, setCurrLightName] = useState("");

    const [lightHover, setLightHover] = useRefState(null);
    const [currGroup, setCurrGroup] = useState("");

    // selection box (mouse drag)
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // refs
    const cameraRef = useRef();
    const planeRef = createRef();
    const groupSearchRef = useRef();

    // data
    const [url, setUrl] = useRefState("");
    const [sceneName, setSceneName] = useRefState("");
    const [floorPlan, setFloorPlan] = useRefState("");
    const [groupColours, setGroupColours] = useRefState({});

    // array of light objects
    let lights = allLights.length && allLights.map((obj, i) =>
        {
            return (
                <Light 
                    groupColours={groupColours.current}
                    userData={obj}
                    key={i} 
                    showNames={showNames.current}
                    showGroups={showGroups.current}
                    showTriggers={showTriggers.current}
                    // callbacks
                    enter={lightEnter}
                    exit={lightExit}
                    context={context}
                />
            );
        }
    );

    // simulate getting data (from MockAPI)
    useEffect(() =>
    {
        setUrl("http://10.1.11.181:8080/resources/");
        dispatch(setDisableHotkeys(false));
        loadData("default");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // operations on light data
    function addLight()
    {
        // initial data
        var arr = deepCopy(store.getState().allLights.value);
        var data = initLight(currLightName, currPoint);

        if (!findLightByName(arr, data.name))
        {
            // update array with new light
            arr.push(data);
            setLights(arr);
            showMsg("Added " + data.name, 3000, COLOUR.SUCCESS_GREEN);
        }
        else
        {
            showMsg("Error: Duplicate light name found", 3000, COLOUR.RED);
        }
    }

    function deleteLight(name)
    {
        var arr = deepCopy(store.getState().allLights.value);
        // remove this light from all trigger groups
        clearTriggers(arr, name);
        // update array after removing light and reset hover name
        removeLight(arr, name);
        deselectLight(name);
        setLights(arr);
        showMsg(name + " removed", 3000, COLOUR.BLACK);
        setLightHover(null);
    }

    function updateTrigger(triggerer, triggeree, add)
    {
        // skip if trying to add trigger to itself
        if (triggerer === triggeree)
            return;
        
        // get references to triggerer (source) and triggeree (target)
        var arr = deepCopy(store.getState().allLights.value);
        var triggererLight = findLightByName(arr, triggerer);
        var triggereeLight = findLightByName(arr, triggeree);
        // check if trigger already exists
        var exists = triggererLight.triggerees.includes(triggeree);

        // add trigger
        if (add)
        {
            if (exists)
            {
                showMsg("Error: Trigger already exists", 3000, COLOUR.RED);
            }
            else
            {
                // update trigger tables of both triggerer and triggeree
                triggererLight.triggerees.push(triggeree);
                triggereeLight.triggerers.push(triggerer);
                showMsg(triggeree + " added as triggeree of " + triggerer, 3000, COLOUR.GREEN);
            }
        }
        // remove trigger
        else
        {
            if (exists)
            {
                // update trigger tables of both triggerer and triggeree
                var i = triggererLight.triggerees.findIndex(obj => obj === triggeree);
                var j = triggereeLight.triggerers.findIndex(obj => obj === triggerer);
                triggererLight.triggerees.splice(i, 1);
                triggereeLight.triggerers.splice(j, 1);
                showMsg(triggeree + " removed as triggeree of " + triggerer, 3000, COLOUR.GREEN);
            }
            else
            {
                showMsg("Error: Trigger does not exist", 3000, COLOUR.RED);
            }
        }

        // update array
        setLights(arr);
    }

    function lightEnter(name)
    {
        // set current light name and update highlight status
        setLightHover(name);
        setLightsProperty([name], "highlight", true);
    }

    function lightExit(name)
    {
        // check if light exists
        var arr = deepCopy(store.getState().allLights.value);
        var light = findLightByName(arr, name);

        if (light)
        {
            // if unselected, remove highlight on exit
            if (light.selected !== true)
                setLightsProperty([name], "highlight", false);
            setLightHover(null);
        }
    }

    function moveToLight(name)
    {
        // get position of light to move to
        var light = findLightByName(store.getState().allLights.value, name);
        if (light)
            cameraRef.current.setMoveCamera(light.pos[0], light.pos[1], light.pos[2]);
    }

    function setLightName(name, newName)
    {
        // check if light exists
        var arr = deepCopy(store.getState().allLights.value);
        var light = findLightByName(arr, name);

        if (light)
        {
            if (findLightByName(arr, newName))
            {
                showMsg("Error: Name already exists", 3000, COLOUR.RED);
            }
            else
            {
                // update light name and array
                light.name = newName;
                setLights(arr);
                showMsg("Updated successfully", 3000, COLOUR.SUCCESS_GREEN);
            }
        }
    }

    // mouse drag box multi select
    function selectInBox(selection)
    {
        for (var i = 0; i < selection.length; ++i)
            selectLight(selection[i].userData.name);

        if (selection.length > 1)
            dispatch(setEditTrigger(false));
    }

    // set highlight on given lights
    function setHighlight(selection)
    {
        selectionBoxHighlight(selection);
    }

    // update mode and trigger relevant triggerees
    function setMode(mode)
    {
        var arr = deepCopy(store.getState().allLights.value);
        var names = arr.filter(obj => obj.selected).map(obj => obj.name);

        if (mode === "ON")
        {
            var triggerees = [];

            for (var i = 0; i < names.length; ++i)
            {
                var tmp = findLightByName(arr, names[i]);
                triggerees.push(...tmp.triggerees);
            }
    
            triggerees = [...new Set(triggerees)];
            setLightsProperty(triggerees, "mode", mode);
        }

        setLightsProperty(names, "mode", mode);
        showMsg(mode, 3000, COLOUR.BLACK);
    }

    function setGroup(group)
    {
        var arr = deepCopy(store.getState().allLights.value);
        var names = arr.filter(obj => obj.selected).map(obj => obj.name);

        setLightsProperty(names, "group", group);
        showMsg("Assigned to " + group, 3000, COLOUR.SUCCESS_GREEN);
    }

    function selectGroup(group)
    {
        deselectLights(setLights);
        setCurrGroup(group);
        selectLightsByProperty("group", group);
    }

    // file loading
    function loadData(name)
    {
        setSceneName(name);
        // load from local without .json if default
        if (name === "default")
        {
            setFloorPlan("default");
            setLights([]);
            setGroupColours({});
        }
        else
        {
            // get data from api
            getSceneData(url.current, name)
            // api call successful
            .then((res) => {
                setFloorPlan(res.data.img);
                setLights(res.data.lights);
                setGroupColours(res.data.groupColours);
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
        var arr = deepCopy(store.getState().allLights.value);

        saveObj({img: floorPlan.current, 
                lights: arr, 
                groupColours: groupColours.current}, 
                name);
    }

    // ui state handling
    function toggleAdd()
    {
        let curr = store.getState().add.value;
        store.dispatch(setAdd(!curr));
        console.log(curr);
        // set focus on input on switching to add mode
        if (!curr)
        {
            var tmp = document.getElementsByTagName("INPUT");

            if (tmp[1])
                tmp[1].focus();
        }
    }

    //function toggleEditTriggerMode(state)
    //{
    //    var result;

    //    if(state === undefined)
    //        result = !editTriggerMode.current;
    //    else
    //        result = state;

    //    setEditTriggerMode(result);
    //    showMsg("Edit triggers " + (result ? "ON" : "OFF"), 3000, COLOUR.BLACK);
    //}

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

    // update mouse-plane position when moved
    function setPoint(x, y)
    {
        // update current clicked point
        if (store.getState().add.value)
            setCurrPoint([x, 0, y]);
    }

    function handlePlaneClick()
    {
        var arr = deepCopy(store.getState().allLights.value);
        var haveSelected = false;

        for (var i = 0; i < arr.length; ++i)
        {
            if (arr[i].selected)
            {
                haveSelected = true;
                break;
            }
        }

        // deselect lights if clicked on empty space
        if (haveSelected && 
            lightHover.current === null && 
            cameraEnabled.current &&
            !mouseMoved.current)
        {
            deselectLights();
            dispatch(setEditTrigger(false));
        }

        // add light
        if (store.getState().add.value)
        {
            if (currLightName !== "")
                addLight();
            else
                showMsg("Error: Please enter light name", 3000, COLOUR.RED);
        }

        setMouseMoved(false);
    }

    function handleFocus()
    {
        dispatch(setDisableHotkeys(true));
    }

    function handleBlur()
    {
        dispatch(setDisableHotkeys(false));
    }

    useKeyUp(" ", () => {
        if (!store.getState().disableHotkeys.value) toggleAdd();
    });

    useKeyUp("1", () => {
        if (!store.getState().disableHotkeys.value)
        {
            deselectLights();
            selectLightsByProperty("group", "0");
        }
    });

    useKeyUp("2", () => {
        if (!store.getState().disableHotkeys.value)
        {
            deselectLights();
            selectLightsByProperty("group", "1");
        }
    });

    useKeyUp("3", () => {
        if (!store.getState().disableHotkeys.value)
        {
            deselectLights();
            selectLightsByProperty("group", "2");
        }
    });

    useKeyUp("q", () => {
        if (!store.getState().disableHotkeys.value) loadData("c1basement1");
    });

    useKeyUp("w", () => {
        if (!store.getState().disableHotkeys.value) loadData("c1basement2");
    });

    useKeyUp("g", () => {
        if (!store.getState().disableHotkeys.value) setShowGroups(!showGroups.current);
    });

    useKeyUp("t", () => {
        if (!store.getState().disableHotkeys.value) setShowTriggers(!showTriggers.current);
    });

    useKeyUp("s", () => {
        if (!store.getState().disableHotkeys.value) saveScene(sceneName.current);
    });

    useKeyUp("n", () => {
        if (!store.getState().disableHotkeys.value) setShowNames(!showNames.current);
    });

    useKeyDown("Control", () => {
        setCameraEnabled(false);
    });

    useKeyUp("Control", () => {
        setCameraEnabled(true);
    });

    useMouseMove(() => {
        setMouseMoved(true);
    });

    useLMBDown(() => {
        setMouseMoved(false);
    });

    useLMBUp((e) => {
        var light = lightHover.current;
        // select light if rollover-ed any
        if (light !== null)
        {
            if (!store.getState().editTrigger.value)
            {
                deselectLights();
                selectLight(light);
                moveToLight(light);
            }
            else
            {
                var arr = store.getState().allLights.value;
                var name = "";

                for (var i = 0; i < arr.length; ++i)
                {
                    if (arr[i].selected)
                    {
                        name = arr[i].name;
                        break;
                    }
                }
                
                updateTrigger(name, lightHover.current, true);
            }
        }

        // remove focus on group search input 
        if (groupSearchRef.current && !groupSearchRef.current.contains(e.target))
            groupSearchRef.current.blur();
    });

    useRMBUp(() => {
        // removing lights while in add mode
        if (store.getState().add.value)
        {
            if (lightHover.current !== null)
                deleteLight(lightHover.current);
        }

        // remove triggers while in edit trigger mode
        if (store.getState().editTrigger.value)
        {
            if (lightHover.current !== null)
            {
                var arr = allLights;
                var name = "";
                for (var i = 0; i < arr.length; ++i)
                {
                    if (arr[i].selected)
                    {
                        name = arr[i].name;
                        break;
                    }
                }

                updateTrigger(name, lightHover.current, false);
            }
        }
    });

    useCtrlMouseUp(() => {
        // single ctrl + click multiselect
        if (lightHover.current !== null)
        {
            var arr = deepCopy(store.getState().allLights.value);

            var light = findLightByName(arr, lightHover.current);
            if (light)
            {
                if (light.selected)
                    deselectLight(light.name);
                else if (!store.getState().add.value)
                {
                    selectLight(light.name);
                    dispatch(setEditTrigger(false));
                }
            }
        }
    });

    return(
        // prevent right click context menu
        <div className="three-scene-page" onContextMenu={(e) => e.preventDefault()}>
            {/* ui */}
            <UIManager 
                // ui state tracking
                ph={phMode}
                group={showGroups.current}
                // buttons
                toggleAdd={toggleAdd} 
                togglePh={togglePlaceholder}
                // input fields
                currLightName={currLightName}
                setCurrLightName={setCurrLightName}
                currGroup={currGroup}
                setCurrGroup={selectGroup}
                groupColours={groupColours.current}
                setGroupColours={setGroupColours}
                setLightName={setLightName}
                setMode={setMode}
                setGroup={setGroup}
                // focus setting
                focus={handleFocus}
                blur={handleBlur}
                groupSearchRef={groupSearchRef}
                // display messages
                displayText={displayedMsg}
                displayColour={displayedMsgColour}
            />
            {/* selection box for mouse drag */}
            <div 
                className="selection-box"
                style={{
                            display: (width === 0 || height === 0) ? "none" : "block",
                            top: top + "%",
                            left: left + "%",
                            width: width + "%", 
                            height: height + "%"
                        }}
            />
            {/* set bg colour on canvas */}
            <Canvas onCreated={state => state.gl.setClearColor(0xC0C0C0)}>
                <Camera 
                    ref={cameraRef}
                    controlsEnabled={!store.getState().add.value && cameraEnabled.current} 
                />
                <RaycastManager plane={planeRef} setPoint={setPoint} />
                {/* multiselect selection box */}
                <SelectionBoxHelper 
                    setSelection={selectInBox}
                    setHighlight={setHighlight}
                    setTop={setTop}
                    setLeft={setLeft}
                    setWidth={setWidth}
                    setHeight={setHeight}
                />
                {/* default scene lighting */}
                <directionalLight color={0xFFFFFF} intensity={2} />
                <ambientLight />
                {/* elements */}
                <Suspense fallback={null}>
                    <Plane 
                        ref={planeRef} 
                        width={100} 
                        height={71}
                        /* 
                        img = {floorPlan.current === "default" ? 
                                defaultImg : 
                                url.current + floorPlan.current + ".png"}
                        */
                       img={floorPlan.current === "default" ?
                            demoDefaultImg :
                                url.current + floorPlan.current + ".png"}
                        onClick={handlePlaneClick}
                    />
                </Suspense>
                {/* placement indicator */}
                {store.getState().add.value && 
                <IndicatorSphere radius={0.5} position={currPoint} colour={0x000000} />}
                <Outline>{lights}</Outline>
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;