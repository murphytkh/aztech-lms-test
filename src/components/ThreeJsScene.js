import "../resources/css/three-js-scene.css";

import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";

// three components
import Camera from "./three/Camera";
import Sphere from "./three/Sphere";
import Plane from "./three/Plane";

function ThreeJsScene(props)
{
    return(
        <div className = "three-scene-page">
            {/* set bg colour on canvas */}
            <Canvas onCreated={state => state.gl.setClearColor(0xC0C0C0)}>
                {/* camera*/}
                <Camera />
                {/* default scene lighting */}
                <directionalLight color = {0xFFFFFF} intensity = {1} />
                {/* elements */}
                <Sphere radius = {1} position = {[-1.2, 0, 0]} colour = {0x808080} />
                <Sphere radius = {1} position = {[1.2, 0, 0]} colour = {0x808080} />
                <Suspense fallback={null}>
                    <Plane width = {100} height = {71}/>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default ThreeJsScene;