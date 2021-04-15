import React, {useState, useEffect, useRef, createRef, Suspense} from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {SelectionBox} from "three/examples/jsm/interactive/SelectionBox";

function SelectionBoxHelper(props)
{
    // selection box
    const {mouse, camera, scene, gl} = useThree();
    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);
    let selection = useRef([]);
    let getMousePos = (event) => [(event.clientX / window.innerWidth) * 2 - 1,
                                 -(event.clientY / window.innerHeight) * 2 + 1];
    let appendSelection = (toAppend) =>
    {
        selection.current = Array.from(new Set(selection.current.concat(toAppend)));
        props.setSelection(selection.current);
    }

    let pointerDown = (event) =>
    {
        let {clientX, clientY, altKey, ctrlKey} = event;
        if (!altKey && !selecting.current)
        {
            let [startX, startY] = getMousePos(event);
            selecting.current = true;
            selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
        }
    }

    let pointerMove = (event) =>
    {
        if (selecting.current)
        {
            let {clientX, clientY} = event;
            let [endX, endY] = getMousePos(event);
            selectionBox.select();
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            selectionBox.select();
        }
    }

    let pointerUp = (event) =>
    {
        if (selecting.current || !event.button)
        {
            selecting.current = false;
            let {ctrlKey} = event;
            let [endX, endY] = getMousePos(event);
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curSelected = selectionBox.select();
            curSelected = curSelected.filter((obj) => obj.userData.hasOwnProperty("selected"));

            if (ctrlKey)
                props.setSelection(curSelected);
            else
                selection.current = curSelected;
        }
    }

    useEffect(() =>{
        gl.domElement.onpointermove = pointerMove;
        gl.domElement.onpointerup = pointerUp;
        gl.domElement.onpointerdown = pointerDown;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}

export default SelectionBoxHelper;