/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, forwardRef, useContext, useCallback} from "react";

const Light = forwardRef((props, ref) => 
{
    const [outlined, setOutlined] = useState(false);
    const setOutline = useContext(props.context);
    let mounted = true;

    // update outline states on rollover
    function useHover() {
        const onPointerOver = useCallback(() => {
            if (mounted)
            {
                setOutlined(true);
                setOutline(state => [...state, ref.current]);
            }
            props.enter(props.userData.name);
        }, []);
        const onPointerOut = useCallback(() => {
            if (mounted)
            {
                setOutlined(false);
                setOutline(state => state.filter(mesh => mesh !== ref.current));
            }
            props.exit(props.userData.name);
        }, []);
        return {onPointerOver, onPointerOut}
    }

    // update outline states on selected status change
    useEffect(() => {
        if (props.userData.selected || props.userData.highlight)
        {
            if (!outlined)
            {
                setOutlined(true);
                setOutline(state => [...state, ref.current]);
            }
        }
        else
        {
            setOutlined(false);
            setOutline(state => state.filter(mesh => mesh !== ref.current));
        }
        
        return (() => mounted = false)

    }, [props.userData.selected, props.userData.highlight]);

    // colour selection
    function colour()
    {
        if (props.userData.mode === "OFF")
            return 0x808080;
        else if (props.userData.mode === "ON")
            return 0x7EC0EE;
        else
            return 0x00FF00;
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

            // spread the rollover and onexit functions
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