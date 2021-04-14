import React, {useEffect, forwardRef, useMemo} from "react";
import {extend, useThree, useFrame} from "@react-three/fiber";
import {Vector2} from "three";

import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader";

extend({EffectComposer, RenderPass, OutlinePass, ShaderPass});

const Effects = forwardRef((props, ref) => 
{
    const {gl, scene, camera, size} = useThree();
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    useEffect(() => ref.current.setSize(size.width, size.height), [ref, size]);
    useFrame(() => ref.current.render(), 1);

    return (
        <effectComposer ref = {ref} args = {[gl]}>
            <renderPass attachArray = "passes" args = {[scene, camera]} />
            <outlinePass
              attachArray = "passes"
              args = {[aspect, scene, camera]}
              selectedObjects = {props.selected}
              visibleEdgeColor = "yellow"
              edgeStrength = {10}
              edgeThickness = {1}
            />
            <shaderPass 
                attachArray = "passes" 
                args = {[FXAAShader]} uniforms-resolution-value = 
                       {[1 / size.width, 1 / size.height]} 
            />
        </effectComposer>
    );
});

export default Effects;