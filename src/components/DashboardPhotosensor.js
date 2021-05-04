import "../resources/css/dashboard-photosensor.css";

import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import PhotosensorDarkness from "./PhotosensorDarkness";
import PhotosensorBrightness from "./PhotosensorBrightness";

function DashboardPhotosensor(props)
{
    //const location = useSelector((state) => state.selectedLocation.value);
    const area = useSelector((state) => state.selectedArea.value);
    const block = useSelector((state) => state.selectedBlock.value);
    const level = useSelector((state) => state.selectedLevel.value);
    const lights = useSelector((state) => state.selectedLights.value);

    const [darknessDetection, setDarknessDetection] = useState("ON");
    const [brightnessDetection, setBrightnessDetection] = useState("ON");
    const [environmentalOffset, setEnvironmentalOffset] = useState(25);
    const [darknessIntensity, setDarknessIntensity] = useState(25);
    const [darkThreshold, setDarkThreshold] = useState(50);
    const [lightingOffset, setLightingOffset] = useState(50);
    const [brightnessIntensity, setBrightnessIntensity] = useState(100);
    const [brightnessThreshold, setBrightnessThreshold] = useState(150);

    useEffect(() =>
    {
        // simulate getting data

    }, []);

    function handleSubmitButton()
    {
        console.log("selected light info: " + area + ", " + block + ", " + level +
                    ", " + lights);
        console.log("darkness detection: " + darknessDetection);
        console.log("environmental offset: " + environmentalOffset);
        console.log("darkness intensity: " + darknessIntensity);
        console.log("dark threshold: " + darkThreshold);
        console.log("brightness detection: " + brightnessDetection);
        console.log("lighting offset: " + lightingOffset);
        console.log("brightness intensity: " + brightnessIntensity);
        console.log("brightness threshold: " + brightnessThreshold);
    }

    function placeholder()
    {
        console.log("Lights not selected");
    }

    return(
        <div className = "photosensor-page">
            {/* cards */}
            <PhotosensorDarkness
                lights = {lights}
                darknessDetection = {darknessDetection}
                environmentalOffset = {environmentalOffset}
                darknessIntensity = {darknessIntensity}
                darkThreshold = {darkThreshold}
                setEnvironmentalOffset = {setEnvironmentalOffset}
                setDarknessIntensity = {setDarknessIntensity}
                setDarkThreshold = {setDarkThreshold}
                setDarknessDetection = {setDarknessDetection}
            />
            <PhotosensorBrightness
                lights = {lights}
                brightnessDetection = {brightnessDetection}
                lightingOffset = {lightingOffset}
                brightnessIntensity = {brightnessIntensity}
                brightnessThreshold = {brightnessThreshold}
                setLightingOffset = {setLightingOffset}
                setBrightnessIntensity = {setBrightnessIntensity}
                setBrightnessThreshold = {setBrightnessThreshold}
                setBrightnessDetection = {setBrightnessDetection}
            />
            {/* buttons */}
            <div className="photosensor-page-btn" id="cancel" onClick={props.cancel}>
                CANCEL
            </div>
            <div
                className="photosensor-page-btn" 
                id="submit"
                onClick={lights ? handleSubmitButton : placeholder}
            >
                SUBMIT
            </div>
        </div>
    );
}

export default DashboardPhotosensor;