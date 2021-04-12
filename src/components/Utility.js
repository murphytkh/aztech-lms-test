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
    constructor(name, pos, selected)
    {
        this.name = name;
        this.pos = pos;
        this.selected = selected;
    }
}

export class SceneDataObject
{
    constructor(img, lights)
    {
        this.img = img;
        this.lights = lights;
    }
}

// utility functions
export function Rad(deg)
{
    return deg * Math.PI / 180;
}

// used for lightdata only
export function removeFromArray(arr, val)
{
    arr = arr.filter((obj) => {return obj.name !== val;});
}

export function findLightByName(arr, val)
{
    return arr.find(obj => obj.name === val);
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