import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {useSelector} from "react-redux";
import store from "../../redux/store";

function IndicatorSphere(props)
{
    const mesh = useRef();
    const add = useSelector((state) => state.add.value);

    useFrame(() => {
        mesh.current.position.x = store.getState().currPoint.value[0];
        mesh.current.position.z = store.getState().currPoint.value[2];
    });

    return(
        <mesh
            {...props}
            ref={mesh}
            scale={1}
        >
            {/* same size as sphere */}
            <sphereBufferGeometry args={[props.radius, 32, 32]} />
            {/* semi transparent material */}
            <meshPhongMaterial color={props.colour} 
                               opacity={add ? 0.8 : 0} 
                               transparent={true}/>
        </mesh>
    );
}

export default IndicatorSphere;