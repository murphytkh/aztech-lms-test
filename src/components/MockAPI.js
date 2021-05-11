import axios from "axios";

import {NotificationObject, UserObject, ActiveLightObject,
        ActivityObject} from "./Utility";

// hard coded images
import PlaceholderUser from "../resources/dashboard/user-profile-placeholder.png";
import DefaultUser from "../resources/dashboard/user-profile-default.svg";

// api url
let apiURL = "ec2-54-255-73-81.ap-southeast-1.compute.amazonaws.com:8888/api/v1";

export function getNotifications()
{
    let n0 = new NotificationObject("Alert For Light Offline", 
                                    "Light 1.2.8 AC Failure", "true");
    let n1 = new NotificationObject("Alert For Light 1.2.7", 
                                    "Light 1.2.7 AC Failure", "false");
    let n2 = new NotificationObject("Alert For Light 1.2.11", 
                                    "Light 1.2.11 AC Failure", "false");
    return ([n0, n1, n2]);
}

export function getVersion()
{
    return "3.0.0";
}

// location data

export function getLocationData()
{
    return axios.get(apiURL + "/areas")
    .then(function (response) {
        return response;
    })
    .catch(function (err) {
        console.log(err);
    })
}

export function getLocations()
{
    return ["SINGAPORE"];
}

export function getCurrUser()
{
    return new UserObject("office_admin", "Project Manager", PlaceholderUser);
}

export function getUsers()
{
    let u0 = new UserObject("VIOLA CHAN", "Design Manager", DefaultUser);
    let u1 = new UserObject("MANMO WONG", "Designer", DefaultUser);

    return ([u0, u1]);
}

export function getBlockId(area, block, data)
{
    var tmp = data.find(obj => {return obj.name === area});
    tmp = tmp.blocks.find(obj => {return obj.blockName === block});
    return tmp.blockId;
}

export function getBlockData(id)
{
    return axios.get(apiURL + "/block/" + id.toString())
    .then(function (response) {
        return response;
    })
    .catch(function (err) {
        console.log(err);
    })
}

export function getActiveLightsData()
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

export function getEnergyData()
{
    const data0 = [
        {t: 59400, Present: 0.02},
        {t: 73800, Present: 0.035},
        {t: 88200, Present: 0.025},
        {t: 102600, Present: 0.042},
        {t: 117000, Present: 0.078},
        {t: 131400, Present: 0.07},
        {t: 145800, Present: 0.06},
    ];
    
    const data1 = [
        {t: 59400, Past: 0.005},
        {t: 73800, Past: 0.019},
        {t: 88200, Past: 0.018},
        {t: 102600, Past: 0.021},
        {t: 117000, Past: 0.017},
        {t: 131400, Past: 0.042},
        {t: 145800, Past: 0.048},
    ];

    const data2 = [
        {t: 1, Present: 0.29},
        {t: 2, Present: 0.31},
        {t: 3, Present: 0.19},
        {t: 4, Present: 0.39},
        {t: 5, Present: 0.35},
    ];

    const data3 = [
        {t: 1, Past: 0.25},
        {t: 2, Past: 0.31},
        {t: 3, Past: 0.29},
        {t: 4, Past: 0.23},
        {t: 5, Past: 0.17},
    ];

    const data4 = [
        {t: 1, Present: 1.9},
        {t: 2, Present: 2.34},
        {t: 3, Present: 2.18},
        {t: 4, Present: 2.45},
    ];

    const data5 = [
        {t: 1, Past: 2.6},
        {t: 2, Past: 2.5},
        {t: 3, Past: 1.79},
        {t: 4, Past: 2.22},
    ];

    const data6 = [
        {t: 1, Present: 8.79},
        {t: 2, Present: 6.98},
        {t: 3, Present: 7.12},
        {t: 4, Present: 7.89},
        {t: 5, Present: 8.3},
        {t: 6, Present: 8.01},
        {t: 7, Present: 7.5},
        {t: 8, Present: 7.68},
        {t: 9, Present: 7.48},
        {t: 10, Present: 6.54},
        {t: 11, Present: 9.3},
        {t: 12, Present: 8.87},
    ];

    const data7 = [
        {t: 1, Past: 7.45},
        {t: 2, Past: 7.5},
        {t: 3, Past: 7.32},
        {t: 4, Past: 6.89},
        {t: 5, Past: 8.72},
        {t: 6, Past: 8.21},
        {t: 7, Past: 9.02},
        {t: 8, Past: 9.1},
        {t: 9, Past: 7.923},
        {t: 10, Past: 6.89},
        {t: 11, Past: 6.93},
        {t: 12, Past: 8.64},
    ];

    const data8 = [
        {t: 1, Present: 79.98},
        {t: 2, Present: 90.273},
        {t: 3, Present: 85.46},
    ];

    const data9 = [
        {t: 1, Past: 85.23},
        {t: 2, Past: 92.21},
        {t: 3, Past: 89.59},
    ];

    return([data0, data1, data2, data3, data4, data5, data6, data7, data8, data9]);
}

