import React, {useRef} from "react";

function IndicatorSphere(props)
{
    const mesh = useRef();

    return(
        <mesh
            {...props}
            ref = {mesh}
            scale = {1}
        >
            {/* same size as sphere */}
            <sphereBufferGeometry args = {[props.radius, 32, 32]} />
            {/* semi transparent material */}
            <meshPhongMaterial color = {props.color} opacity = {0.7} transparent = {true}/>
        </mesh>
    );
}

export default IndicatorSphere;