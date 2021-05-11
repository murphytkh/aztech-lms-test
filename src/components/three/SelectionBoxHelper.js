import {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";
import {useDispatch} from "react-redux";
import {SelectionBox} from "three/examples/jsm/interactive/SelectionBox";
import {Vector2, Vector3} from "three";
import {setSbTop, setSbLeft, setSbWidth, setSbHeight} from "../../redux/threeDataSlice";

function SelectionBoxHelper(props)
{
    const dispatch = useDispatch();

    // selection box
    const {mouse, camera, scene, gl} = useThree();
    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);

    let pointerDown = (event) =>
    {
        if (event.button !== 2 && !selecting.current)
        {
            let {ctrlKey} = event;
            if (ctrlKey)
            {
                selecting.current = true;
                selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
                selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            }
        }
    }

    let pointerMove = (event) =>
    {
        // update selection box size and currently selcted lights
        if (selecting.current)
        {
            let curr = selectionBox.select();
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setHighlight(curr);
            
            var s = selectionBox.startPoint;
            var e = new Vector3(mouse.x, mouse.y, 0.5);

            var topLeft = new Vector2();
            var top, left, width, height;

            var t = {x: Math.abs(s.x - e.x), y: Math.abs(s.y - e.y)};
            topLeft.x = Math.min(s.x, e.x);
            topLeft.y = Math.max(s.y, e.y);

            top = 100 - (topLeft.y + 1) * 50;
            left = (topLeft.x + 1) * 50;
            width = t.x * 50;
            height = t.y * 50;
            dispatch(setSbTop(top));
            dispatch(setSbLeft(left));
            dispatch(setSbWidth(width));
            dispatch(setSbHeight(height));
        }
    }

    let pointerUp = (event) =>
    {
        // select lights within box
        if (event.button !== 2 && selecting.current)
        {
            selecting.current = false;
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curr = selectionBox.select();
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setSelection(curr);
            dispatch(setSbTop(0));
            dispatch(setSbLeft(0));
            dispatch(setSbWidth(0));
            dispatch(setSbHeight(0));
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