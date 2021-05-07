import {useState, useRef} from "react";
import store from "../redux/store";

// objects for storing data

export class NotificationObject
{
    constructor(title, description, rectify)
    {
        this.title = title;
        this.description = description;
        this.rectify = rectify;
    }
}

export class PageObject
{
    constructor(index, active, value, style, id)
    {
        this.index = index;
        this.active = active;
        this.value = value;
        this.style = style;
        this.id = id;
    }
}

export class UserObject
{
    constructor(name, role, image)
    {
        this.name = name;
        this.role = role;
        this.image = image;
    }
}

export class ActiveLightObject
{
    constructor(id, detections, date, time, stats)
    {
        this.id = id;
        this.detections = detections;
        this.date = date;
        this.time = time;
        this.stats = stats;
    }
}

export class ActivityObject
{
    constructor(user, action)
    {
        this.user = user;
        this.action = action;
    }
}

export class LightData
{
    constructor(name, pos)
    {
        // initialised by user
        this.name = name;
        this.pos = pos;
        // default values
        this.selected = false;
        this.highlight = false;
        this.mode = "OFF";
        this.group = "0";
        this.triggerers = [];
        this.triggerees = [];
    }
}

// utility functions
export function Rad(deg)
{
    return deg * Math.PI / 180;
}

// use this if using states in DOM event handlers
// it would allow you to get the updated state
// note: use .current to access the data
export function useRefState(initial)
{
    const [state, setState] = useState(initial);
    const ref = useRef(state);

    const setRefState = val =>
    {
        ref.current = val;
        setState(val);
    };

    return [ref, setRefState];
}

export function saveObj(obj, name)
{
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
}

export function deepCopy(obj)
{
    return JSON.parse(JSON.stringify(obj));
}

// three.js scene utility functions

export function removeLight(arr, val)
{
    var i = arr.findIndex(obj => obj.name === val);
    if (i !== -1)
        arr.splice(i, 1);
}

export function findLightByName(arr, val)
{
    return arr.find(obj => obj.name === val);
}

export function selectLight(name, set)
{
    var arr = deepCopy(store.getState().allLights.value);
    var light = findLightByName(arr, name);
    light.selected = true;
    set(arr);
}

export function deselectLights(set)
{
    var arr = deepCopy(store.getState().allLights.value);

    arr.forEach((obj, i) => {
        arr[i].selected = false;
        arr[i].highlight = false;
    });

    set(arr);
}

export function deselectLight(name, set)
{
    var arr = deepCopy(store.getState().allLights.value);
    var light = findLightByName(arr, name);

    if (light)
    {
        light.selected = false;
        light.highlight = false;
        set(arr);
    }
}

// generic function to modify light properties
// takes in array of names
export function setLightsProperty(names, prop, val, set)
{
    var arr = deepCopy(store.getState().allLights.value);

    // modify properties of all lights whose names are in input
    for (var j = 0; j < arr.length; ++j)
    {
        var found = false;
        for (var k = 0; k < names.length; ++k)
        {
            if (names[k] === arr[j].name)
            {
                found = true;
                break;
            }
        }
        if (found)
            arr[j][prop] = val;
    }

    set(arr);
}

// generic function to select all lights by property
export function selectLightsByProperty(prop, val, set)
{
    var arr = deepCopy(store.getState().allLights.value);
    var selArr = arr.filter(obj => obj[prop] === val);

    selArr.forEach((obj, i) => {
        selArr[i].highlight = true;
        selArr[i].selected = true;
    });
    
    set(selArr);
}

// more specific and efficient function to help with highlighting
export function selectionBoxHighlight(selection, set)
{
    var names = selection.map(obj => obj.userData.name);
    var arr = deepCopy(store.getState().allLights.value);

    arr.forEach((obj, i) => {
        if (names.includes(obj.name))
            arr[i].highlight = true;
        else
            arr[i].highlgiht = false;
    });

    set(arr);
}

export function allEqual(prop, val, array)
{
    const func = arr => arr.every(obj => obj[prop] === val);
    return func(array);
}