import React, {useRef, forwardRef, useState, useContext, useCallback} from "react";
import {Canvas, extend, useFrame, useThree} from "@react-three/fiber";

// <mesh userData={{hello: "world"}} />

//onPointerOver = {useCallback(() => setHovered(state => [...state, lightArrayRef.current[i]], []))}
//onPointerOut = {useCallback(() => setHovered(state => state.filter(mesh => mesh !== lightArrayRef.current), []))}

const Light = forwardRef((props, ref) => 
{
    //const[hover, setHover] = useState(false);

    function useHover() {
        const setHovered = useContext(props.context)
        const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
        const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
        return { ref, onPointerOver, onPointerOut }
      }

    function colour()
    {
        if (props.userData.selected)
            return "red";
        //else if (hover)
        //    return "orange";
        else
            return props.colour;
    }

    function handleOnClick()
    {
        props.click(props.userData.name);
    }

    function handleOnOver()
    {
        //setHover(true);
        props.enter(props.userData.name);
    }

    function handleExit()
    {
        //setHover(false);
        props.exit(props.userData.name);
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

            onClick = {handleOnClick}
            //onPointerOver = {handleOnOver}
            //onPointerOut = {handleExit}
            {...useHover()}
        >
            {/* radius, width segments, height segments */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* colour */}
            <meshStandardMaterial color = {colour()} />
        </mesh>
    )
});

export default Light;