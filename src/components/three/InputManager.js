import {useFrame, useThree} from "@react-three/fiber";
import React, {forwardRef} from "react";

const InputManager = forwardRef((props, ref) => 
{
    useFrame(() => {
        ref.current.test = "its fucking working";
    })

    return(
        <mesh
            {...props}
            ref = {ref}
            // default scale 1
            scale = {1}
        >
        </mesh>
    );
});

export default InputManager;