import "../resources/css/config-schedule.css";

import React, {useState, useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";
import DaySelectorButton from "./DaySelectorButton";

import HeaderIcon from "../resources/config/schedule-header-icon.svg";

let ddTime = [];
let hourcounter = -1;
let hours = "00";
let minutes = "00";

for (var i = 0; i < 96; ++i)
{
    if (i % 4)
        minutes = (i % 4 * 15).toString();
    else
        minutes = "00";

    if (minutes === "00")
        hourcounter++;

    if (hourcounter < 10)
        hours = "0" + hourcounter.toString();
    else
        hours = hourcounter.toString();

    ddTime.push(hours + ":" + minutes + ":00");
}

ddTime.push("23:59:00");

function ConfigSchedule(props)
{
    const ddRef = useRef();

    const [activity, setActivity] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [dayActive, setDayActive] = useState([]);

    useEffect(() =>
    {
        // simulate getting data
        if (activity === "Full Brightness")
        {
            setActivity("Full Brightness");
            setStart(props.schedule[0] + ":00");
            setEnd(props.schedule[1] + ":00");
            setDayActive(props.schedule[6]);
        }
        else if (activity === "Motion Trigger")
        {
            setActivity("Motion Trigger");
            setStart(props.schedule[4] + ":00");
            setEnd(props.schedule[5] + ":00");
            setDayActive(props.schedule[10]);
        }
        else
        {
            setActivity("Photosensor Control");
            setStart(props.schedule[8] + ":00");
            setEnd(props.schedule[9] + ":00");
            setDayActive(props.schedule[2]);
        }

    }, [props.schedule, activity]);

    function setActivityHelper(activity)
    {
        setActivity(activity);
        if (activity === "Photosensor Control")
        {
            setStart(props.schedule[0] + ":00");
            setEnd(props.schedule[1] + ":00");
            setDayActive(props.schedule[2]);    
        }
        else if (activity === "Full Brightness")
        {
            setStart(props.schedule[4] + ":00");
            setEnd(props.schedule[5] + ":00");
            setDayActive(props.schedule[6]);   
        }
        else
        {
            setStart(props.schedule[8] + ":00");
            setEnd(props.schedule[9] + ":00");
            setDayActive(props.schedule[10]);  
        }
    }

    function handleAddSchedule()
    {
        //var str = '1437203995000';
        //str = str.substring(0, str.length-3);
        var s = start;
        var e = end;
        s = s.substring(0, s.length - 3);
        e = e.substring(0, e.length - 3);

        var result = props.schedule.slice();
        if (activity === "Photosensor Control")
        {
            result[0] = s;
            result[1] = e;
            result[2] = dayActive;
        }
        else if (activity === "Full Brightness")
        {
            result[4] = s;
            result[5] = e;
            result[6] = dayActive;
        }
        else
        {
            result[8] = s;
            result[9] = e;
            result[10] = dayActive;
        }

        props.setSchedule(result);
    }

	function placeholder() {}

    function toggleDay(day)
    {
        let days = [...dayActive];

        if (day === "SUN")
            days[0] = !days[0];
        else if (day === "MON")
            days[1] = !days[1];
        else if (day === "TUE")
            days[2] = !days[2];
        else if (day === "WED")
            days[3] = !days[3];
        else if (day === "THU")
            days[4] = !days[4];
        else if (day === "FRI")
            days[5] = !days[5];
        else
            days[6] = !days[6];

        setDayActive(days);
    }

    return(
        <div className = "card-container" id = "small">
            {/* header */}
            <div className = "card-header" id = "schedule">
                <h1 className = "header-text">PRE-SET SCHEDULE</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                {/* header button */}
                <div 
			    	className = "schedule-add"
                    id = {props.lights ? "" : "disabled"}
			    	onClick = {props.lights ? handleAddSchedule : placeholder}
			    >
                    Add Schedule
                </div>
            </div>
            {/* labels */}
            <div className = "card-label" id = "label0">ACTIVITIES</div>
            <div className = "card-label" id = "label1">START TIME</div>
            <div className = "card-label" id = "label1-right">END TIME</div>
            <div className = "card-label" id = "label2">REPEAT</div>
            {/* dropdown lists */}
            {dayActive &&
                <div>
                    <div className = "card-dropdown" id = "schedule-dd0" style = {{zIndex: 2}}>
                        <GenericDropdown
                            ref = {ddRef}
                            default = {activity}
                            options = {["Photosensor Control", "Full Brightness", "Motion Trigger"]}
                            selectOption = {setActivityHelper}
                            disabled = {props.lights ? false : true}
                        ></GenericDropdown>
                    </div>
                    <div className = "card-dropdown" id = "schedule-dd1" style = {{zIndex: 1}}>
                        <GenericDropdown
                            ref = {ddRef}
                            default = {start}
                            options = {ddTime}
                            selectOption = {setStart}
                            disabled = {props.lights ? false : true}
                        ></GenericDropdown>
                    </div>
                    <div className = "card-dropdown" id = "schedule-dd2" style = {{zIndex: 1}}>
                        <GenericDropdown
                            ref = {ddRef}
                            default = {end}
                            options = {ddTime}
                            selectOption = {setEnd}
                            disabled = {props.lights ? false : true}
                        ></GenericDropdown>
                    </div>
                </div>
            }
            {/* day selector */}
            {dayActive &&
                <div className = "day-selector">
                    <DaySelectorButton disabled = {props.lights} day = {"SUN"} onClick = {toggleDay} active = {dayActive[0]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"MON"} onClick = {toggleDay} active = {dayActive[1]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"TUE"} onClick = {toggleDay} active = {dayActive[2]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"WED"} onClick = {toggleDay} active = {dayActive[3]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"THU"} onClick = {toggleDay} active = {dayActive[4]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"FRI"} onClick = {toggleDay} active = {dayActive[5]}></DaySelectorButton>
                    <DaySelectorButton disabled = {props.lights} day = {"SAT"} onClick = {toggleDay} active = {dayActive[6]}></DaySelectorButton>
                </div>
            }
        </div>
    );
}

export default ConfigSchedule;