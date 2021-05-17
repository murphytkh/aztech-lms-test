import axios from "axios";

import {UserObject} from "./Utility";

// hard coded images
import PlaceholderUser from "../resources/dashboard/user-profile-placeholder.png";
import DefaultUser from "../resources/dashboard/user-profile-default.svg";

// api url
let apiURL = "https://sls.aztech.com:8888/api/v1";

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

export function getEnergyData(id, start, end)
{
    return axios.get(apiURL + "/energy/block/" + id.toString() + "/from/"
                     + start + "/to/" + end)
    .then(function (response) {
        return response;
    })
    .catch(function (err) {
        console.log(err);
    })
}

export function getGatewayData()
{
    return "{“lpAddress”:{“wlp2s0”:”192.168.1.188”,”lo”:”127.0.0.1”}}";
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