import {useFrame, useThree} from "@react-three/fiber";

function RaycastManager(props)
{
    // get default elements from scene
    const {mouse, camera, raycaster} = useThree();

    useFrame(() => {
        // update mouse and camera pos
        raycaster.setFromCamera(mouse, camera);
        // check if plane object exists, then test for intersections
        if (props.plane.current)
        {
            var intersect = raycaster.intersectObject(props.plane.current);
            if (intersect.length)
            {
                props.setPoint(intersect[0].point.x, intersect[0].point.z);
            }
        }
    })

    return null;
};

export default RaycastManager;