export function getActivityData()
{
    var a = [];

    a.push(new ActivityObject("1.2.1 - 9463", "2020-09-01"));
    a.push(new ActivityObject("1.1.1 - 4120", "2020-09-02"));
    a.push(new ActivityObject("1.1.5 - 4098", "2020-09-03"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-04"));
    a.push(new ActivityObject("1.1.2 - 3697", "2020-09-05"));
    a.push(new ActivityObject("1.2.1 - 9463", "2020-09-06"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-07"));
    a.push(new ActivityObject("1.1.2 - 9463", "2020-09-08"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-09"));
    a.push(new ActivityObject("1.1.2 - 3697", "2020-09-10"));
    a.push(new ActivityObject("1.1.3 - 3697", "2020-09-11"));
    a.push(new ActivityObject("1.1.7 - 3697", "2020-09-12"));
    a.push(new ActivityObject("1.2.1 - 9463", "2020-09-13"));
    a.push(new ActivityObject("1.1.1 - 4120", "2020-09-14"));
    a.push(new ActivityObject("1.1.5 - 4098", "2020-09-15"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-16"));
    a.push(new ActivityObject("1.1.2 - 3697", "2020-09-17"));
    a.push(new ActivityObject("1.2.1 - 9463", "2020-09-18"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-19"));
    a.push(new ActivityObject("1.1.2 - 9463", "2020-09-20"));
    a.push(new ActivityObject("1.1.8 - 3955", "2020-09-21"));
    a.push(new ActivityObject("1.1.2 - 3697", "2020-09-22"));
    a.push(new ActivityObject("1.1.3 - 3697", "2020-09-23"));
    a.push(new ActivityObject("1.1.7 - 3697", "2020-09-24"));
    // 24

    // + 40
    for (var i = 0; i < 40; ++i)
        a.push(new ActivityObject("1.3." + i.toString() + " - 9999", "2020-09-25"));

    return a;
}

export function getGatewayData()
{
    return "{“lpAddress”:{“wlp2s0”:”192.168.1.188”,”lo”:”127.0.0.1”}}";
}

function createStatus(name, location, date, time, status)
{
    var obj = {};
    obj.name = name;
    obj.location = location;
    obj.date = date;
    obj.time = time;
    obj.status = status;

    return obj;
}

export function getStatusData()
{
    var a = [];

    // name location date time status

    a.push(createStatus("1.1.1", "Front row, nearest to HR", "2020-09-01", "17:44:00", "ON"));
    a.push(createStatus("1.1.2", "Location undefined", "2020-09-02", "17:44:01", "OFF"));
    a.push(createStatus("1.1.3", "Location undefined", "2020-09-03", "17:44:03", "ON"));
    a.push(createStatus("1.1.4", "Location undefined", "2020-09-04", "17:44:04", "ON"));
    a.push(createStatus("1.1.5", "Location undefined", "2020-09-05", "17:44:05", "OFF"));
    a.push(createStatus("1.1.6", "Location undefined", "2020-09-06", "17:44:06", "ON"));
    a.push(createStatus("1.1.7", "Location undefined", "2020-09-07", "17:44:07", "OFF"));
    a.push(createStatus("1.1.8", "Location undefined", "2020-09-08", "17:44:08", "ON"));
    a.push(createStatus("1.1.9", "Location undefined", "2020-09-09", "17:44:09", "OFF"));
    a.push(createStatus("1.2.1", "Location undefined", "2020-09-10", "17:44:10", "ON"));
    a.push(createStatus("1.2.2", "Location undefined", "2020-09-11", "17:44:11", "OFF"));
    a.push(createStatus("1.2.3", "Location undefined", "2020-09-12", "17:44:12", "ON"));
    a.push(createStatus("1.2.4", "Location undefined", "2020-09-13", "17:44:13", "OFF"));
    a.push(createStatus("1.2.5", "Location undefined", "2020-09-14", "17:44:14", "ON"));
    a.push(createStatus("1.2.6", "Location undefined", "2020-09-15", "17:44:15", "OFF"));
    a.push(createStatus("1.2.7", "Location undefined", "2020-09-16", "17:44:16", "ON"));
    a.push(createStatus("1.2.8", "Location undefined", "2020-09-17", "17:44:17", "OFF"));
    a.push(createStatus("1.2.9", "Location undefined", "2020-09-18", "17:44:18", "ON"));
    a.push(createStatus("1.3.1", "Location undefined", "2020-09-19", "17:44:19", "OFF"));
    a.push(createStatus("1.3.2", "Location undefined", "2020-09-20", "17:44:20", "ON"));
    a.push(createStatus("1.3.3", "Location undefined", "2020-09-21", "17:44:21", "OFF"));
    a.push(createStatus("1.3.4", "Location undefined", "2020-09-22", "17:44:22", "ON"));
    a.push(createStatus("1.3.5", "Location undefined", "2020-09-23", "17:44:23", "OFF"));
    a.push(createStatus("1.3.6", "Location undefined", "2020-09-24", "17:44:24", "ON"));
    // 24

    // + 40
    for (var i = 0; i < 40; ++i)
        a.push(createStatus("1.4." + i.toString(), "Location undefined", 
                            "2020-09-25", "17:44:25", (i % 2) ? "ON" : "OFF"));
    
    return a;
}

export function getSceneData(url, name)
{
    return axios.get(url + name + ".json")
        // get response
        .then(function (response) {
            return response;
        })
        // error
        .catch(function (error) {
            console.log(error);
        })
}