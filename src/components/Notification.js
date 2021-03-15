import "../resources/css/notification.css";

import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";
import DefaultIcon from "../resources/dashboard/notification-icon.png";
import AlertIcon from "../resources/dashboard/notification-alert-icon.png";
import NotificationPoylgon from "../resources/dashboard/notification-polygon.png";
import ClearIcon from "../resources/dashboard/icon-security.svg";
import RectifyIcon from "../resources/dashboard/icon-wifi.svg";

const Notification = forwardRef((props, ref) =>
{
    const node = useRef();
    const [notifications, setNotifications] = useState(props.notifications);
    const [isOpen, setIsOpen] = useState(false);

    function placeholder() {}
    
    const notificationsList = notifications.map(notif =>
        <li key = {notif.title} className = {notif.rectify === "true" ? "default" : "clear"}>
            {/* icon */}
            <img alt = "" src = {notif.rectify === "true" ? RectifyIcon : ClearIcon}></img>
            {/* text */}
            <h1>{notif.title}</h1>
            <h2>{notif.description}</h2>
            {/* button */}
            <div className = "btn" onClick = {notif.rectify === "true" ? handleCheckButton : placeholder}>
                {notif.rectify === "true" ? "CHECK" : "RECTIFIED"}
            </div>
        </li>
    );

    useImperativeHandle(ref, () => ({
        placeholderFunc()
        {
            console.log("why are you here");
        }
    }));

    const handleClickOutside = e => 
    {
        if (node.current)
            if (node.current.contains(e.target)) 
                return;
            else
                setIsOpen(false);
    };

    function handleNotificationClick()
    {
        setIsOpen(!isOpen);
    }

    function handleClearButton()
    {
        setNotifications([]);
    }

    function handleCheckButton()
    {
        console.log("CHECK");
    }

    useEffect(() => 
    {    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    const openTemplate =
    (
        <div className = "dashboard-notification-dd">
            <img 
                alt = ""
                src = {NotificationPoylgon}
                className = "polygon"
            ></img>
            {/* top of dropdown list (notification text) */}
            <div className = "top">
                <h1>NOTIFICATIONS</h1>
                <div className = "btn" onClick = {handleClearButton}>CLEAR</div>
            </div>
            {/* list of items */}
            <ul>
                {notificationsList}
            </ul>
        </div>
    );

    return(
        <div ref = {node}>
            {/* main button */}
            <div className = "dashboard-notification">
                <img
                    alt = ""
                    src = {notifications.length ? AlertIcon : DefaultIcon}
                    onClick = {handleNotificationClick}
                ></img>
                {/* number of pending notifications */}
                {notifications.length > 0 && <div className = "number">{notifications.length}</div>}
            </div>
            {/* dropdown */}
            {isOpen && openTemplate}
        </div>
    );
})

export default Notification;