import {useEffect} from "react";
import {useThree} from "@react-three/fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function Camera(props)
{
    // get default elements from scene

    const {camera, gl} = useThree();

    // initialise camera
    useEffect(() =>
    {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return() => {controls.dispose();};
    }, [camera, gl]);

    return null;
}

export default Camera;