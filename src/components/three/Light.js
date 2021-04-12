

import React, {forwardRef, useContext, useCallback} from "react";

// <mesh userData={{hello: "world"}} />

const Light = forwardRef((props, ref) => 
{
    //const[hover, setHover] = useState(false);

    function useHover() {
        const setHovered = useContext(props.context);
        const onPointerOver = useCallback(() => {
            if (ref)
            {
                console.log("wat");
                setHovered(state => [...state, ref.current]);
                props.enter(props.userData.name);
            }
        }, []);
        const onPointerOut = useCallback(() => {
            if (ref)
            {
                setHovered(state => state.filter(mesh => mesh !== ref.current));
                props.exit(props.userData.name);
            }
        }, []);
        return {ref, onPointerOver, onPointerOut}
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