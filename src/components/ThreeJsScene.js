import "../resources/css/three-js-scene.css";

import React from "react";
import {Canvas} from "@react-three/fiber";

// three components
import Sphere from "./three/Sphere";
import Camera from "./three/Camera";

function ThreeJsScene(props)
{
    return(
        <div className = "three-scene-page">
            {/* set bg colour on canvas */}
            <Canvas onCreated={state => state.gl.setClearColor(0xC0C0C0)}>
                {/* camera*/}
                <Camera />
                {/* default scene lighting */}
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {/* elements */}
                <Sphere radius = {1} position={[-1.2, 0, 0]} colour = {0x808080} />
                <Sphere radius = {1} position={[1.2, 0, 0]} colour = {0x808080} />
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;