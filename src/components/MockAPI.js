import {NotificationObject, UserObject, ActiveLightObject, LightStatusObject} from "./Utility";

// hard coded images
import PlaceholderUser from "../resources/dashboard/user-profile-placeholder.png";
import DefaultUser from "../resources/dashboard/user-profile-default.svg";

// dashboard persistent elements

function getNotifications()
{
    let n0 = new NotificationObject("Alert For Light Offline", 
                                    "Light 1.2.8 AC Failure", "true");
    let n1 = new NotificationObject("Alert For Light 1.2.7", 
                                    "Light 1.2.7 AC Failure", "false");
    let n2 = new NotificationObject("Alert For Light 1.2.11", 
                                    "Light 1.2.11 AC Failure", "false");
    return ([n0, n1, n2]);
}

function getVersion()
{
    return "3.0.0";
}

function getCurrUser()
{
    return new UserObject("office_admin", "Project Manager", PlaceholderUser);
}

function getUsers()
{
    let u0 = new UserObject("VIOLA CHAN", "Design Manager", DefaultUser);
    let u1 = new UserObject("MANMO WONG", "Designer", DefaultUser);

    return ([u0, u1]);
}

function getBlockData()
{
    let data = new Map();
    data.set("total", 800000);
    data.set("faults", 40);
    data.set("on", 80000);
    data.set("off", 1000);
    data.set("dimmed", 7000);

    return data;
}

function getActiveLightsData()
{
    var data = [];

    data.push(new ActiveLightObject("1.1.2", 1234, "2020-09-01", "12:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.3", 1234, "2020-09-01", "13:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.4", 1234, "2020-09-01", "14:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.5", 1234, "2020-09-01", "15:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.6", 1234, "2020-09-01", "16:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.2.7", 1234, "2020-09-01", "17:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.8", 1234, "2020-09-01", "18:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.1.9", 1234, "2020-09-01", "19:55:55", "IN PROGRESS"));
    data.push(new ActiveLightObject("1.2.1", 1234, "2020-09-01", "20:55:55", "IN PROGRESS"));

    return data;
}

function getStatusData()
{
    var a = [];

    a.push(new LightStatusObject("1.1.1", "Front row, nearest to HR", "2020-09-01", "17:44:00", "ON"));
    a.push(new LightStatusObject("1.1.2", "Location undefined", "2020-09-02", "17:44:01", "OFF"));
    a.push(new LightStatusObject("1.1.3", "Location undefined", "2020-09-03", "17:44:03", "ON"));
    a.push(new LightStatusObject("1.1.4", "Location undefined", "2020-09-04", "17:44:04", "ON"));
    a.push(new LightStatusObject("1.1.5", "Location undefined", "2020-09-05", "17:44:05", "OFF"));
    a.push(new LightStatusObject("1.1.6", "Location undefined", "2020-09-06", "17:44:06", "ON"));
    a.push(new LightStatusObject("1.1.7", "Location undefined", "2020-09-07", "17:44:07", "OFF"));
    a.push(new LightStatusObject("1.1.8", "Location undefined", "2020-09-08", "17:44:08", "ON"));
    a.push(new LightStatusObject("1.1.9", "Location undefined", "2020-09-09", "17:44:09", "OFF"));
    a.push(new LightStatusObject("1.2.1", "Location undefined", "2020-09-10", "17:44:10", "ON"));
    a.push(new LightStatusObject("1.2.2", "Location undefined", "2020-09-11", "17:44:11", "OFF"));
    a.push(new LightStatusObject("1.2.3", "Location undefined", "2020-09-12", "17:44:12", "ON"));
    a.push(new LightStatusObject("1.2.4", "Location undefined", "2020-09-13", "17:44:13", "OFF"));
    a.push(new LightStatusObject("1.2.5", "Location undefined", "2020-09-14", "17:44:14", "ON"));
    a.push(new LightStatusObject("1.2.6", "Location undefined", "2020-09-15", "17:44:15", "OFF"));
    a.push(new LightStatusObject("1.2.7", "Location undefined", "2020-09-16", "17:44:16", "ON"));
    a.push(new LightStatusObject("1.2.8", "Location undefined", "2020-09-17", "17:44:17", "OFF"));
    a.push(new LightStatusObject("1.2.9", "Location undefined", "2020-09-18", "17:44:18", "ON"));
    a.push(new LightStatusObject("1.3.1", "Location undefined", "2020-09-19", "17:44:19", "OFF"));
    a.push(new LightStatusObject("1.3.2", "Location undefined", "2020-09-20", "17:44:20", "ON"));
    a.push(new LightStatusObject("1.3.3", "Location undefined", "2020-09-21", "17:44:21", "OFF"));
    a.push(new LightStatusObject("1.3.4", "Location undefined", "2020-09-22", "17:44:22", "ON"));
    a.push(new LightStatusObject("1.3.5", "Location undefined", "2020-09-23", "17:44:23", "OFF"));
    a.push(new LightStatusObject("1.3.6", "Location undefined", "2020-09-24", "17:44:24", "ON"));
    // 24

    // + 40
    for (var i = 0; i < 40; ++i)
        a.push(new LightStatusObject("1.4." + i.toString(), "Location undefined", 
                                     "2020-09-25", "17:44:25", (i % 2) ? "ON" : "OFF"));
    
    return a;
}

export {getNotifications, getVersion, getCurrUser, getUsers, getBlockData, getActiveLightsData,
        getStatusData};