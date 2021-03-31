import {NotificationObject, UserObject} from "./Utility";

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

export {getNotifications, getVersion, getCurrUser, getUsers};