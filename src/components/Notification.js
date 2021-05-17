import "../resources/css/dashboard-notification.css";

import React, {useState, useEffect, useRef, forwardRef} from "react";
import {useSelector} from "react-redux";
import DefaultIcon from "../resources/notifications/notification-icon.png";
import AlertIcon from "../resources/notifications/notification-alert-icon.png";
import NotificationPoylgon from "../resources/notifications/notification-polygon.png";
import ClearIcon from "../resources/notifications/notification-cleared.svg";
import RectifyIcon from "../resources/notifications/notification-rectify.svg";

const Notification = forwardRef((props, ref) =>
{
    const node = useRef();
    const blockData = useSelector((state) => state.blockData.value);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    function placeholder() {}
    
    // list of notifications
    const notificationsList = notifications && notifications.map(notif =>
        <li key={notif.title} className={notif.rectify === "0" ? "default" : "clear"}>
            {/* icon */}
            <img alt="" src={notif.rectify === "0" ? RectifyIcon : ClearIcon}></img>
            {/* text */}
            <h1>{notif.title}</h1>
            <h2>{notif.description}</h2>
            {/* button */}
            <div className="btn" onClick={notif.rectify === "0" ? handleCheckButton : placeholder}>
                {notif.rectify === "0" ? "CHECK" : "RECTIFIED"}
            </div>
        </li>
    );

    // check for clicking outside of dropdown
    useEffect(() => 
    {    
        document.addEventListener("mousedown", handleClickOutside);

        var n = [];

        for (var i = 0; i < blockData["floors"].length; ++i)
        {
            var lights = blockData["floors"][i]["lights"];
            for (var j = 0; j < lights.length; ++j)
            {
                let fault = lights[j]["fault"];
                if (fault)
                {
                    n.push({title: "Alert For Light " + lights[j].displayName,
                            description: fault.description,
                            rectify: fault.faultCleared})
                }
            }
        }

        setNotifications(n);

        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, [blockData]);

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
        console.log("does nothing for now");
    }

    function handleCheckButton()
    {
        console.log("CHECK");
    }

    const openTemplate =
    (
        <div className="dashboard-notification-dd">
            <img alt="" src={NotificationPoylgon} className="polygon" ></img>
            {/* top of dropdown list (notification text) */}
            <div className="top">
                <h1>NOTIFICATIONS</h1>
                <div className="btn" onClick={handleClearButton}>CLEAR</div>
            </div>
            {/* list of items */}
            <ul>{notificationsList}</ul>
        </div>
    );

    return(
        <div ref={node}>
            {/* main button */}
            <div className="dashboard-notification">
                <img
                    alt=""
                    src={(blockData && notifications.length) ? AlertIcon : DefaultIcon}
                    onClick={handleNotificationClick}
                ></img>
                {/* number of pending notifications */}
                {blockData && notifications.length > 0 &&
                    <div className="number">{notifications.length}</div>
                }
            </div>
            {/* dropdown */}
            {isOpen && blockData && openTemplate}
        </div>
    );
})

export default Notification;