import {useState, useRef} from "react";

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

export class LightStatusObject
{
    constructor(name, location, date, time, status)
    {
        this.name = name;
        this.location = location;
        this.date = date;
        this.time = time;
        this.status = status;
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

// three.js scene utility functions

export function removeLight(arr, val)
{
    var i = arr.findIndex(obj => obj.name === val);
    arr.splice(i, 1);
}

export function findLightByName(arr, val)
{
    return arr.find(obj => obj.name === val);
}

export function selectLight(name, array, selected, set)
{
    // toggle light selected state
    var arr = [...array];
    var light = findLightByName(arr, name);

    if (light)
    {
        light.selected = true;

        // add to array of selected lights
        // check if already selected first
        var selectedArr = [...selected];
        if (!findLightByName(selectedArr, name))
        {
            selectedArr.push(light);
            set(selectedArr);
        }
    }
}

export function deselectLight(name, selected, set)
{
    // toggle light selected state
    var arr = [...selected];
    var light = findLightByName(arr, name); 

    if (light)
    {
        light.selected = false;
        light.highlight = false;

        // remove from aray of selected lights
        // check if exists in array first
        var selectedArr = [...selected];
        if (findLightByName(selectedArr, name))
        {
            removeLight(selectedArr, name);
            set(selectedArr);
        }
    }
}

// generic function to modify light properties
// takes in array of names
export function setLightsProperty(names, prop, val, array, set)
{
    var arr = [...array];

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
export function selectLightsByProperty(prop, val, array, set)
{
    var arr = [...array];
    var selArr = arr.filter(obj => {return obj[prop] === val;})
    selArr.map(obj => obj.selected = true);
    set(selArr);
}

// more specific and efficient function to help with highlighting
export function selectionBoxHighlight(selection, array, set)
{
    var names = selection.map(obj => obj.userData.name);
    var arr = [...array];
    for (var i = 0; i < arr.length; ++i)
    {
        if (names.includes(arr[i].name))
            arr[i].highlight = true;
        else
            arr[i].highlight = false;
    }
    set(arr);
}

export function allEqual(prop, val, array)
{
    const func = arr => arr.every(obj => obj[prop] === val);
    return func(array);
}