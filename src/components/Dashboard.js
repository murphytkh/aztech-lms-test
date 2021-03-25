import "../resources/css/common-elements.css";
import "../resources/css/dashboard-landing.css";

import React, {useState, useRef, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";

import Map from "../resources/dashboard/map-sg.png";
import PlaceholderUser from "../resources/dashboard/user-profile-placeholder.png";
import DefaultUser from "../resources/dashboard/user-profile-default.svg";

import SelectorDropdown from "./SelectorDropdown";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import UserDropdown from "./UserDropdown";
import Sidebar from "./Sidebar";
import EditProfile from "./EditProfile";
import RouteManager from "./RouteManager";

const arrowVar = ">";
const copyright = "COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.";
const privacy = "PRIVACY POLICY · TERMS & CONDITIONS";

// data objects
class NotificationObject
{
    constructor(title, description, rectify)
    {
        this.title = title;
        this.description = description;
        this.rectify = rectify;
    }
}

class UserObject
{
    constructor(name, role, image)
    {
        this.name = name;
        this.role = role;
        this.image = image;
    }
}

function Dashboard(props)
{
    const history = useHistory();
    const location = useLocation();

    const locationDDRef = useRef();
    const areaDDRef = useRef();
    const blockDDRef = useRef();
    const levelDDRef = useRef();
    const lightDDRef = useRef();
    const notificationRef = useRef();

    const [version, setVersion] = useState(null);
    const [alerts, setAlerts] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [userList, setUserList] = useState(null);

    // selectors
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedLight, setSelectedLight] = useState("");

    // bool for displaying edit profile
    const [editProfile, setEditProfile] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    // simulate getting data
    useEffect(() =>
    {
        let notification0 = new NotificationObject("Alert For Light Offline", 
                                                   "Light 1.2.8 AC Failure",
                                                   "true");
        let notification1 = new NotificationObject("Alert For Light 1.2.7", 
                                                   "Light 1.2.7 AC Failure",
                                                   "false");
        let notification2 = new NotificationObject("Alert For Light 1.2.11", 
                                                   "Light 1.2.11 AC Failure",
                                                   "false");
        let curruser = new UserObject("office_admin", "Project Manager", PlaceholderUser);
        let user0 = new UserObject("VIOLA CHAN", "Design Manager", DefaultUser);
        let user1 = new UserObject("MANNMO WONG", "Designer", DefaultUser);

        setVersion("3.0.0");
        setAlerts([notification0, notification1, notification2]);
        setCurrUser(curruser);
        setUserList([user0, user1]);
    }, []);

    function goToPath(path)
    {
        if(location.pathname !== path)
            history.push(path);
    }

    function handleDashboardButton()
    {
        setSelectedLocation("");
        if (locationDDRef.current) 
            locationDDRef.current.clearChoice();
        handleLocationButton();
        
        goToPath("/dashboard");
    }

    function handleLocationButton()
    {
        setSelectedArea("");
        if (areaDDRef.current)
            areaDDRef.current.clearChoice();
        handleAreaButton();
    }

    function handleAreaButton()
    {
        setSelectedBlock("");
        if (blockDDRef.current)
            blockDDRef.current.clearChoice();
        handleBlockButton();
    }

    function handleBlockButton()
    {
        setSelectedLevel("");
        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        setSelectedLight("");
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    function setSelectedLocationHelper(location)
    {
        setSelectedLocation(location);
        handleLocationButton();
    }

    function setSelectedAreaHelper(area)
    {
        setSelectedArea(area);
        handleAreaButton();
    }

    function setSelectedBlockHelper(block)
    {
        setSelectedBlock(block);
        handleBlockButton();
        
        if (location.pathname === "/dashboard")
            goToPath("/dashboard/view");
    }

    function setSelectedLevelHelper(level)
    {
        setSelectedLevel(level);
        setSelectedLight("");
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    function setSelectedLightHelper(light)
    {
        setSelectedLight(light);
    }

    function handleSearch(search)
    {
        console.log(search);
    }

    function changeUser(str)
    {
        console.log("change to user " + str);
    }

    function addUser()
    {
        goToPath("/dashboard/usermanagement");
    }

    function userSettings()
    {
        setEditProfile(true);
    }

    function logout()
    {
        history.push("/login");
    }

    function handleConfigCancel()
    {
        goToPath("/dashboard/view");
    }

    // path helper blocks
    const showLocation =
    (
        <span>
            <h1 className = "arrow">{arrowVar}</h1>
            <h1 onClick = {handleLocationButton}>{selectedLocation}</h1>
        </span>
    );

    const showArea =
    (   
        <span>
            <h1 className = "arrow">{arrowVar}</h1>
            <h1 onClick = {handleAreaButton}>{selectedArea}</h1>
        </span>
    )

    const showBlock =
    (
        <span>
            <h1 className = "arrow">{arrowVar}</h1>
            <h1 onClick = {handleBlockButton}>{selectedBlock.toUpperCase()}</h1>
        </span>
    );

    function showText(text)
    {
        return(
            <span>
                <h1 className = "arrow">{arrowVar}</h1>
                <h1>{text}</h1>
            </span>
        );
    }

    function pathHelper()
    {
        switch(location.pathname)
        {
            case("/dashboard/usermanagement"):
                return umPaths;
            case("/dashboard/config"):
                return configPaths;
            case("/dashboard/photosensor"):
                return photosensorPaths;
            case("/dashboard/datacharts"):
                return datachartsPaths;
            default:
                return defaultPaths;
        }
    }

    // header paths
    const defaultPaths =
    (
        <div className = "path-container">
            <h1 className = "left" onClick = {handleDashboardButton}>DASHBOARD</h1>
            {selectedLocation && showLocation}
            {selectedArea && showArea}
            {selectedBlock && showBlock}
        </div>
    );

    const configPaths =
    (
        <div className = "path-container">
            <h1 className = "left">CONFIGURATIONS</h1>
            {selectedArea && showArea}
            {selectedArea && showText("GENERAL")}
        </div>
    );

    const photosensorPaths =
    (
        <div className = "path-container">
            <h1 className = "left">CONFIGURATIONS</h1>
            {selectedArea && showArea}
            {selectedArea && showText("PHOTOSENSOR")}
        </div>
    );

    const datachartsPaths =
    (
        <div className = "path-container">
            <h1 className = "left">DATA CHARTS</h1>
            {selectedArea && showText("ENERGY CONSUMPTION")}
            {selectedArea && showText(selectedArea)}
        </div>
    );

    const umPaths =
    (
        <div className = "path-container">
            <h1 className = "left" onClick = {handleDashboardButton}>DASHBOARD</h1>
            {selectedArea && showText("USER MANAGEMENT")}
        </div>
    );

    // selector helper blocks
    const locationDropdown =
    (
        <SelectorDropdown 
            ref = {locationDDRef}
            title = "LOCATION"
            options = {["SINGAPORE"]}
            initial = {selectedLocation}
            selectOption = {setSelectedLocationHelper}
        ></SelectorDropdown>
    );

    const areaDropdown =
    (
        <SelectorDropdown
            ref = {areaDDRef}
            title = "AREA"
            options = {["GEYLANG"]}
            initial = {selectedArea}
            selectOption = {setSelectedAreaHelper}
        ></SelectorDropdown>
    );

    const blockDropdown =
    (
        <SelectorDropdown
            ref = {blockDDRef}
            title = "BLOCK"
            options = {["Office_Lights"]}
            initial = {selectedBlock}
            selectOption = {setSelectedBlockHelper}
        ></SelectorDropdown>
    );

    // selector dropdown templates
    const defaultTemplate =
    (
        <div className = "dropdown-container">
            {locationDropdown}
            {selectedLocation && areaDropdown}
            {selectedLocation && selectedArea && blockDropdown}
            {location.pathname === "/dashboard" && selectedLocation &&
                <img alt = "" src = {Map} className = "map"></img>
            }
        </div>
    );

    const configTemplate =
    (
        <div className = "dropdown-container">
            {areaDropdown}
            {selectedArea && blockDropdown}
            {selectedArea && selectedBlock &&
                <SelectorDropdown
                    ref = {levelDDRef}
                    title = "LEVEL"
                    options = {["ALL SELECTED"]}
                    initial = {selectedLevel}
                    selectOption = {setSelectedLevelHelper}
                ></SelectorDropdown>
            }
            {selectedArea && selectedBlock && selectedLevel &&
                <SelectorDropdown
                    ref = {lightDDRef}
                    title = "LIGHT(S)"
                    options = {["ALL SELECTED"]}
                    initial = {selectedLight}
                    selectOption = {setSelectedLightHelper}
                ></SelectorDropdown>
            }
        </div>
    );

    function footerDisplayHelper()
    {
        var page = "";

        if (location.pathname === "/dashboard/view" && selectedBlock)
            page = "view";
        else if (location.pathname === "/dashboard/config")
            page = "config";

        return(
            <div className = "footer" id = {page}>
                <h1 className = "footer-center">{copyright}</h1>
                <h1 className = "footer-right">{privacy}</h1>
            </div>
        );
    }

    function setEditProfileHelper()
    {
        setEditProfile(!editProfile);
    }

    return(
        // enable/disable scrollbar
        <div className = "dashboard" style = {editProfile ? {overflow: "hidden"} : {overflow: "overlay"}}>
            {/* edit profile popup */}
            {editProfile && 
                <EditProfile
                    setEditProfile = {setEditProfileHelper}
                    currUser = {currUser}
                    setCurrUser = {setCurrUser}
                    userTypes = {["Project Manager", "Operator", "Area Admin"]}
                />
            }
            {/* page header */}
            <div className = "header">
                {/* search bar */}
                <SearchBar handleSearch = {handleSearch}/>
                {/* notification dropdown button */}
                {alerts != null && <Notification ref = {notificationRef} notifications = {alerts}/>}
                {/* header divider */}
                <div className = "divider"></div>
                {/* user dropdown button */}
                {currUser != null && userList != null && 
                <UserDropdown 
                    currUser = {currUser} 
                    userList = {userList}
                    changeUser = {changeUser}
                    addUser = {addUser}
                    userSettings = {userSettings}
                    logout = {logout}
                />}
            </div>
            {/* sidebar */}
            <Sidebar 
                pathHelper = {pathHelper} 
                version = {version} 
                darkMode = {darkMode}
                setDarkMode = {setDarkMode}
            ></Sidebar>
            {/* default selectors, non-config page */}
            {(location.pathname !== "/dashboard/config" && 
              location.pathname !== "/dashboard/photosensor" && 
              location.pathname !== "/dashboard/datacharts") && 
              defaultTemplate}
            {/* config selectors , photosensor and datacharts */}
            {(location.pathname === "/dashboard/config" || 
              location.pathname === "/dashboard/photosensor" || 
              location.pathname === "/dashboard/datacharts") && 
              configTemplate}
            {/* footer */}
            {footerDisplayHelper()}
            {/* routing and passing of data to children */}
            <RouteManager 
                location = {selectedLocation}
                area = {selectedArea}
                block = {selectedBlock}
                level = {selectedLevel}
                lights = {selectedLight}
                cancel = {handleConfigCancel}
            ></RouteManager>
        </div>
    );
}

export default Dashboard;