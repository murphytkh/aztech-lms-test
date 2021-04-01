import "../resources/css/three-js-scene.css";

import React from "react";
import {Canvas} from "@react-three/fiber";

// three components
import Sphere from "./three/Sphere";

function ThreeJsScene(props)
{
    return(
        <div className = "three-scene-page">
            {/* set bg colour on canvas */}
            <Canvas onCreated={state => state.gl.setClearColor(0xC0C0C0)}>
                {/* default scene lighting */}
                <ambientLight />
                <Sphere radius = {1} position={[-1.2, 0, 0]} />
                <Sphere radius = {1} position={[1.2, 0, 0]} />
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;