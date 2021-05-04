import "../resources/css/dashboard-config.css";

import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";

import ConfigMotionSensor from "./ConfigMotionSensor";
import ConfigSettings from "./ConfigSettings";
import ConfigSchedule from ".//ConfigSchedule";
import ConfigBrightness from "./ConfigBrightness";
import ConfigCalendar from "./ConfigCalendar";

function DashboardConfig(props)
{
    const location = useSelector((state) => state.selectedLocation.value);
    const area = useSelector((state) => state.selectedArea.value);
    const block = useSelector((state) => state.selectedBlock.value);
    const level = useSelector((state) => state.selectedLevel.value);
    const selectedLights = useSelector((state) => state.selectedLights.value);

    const [motionDetection, setMotionDetection] = useState("ON");
    const [motionSensitivity, setMotionSensitivity] = useState("Medium-High");
    const [sync, setSync] = useState("ON");
    const [intensity, setIntensity] = useState("Fast");
    const [holdTime, setHoldTime] = useState("15");
    const [holdTimeUnits, setHoldTimeUnits] = useState("Seconds");
    const [dimmedBrightness, setDimmedBrightness] = useState(0.7);
    const [motionBrightness, setMotionBrightness] = useState(0.7);
    const [maxBrightness, setMaxBrightness] = useState(0.7);
    // schedule and calendar related stuff
    const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date());
    const [schedule, setSchedule] = useState([]);

    useEffect(() =>
    {
        // simulate getting data
        setSchedule(["07:00", "18:59", [false, true, true, true, true, true, false], true, 
                     "19:00", "23:59", [false, true, true, true, true, true, false], true,
                     "00:00", "06:59", [false, true, true, true, true, true, false], true]);
    }, []);

    function handleSubmitButton()
    {
        console.log("selected light info: " + area + ", " + block + ", " + level +
                    ", " + selectedLights);
        console.log("motion detection: " + motionDetection);
        console.log("motion sensitivity: " + motionSensitivity);
        console.log("clock sync: " + sync);
        console.log("light intensity: " + intensity);
        console.log("hold time: " + holdTime + " " + holdTimeUnits);
        console.log("dimmed brightness: " + dimmedBrightness);
        console.log("motion brightness: " + motionBrightness);
        console.log("max brightness: " + maxBrightness);
        console.log("schedule data: " + schedule);
    }

    function placeholder()
    {
        console.log("Lights not selected");
    }

    return(
        <div className="config-page">
            {/* cards */}
            <ConfigMotionSensor 
                MD={motionDetection}
                setMD={setMotionDetection}
                setMS={setMotionSensitivity}    
            />
            <ConfigSettings 
                sync={sync}
                setSync={setSync}
                setIntensity={setIntensity}
                setHoldTime={setHoldTime}
                setHoldTimeUnits={setHoldTimeUnits}  
            />
            <ConfigSchedule
                schedule = {schedule}
                setSchedule = {setSchedule}
                location = {location}
                area = {area}
                block = {block}
                level = {level}
                lights = {selectedLights}
            />
            <ConfigBrightness
                lights = {selectedLights}
                dimmedBrightness = {dimmedBrightness}
                motionBrightness = {motionBrightness}
                maxBrightness = {maxBrightness}
                setDimmed = {setDimmedBrightness}
                setMotion = {setMotionBrightness}
                setMax = {setMaxBrightness}
            />
            <ConfigCalendar
                currDate = {currentSelectedDate}
                setDate = {setCurrentSelectedDate}
                schedule = {schedule}
                location = {location}
                area = {area}
                block = {block}
                level = {level}
                lights = {selectedLights}
            />
            {/* buttons */}
            <div className="config-page-btn" id="cancel" onClick={props.cancel}>
                CANCEL
            </div>
            <div
                className="config-page-btn"
                id="submit" 
                onClick = {selectedLights ? handleSubmitButton : placeholder}
            >
                SUBMIT
            </div>
        </div>
    );
}

export default DashboardConfig;