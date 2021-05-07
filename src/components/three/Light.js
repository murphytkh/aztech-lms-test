/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useRef, useContext} from "react";
import store from "../../redux/store";
import {Html} from "@react-three/drei";
import {Vector3} from "three";
import {findLightByName} from "../Utility";

function LightSphere(props)
{
    const ref = useRef();
    const setOutline = useContext(props.context);

    function handleOver()
    {
        props.enter(props.userData.name);
    }

    function handleOut()
    {
        props.exit(props.userData.name);
    }

    // update outline states on selected status change
    useEffect(() => {
        if (props.userData.highlight)
            setOutline(state => [...state, ref.current]);
        else
            setOutline(state => state.filter(mesh => mesh !== ref.current));
    }, [props.userData.highlight]);

    // colour selection
    function colour()
    {
        if (props.showGroups)
        {
            if (props.userData.group in props.groupColours)
                return props.groupColours[props.userData.group];
            else
                return "#808080";
        }
        else
        {
            if (props.userData.mode === "OFF")
                return "#808080";
            else if (props.userData.mode === "ON")
                return "#7EC0EE";
            else
                return "#00FF00";
        }
    }

    return (
        <mesh
            {...props}
            
            ref = {ref}
            // properties
            userData = {props.userData}
            position = {props.userData.pos}
            // default scale 1
            scale = {1}

            onPointerOver = {handleOver}
            onPointerOut = {handleOut}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color = {colour()} />
            {/* name overlay */}
            {props.showNames &&
                <Html style = {{pointerEvents: "none"}}>
                    <div className = "three-light-overlay">
                        {props.userData.name}
                    </div>
                </Html>
            }
        </mesh>
    )
};

function Light(props)
{
    let arrows = props.userData.triggerees.length && props.userData.triggerees.map((obj, i) =>
    {
        let offset = props.radius * 0.6;
        let pos = props.userData.pos;
        let origin = new Vector3(pos[0], pos[1] + offset, pos[2]);
        let destpos = findLightByName(store.getState().allLights.value, obj).pos;
        let dest = new Vector3(destpos[0], destpos[1] + offset, destpos[2]);
        let dir = new Vector3();
        dir.subVectors(dest, origin).normalize();
        let dist = origin.distanceTo(dest);

        return (
            <arrowHelper
                key = {i}
                args = {[dir, origin, dist - offset, 0xFF0000, 0.5, 0.3]}
            />
        );
    });

    return (
        <group>
            {/* light object itself */}
            <LightSphere {...props} />
            {/* trigger arrows */}
            {props.showTriggers &&
                arrows
            }
        </group>
    );
}

export default Light;