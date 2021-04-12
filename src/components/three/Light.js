/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, forwardRef, useContext, useCallback} from "react";

// <mesh userData={{hello: "world"}} />

const Light = forwardRef((props, ref) => 
{
    const [outlined, setOutlined] = useState(false);
    const setOutline = useContext(props.context);

    function useHover() {
        const onPointerOver = useCallback(() => {
            if (ref && !props.userData.selected)
            {
                setOutline(state => [...state, ref.current]);
                setOutlined(true);
            }
            props.enter(props.userData.name);
        }, []);
        const onPointerOut = useCallback(() => {
            if (ref && !props.userData.selected)
            {
                setOutline(state => state.filter(mesh => mesh !== ref.current));
                setOutlined(false);
            }
            props.exit(props.userData.name);
        }, []);
        return {ref, onPointerOver, onPointerOut}
    }

    useEffect(() => {
        if (props.userData.selected)
        {
            if (!outlined)
            {
                setOutline(state => [...state, ref.current]);
            }
        }
        else
        {
            setOutline(state => state.filter(mesh => mesh !== ref.current));
        }
    }, [props.userData.selected]);


    
    function colour()
    {
        return props.userData.selected ? "red" : props.colour;
    }

    function handleOnClick()
    {
        props.click(props.userData.name);
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