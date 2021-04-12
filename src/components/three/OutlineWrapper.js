import React, {useState, useEffect, useRef, useMemo} from "react";
import {extend, useFrame, useThree} from "@react-three/fiber";
import {Vector2} from "three";

import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader";

extend({EffectComposer, RenderPass, OutlinePass, ShaderPass});

const OutlineWrapper = ({children}) => 
{
    const {gl, scene, camera, size} = useThree();
    const composer = useRef();
    const [selected, set] = useState([]);
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    context = props.context;

    useEffect(() => composer.current.setSize(size.width, size.height), [size]);
    useFrame(() => (composer.current.render(), 1));

    return (
        <context.Provider value = {set}>
            {children}
            <effectComposer ref = {composer} args = {[gl]}>
                <renderPass attachArray = "passes" args = {[scene, camera]} />
                <outlinePass
                  attachArray = "passes"
                  args = {[aspect, scene, camera]}
                  selectedObjects = {selected}
                  visibleEdgeColor = "white"
                  edgeStrength = {50}
                  edgeThickness = {1}
                />
                <shaderPass attachArray = "passes" args = {[FXAAShader]} uniforms-resolution-value = {[1 / size.width, 1 / size.height]} />
            </effectComposer>
        </context.Provider>
    )
};

export default OutlineWrapper;