import "../resources/css/react-calendar.css";
import "../resources/css/config-calendar.css";

import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Calendar from 'react-calendar';

import PrevIcon from "../resources/config/calendar-prev.svg";
import NextIcon from "../resources/config/calendar-next.svg";
import RadioButtonOff from "../resources/dashboard/icon-radio-button-off.svg";
import RadioButtonOn from "../resources/dashboard/icon-radio-button-on.svg";
import PhotosensorIcon from "../resources/dashboard/icon-photosensor.svg";
import FullBrightnessIcon from "../resources/dashboard/icon-light-empty.svg";
import MotionIcon from "../resources/dashboard/icon-motion-black.svg";

// individual radio button

function RadioButtonGroup(props)
{
    return(
        <div className="config-calendar-radio" id={"c" + props.containerOrder}>
            {/* radio button */}
            <img 
                alt="" 
                src={props.enabled ? RadioButtonOn : RadioButtonOff} 
                className="btn"
                onClick={props.onClick}
            ></img>
            {/* divider */}
            <div className="divider"></div>
            {/* icon */}
            <img alt="" src={props.icon} className={"radio-icon"}></img>
            {/* text */}
            <div className="text" id="label">
                {props.containerOrder === "0" ? "Photosensor Control" :
                    props.containerOrder === "1" ? "Full Brightness" : "Motion Trigger"}
            </div>
            <div className="text" id="time">
                {props.data && 
                (props.containerOrder === "0" ? props.data[0] + " - " + props.data[1] :
                    props.containerOrder === "1" ? props.data[4] + " - " + props.data[5] :
                        props.data[8] + " - " + props.data[9])}
            </div>
        </div>
    );
}

// 
function ConfigCalendar(props)
{
    const lights = useSelector((state) => state.selectedLights.value);

    const [photoRadio, setPhotoRadio] = useState(false);
    const [fullBrightnessRadio, setFullBrightnessRadio] = useState(false);
    const [motionRadio, setMotionRadio] = useState(false);

    useEffect(() =>
    {
        // simulate getting data
        var dayOfWeek = props.currDate.getDay();
        
        setPhotoRadio(props.schedule[3] && props.schedule[2][dayOfWeek]);
        setFullBrightnessRadio(props.schedule[7] && props.schedule[6][dayOfWeek])
        setMotionRadio(props.schedule[11] && props.schedule[10][dayOfWeek]);
    }, [props.schedule, props.currDate]);

    let months = ["Jan", "Feb", "Mar", "Apr", "May" , "Jun" ,"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // custom calendar formatting functions
    function DayOfWeek(d)
    {
        return days[d.getDay()];
    }

    function MonthYearFormatterBottom(d)
    {
        let year = d.getFullYear();
        let month = d.getMonth();
        return months[month] + " " + year;
    }

    function MonthYearFormatter(locale, d)
    {
        let year = d.getFullYear();
        let month = d.getMonth();
        return months[month] + ", " + year;
    }

    function onDateSelect(date)
    {
        // change date
        props.setDate(date);
        // set radio button states
        var dayOfWeek = date.getDay();
        
        setPhotoRadio(props.schedule[3] && props.schedule[2][dayOfWeek]);
        setFullBrightnessRadio(props.schedule[7] && props.schedule[6][dayOfWeek])
        setMotionRadio(props.schedule[11] && props.schedule[10][dayOfWeek]);
    }

    // radio buttons do nothing for now
    function handlePhotosensorRadioButton()
    {
        //setPhotoRadio(!photoRadio);
    }

    function handleFullBrightnessRadioButton()
    {
        //setFullBrightnessRadio(!fullBrightnessRadio);
    }

    function handleMotionRadioButton()
    {
        //setMotionRadio(!motionRadio);
    }

    const prevButton =
    (
        <img alt="" src={PrevIcon} className="config-calendar-prevnext"></img>
    );

    const nextButton =
    (
        <img alt="" src={NextIcon} className="config-calendar-prevnext"></img>
    );

    // custom tile display for react-calendar
    function tileContent({date, view})
    {
        if (view === "month")
        {
            var dayOfWeek = date.getDay();
            var photo = (props.schedule[3] && props.schedule[2][dayOfWeek]) ? true : false;
            var fullbrightness = (props.schedule[7] && props.schedule[6][dayOfWeek]) ? true : false;
            var motion = (props.schedule[11] && props.schedule[10][dayOfWeek]) ? true : false;

            if (photo && fullbrightness && motion)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="photosensor"></div>
                        <div className="full-brightness"></div> 
                        <div className="motion"></div> 
                    </div>
                );
            }
            else if (photo && fullbrightness)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="photosensor" style={{left: "33%"}}></div>
                        <div className="full-brightness" style={{left: "55%"}}></div> 
                    </div>
                );
            }
            else if (photo && motion)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="photosensor" style={{left: "33%"}}></div> 
                        <div className="motion" style={{left: "55%"}}></div> 
                    </div>
                );

            }
            else if (fullbrightness && motion)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="full-brightness" style={{left: "33%"}}></div> 
                        <div className="motion" style={{left: "55%"}}></div> 
                    </div>
                );
            }
            else if (photo)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="photosensor" style={{left: "44%"}}></div>
                    </div>
                );
            }
            else if (fullbrightness)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="full-brightness" style={{left: "44%"}}></div> 
                    </div>
                );
            }
            else if (motion)
            {
                return(
                    <div className="config-calendar-indicators">
                        <div className="motion" style={{left: "44%"}}></div> 
                    </div>
                );
            }
        }
    }

    return(
        <div 
            className="card-container calendar"
            id="small"
            style={lights ? {opacity: 1.0} : {opacity: 0.5, pointerEvents: "none"}}
        >
            {/* calendar itself */}
            <Calendar
                onChange={onDateSelect} 
                value={props.currDate}
                calendarType={"US"}
                minDetail="month"
                maxDetail="month"
                defaultView="month"
                nextLabel={nextButton}
                prevLabel={prevButton}
                formatMonthYear={MonthYearFormatter}
                tileContent={tileContent}
            />
            {/* legends */}
            <h1 className="photosensor">Photosensor Control</h1>
            <h1 className="full-brightness">Full Brightness</h1>
            <h1 className="motion">Motion Trigger</h1>
            {/* legend icons */}
            <div className="legend-icon" id="photosensor"></div>
            <div className="legend-icon" id="full-brightness"></div>
            <div className="legend-icon" id="motion"></div>
            {/* divider */}
            <div className="divider"></div>
            {/* bottom header */}
            <div className="header-date">
                {DayOfWeek(props.currDate) + ", " + props.currDate.getDate() + " " + 
                 MonthYearFormatterBottom(props.currDate)}
            </div>
            {/* radio buttons */}
            <RadioButtonGroup
                data={props.schedule}
                enabled={photoRadio}
                icon={PhotosensorIcon}
                containerOrder={"0"}
                onClick={handlePhotosensorRadioButton}
            />
            <RadioButtonGroup
                data={props.schedule}
                enabled={fullBrightnessRadio}
                icon={FullBrightnessIcon}
                containerOrder={"1"}
                onClick={handleFullBrightnessRadioButton}
            />
            <RadioButtonGroup
                data={props.schedule}
                enabled={motionRadio}
                icon={MotionIcon}
                containerOrder={"2"}
                onClick={handleMotionRadioButton}
            />
        </div>
    );
}

export default ConfigCalendar;