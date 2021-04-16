import {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";
import {SelectionBox} from "three/examples/jsm/interactive/SelectionBox";
import {Vector2} from "three";

function SelectionBoxHelper(props)
{
    // selection box
    const {mouse, camera, scene, gl} = useThree();
    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);

    let pointerDown = (event) =>
    {
        if (!selecting.current)
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
        if (selecting.current)
        {
            selectionBox.select();
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curr = selectionBox.select();
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setHighlight(curr);

            var s = selectionBox.startPoint;
            var e = selectionBox.endPoint;

            var topLeft = new Vector2();
            var top, left, width, height;

            var t = {x: Math.abs(s.x - e.x), y: Math.abs(s.y - e.y)};

            topLeft.x = Math.min(s.x, e.x);
            topLeft.y = Math.max(s.y, e.y);

            top = 100 - (topLeft.y + 1) * 50;
            left = (topLeft.x + 1) * 50;
            width = t.x * 50;
            height = t.y * 50;

            console.log(top, left);

            props.setTop(top.toString());
            props.setLeft(left.toString());
            props.setWidth(width.toString());
            props.setHeight(height.toString());
        }
    }

    let pointerUp = (event) =>
    {
        if (selecting.current || !event.button)
        {
            selecting.current = false;
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curr = selectionBox.select();
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setSelection(curr);
            props.setTop("0");
            props.setLeft("0");
            props.setWidth("0");
            props.setHeight("0");
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