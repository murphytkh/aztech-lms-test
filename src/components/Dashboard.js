import "../resources/css/dashboard-landing.css";

import React, {useState, useRef, useEffect} from "react";
import {Route, HashRouter, useHistory, useLocation} from "react-router-dom";

import Map from "../resources/dashboard/map@2x.png";
import SidebarLogo from "../resources/dashboard/Aztech logo 2020.svg";
import SidebarToggleButton from "../resources/dashboard/menu_icon.svg";

import DashboardIcon from "../resources/dashboard/icon-dashboard.svg";
import DashboardSelectedIcon from "../resources/dashboard/icon-dashboard-selected.svg";
import ConfigIcon from "../resources/dashboard/icon-config.svg";
import ConfigSelectedIcon from "../resources/dashboard/icon-config-selected.svg";
import PhotosensorIcon from "../resources/dashboard/icon-photosensor.svg";
import PhotosensorSelectedIcon from "../resources/dashboard/icon-photosensor-selected.svg";
import DatachartsIcon from "../resources/dashboard/icon-datacharts.svg";
import DatachartsSelectedIcon from "../resources/dashboard/icon-datacharts-selected.svg";
import LightCycleIcon from "../resources/dashboard/icon-lightcycle.svg";
import LightCycleSelectedIcon from "../resources/dashboard/icon-lightcycle-selected.svg";
import UsersIcon from "../resources/dashboard/icon-users.svg";
import UsersSelectedIcon from "../resources/dashboard/icon-users-selected.svg";
import LibraryAddIcon from "../resources/dashboard/icon-add.svg";
import LibraryAddSelectedIcon from "../resources/dashboard/icon-add-selected.svg";

import AdminProfile from "../resources/dashboard/office-admin-profile.png";
import DefaultUser from "../resources/dashboard/icon-userdropdown-default.svg";

import Timestamp from "./Timestamp";
import SelectorDropdown from "./SelectorDropdown";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import UserDropdown from "./UserDropdown";
import SidebarIcon from "./SidebarIcon";
import DashboardView from "./DashboardView";
import DashboardConfig from "./DashboardConfig";
import DashboardPhotosensor from "./DashboardPhotosensor";
import DashboardDatacharts from "./DashboardDatacharts";
import DashboardLightCycle from "./DashboardLightCycle";
import DashboardUserManagement from "./DashboardUserManagement";
import DashboardAdd from "./DashboardAdd";
import EditProfile from "./EditProfile";

const arrowVar = ">";
const copyright = "COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.";
const privacy = "PRIVACY POLICY · TERMS & CONDITIONS";

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

    const [darkMode, setDarkMode] = useState(false);
    const [version, setVersion] = useState(null);
    const [alerts, setAlerts] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [userList, setUserList] = useState(null);

    // dropdown
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedLight, setSelectedLight] = useState("");

    // bool for displaying edit profile
    const [editProfile, setEditProfile] = useState(false);

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
        let curruser = new UserObject("office_admin", "Project Manager", AdminProfile);
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

    function sidebarToggle()
    {
        var sb = document.getElementsByClassName("sidebar");

        if (sb[0].style.transform === "translate3d(-100%, 0px, 0px)")
            sb[0].style.transform = "translate3d(0%, 0px, 0px)";
        else
            sb[0].style.transform = "translate3d(-100%, 0px, 0px)";
    }

    function handleDashboardButton()
    {
        setSelectedLocation("");
        setSelectedArea("");
        setSelectedBlock("");
        setSelectedLevel("");
        setSelectedLight("");

        if (locationDDRef.current)
            locationDDRef.current.clearChoice();
        if (areaDDRef.current)
            areaDDRef.current.clearChoice();
        if (blockDDRef.current)
            blockDDRef.current.clearChoice();
        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
        
        goToPath("/dashboard");
    }

    function handleLocationButton()
    {
        setSelectedArea("");
        setSelectedBlock("");
        setSelectedLevel("");
        setSelectedLight("");

        if (areaDDRef.current)
            areaDDRef.current.clearChoice();
        if (blockDDRef.current)
            blockDDRef.current.clearChoice();
        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    function handleAreaButton()
    {
        setSelectedBlock("");
        setSelectedLevel("");
        setSelectedLight("");

        if (blockDDRef.current)
            blockDDRef.current.clearChoice();
        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    function handleBlockButton()
    {
        goToPath("/dashboard/view");
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

        setSelectedLevel("");
        setSelectedLight("");

        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
        
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

    function handleSidebarButton(path)
    {
        goToPath(path);
    }

    function handleSidebarDarkModeToggle()
    {
        setDarkMode(!darkMode);

        var dm = document.getElementsByClassName("dashboard-page-sidebar-icon-darkmode-circle");

        if (dm[0].style.transform === "translate(70%, -35%)")
            dm[0].style.transform = "translate(-25%, -35%)";
        else
            dm[0].style.transform = "translate(70%, -35%)";
    }

    function handleConfigCancel()
    {
        goToPath("/dashboard/view");
    }

    {/* path helper blocks */}

    const showLocation =
    (
        <span>
            <h1 className = "arrow">{arrowVar}</h1>
            <h1 onClick = {handleLocationButton}>{selectedLocation}</h1>
        </span>
    );

    const showArea =
    (   <span>
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

    {/* header paths */}
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
            {selectedArea && showText("MOTION DETECTION")}
        </div>
    );

    const umPaths =
    (        
        <div className = "path-container">
            <h1 className = "left" onClick = {handleDashboardButton}>DASHBOARD</h1>
            {selectedArea && showText("USER MANAGEMENT")}
        </div>
    );

    {/* selector helper blocks */}
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

    {/* selector dropdown templates */}
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
        var page = "main-footer";

        if (location.pathname === "/dashboard/view")
            page = "dashboard-page-view-footer";
        else if (location.pathname === "/dashboard/config")
            page = "dashboard-page-config-footer";

        return(
            <div className = {page}>
                <h1 className = "center">{copyright}</h1>
                <h1 className = "right">{privacy}</h1>
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
            <div className = "sidebar">
                {/* path buttons */}
                {pathHelper()}
                {/* sidebar toggle button */}
                <button 
                    onClick = {sidebarToggle} 
                    className = "dashboard-page-sidebar-togglebtn">
                    <img
                        alt = ""
                        src = {SidebarToggleButton} 
                        className = "dashboard-page-sidebar-togglebtnimg">
                    </img>
                </button>
                {/* logo */}
                <img alt = "" src = {SidebarLogo} className = "dashboard-page-sidebar-logo"></img>
                {/* sidebar buttons */}
                <div className = "dashboard-page-sidebar-icon-container">
                    <SidebarIcon 
                        onClick = {handleSidebarButton}
                        path = "/dashboard/view" 
                        icon = {DashboardIcon} 
                        selectedicon = {DashboardSelectedIcon} 
                        tooltip = "Dashboard"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/config" 
                        icon = {ConfigIcon}
                        selectedicon = {ConfigSelectedIcon}
                        tooltip = "Configuration"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/photosensor" 
                        icon = {PhotosensorIcon}
                        selectedicon = {PhotosensorSelectedIcon}
                        tooltip = "Photosensor"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/datacharts" 
                        icon = {DatachartsIcon}
                        selectedicon = {DatachartsSelectedIcon} 
                        tooltip = "Data charts"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/lightcycle" 
                        icon = {LightCycleIcon}
                        selectedicon = {LightCycleSelectedIcon} 
                        tooltip = "LightCycle"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/usermanagement" 
                        icon = {UsersIcon}
                        selectedicon = {UsersSelectedIcon} 
                        tooltip = "Users"
                    ></SidebarIcon>
                    <SidebarIcon 
                        onClick = {handleSidebarButton} 
                        path = "/dashboard/add" 
                        icon = {LibraryAddIcon}
                        selectedicon = {LibraryAddSelectedIcon}
                        tooltip = "Add"
                    ></SidebarIcon>
                    {/* dark mode toggle button */}
                    <div
                        title = "Dark Mode"
                        className = "dashboard-page-sidebar-darkmode-container"
                        onClick = {handleSidebarDarkModeToggle}
                    >
                        <div className = "dashboard-page-sidebar-icon-darkmode-circle"></div>
                    </div>
                </div>
                {/* bottom text */}
                <div className = "dashboard-page-sidebar-bottomtext">
                    <Timestamp />
                    {version != null && 
                    <h1 className = "dashboard-page-sidebar-bottomtext-versiontext">VER {version}</h1>}
                </div>
            </div>
            {/* default, non-config page */}
            {(location.pathname !== "/dashboard/config" && 
              location.pathname !== "/dashboard/photosensor" && 
              location.pathname !== "/dashboard/datacharts") && 
              defaultTemplate}
            {/* config, photosensor datacharts */}
            {(location.pathname === "/dashboard/config" || 
              location.pathname === "/dashboard/photosensor" || 
              location.pathname === "/dashboard/datacharts") && 
              configTemplate}
            {/* footer */}
            {footerDisplayHelper()}
            {/* routing and passing of data to children */}
            <HashRouter>
                <Route 
                    path = "/dashboard/view" 
                    render = {(props) => <DashboardView 
                                            location = {selectedLocation}
                                            area = {selectedArea}
                                            block = {selectedBlock} 
                                            {...props} />}
                                        >
                </Route>
                <Route 
                    path = "/dashboard/config" 
                    render = {(props) => <DashboardConfig 
                                            location = {selectedLocation}
                                            area = {selectedArea}
                                            block = {selectedBlock}
                                            level = {selectedLevel}
                                            lights = {selectedLight}
                                            cancel = {handleConfigCancel}
                                            {...props} />}
                                        >
                </Route>
                <Route 
                    path = "/dashboard/photosensor" 
                    render = {(props) => <DashboardPhotosensor 
                                            location = {selectedLocation}
                                            area = {selectedArea}
                                            block = {selectedBlock}
                                            level = {selectedLevel}
                                            lights = {selectedLight}
                                            cancel = {handleConfigCancel}
                                            {...props} />}
                                        >
                </Route>
                <Route 
                    path = "/dashboard/datacharts" 
                    render = {(props) => <DashboardDatacharts 
                                            location = {selectedLocation}
                                            area = {selectedArea}
                                            block = {selectedBlock}
                                            level = {selectedLevel}
                                            lights = {selectedLight}
                                            cancel = {handleConfigCancel}
                                            {...props} />}
                                        >
                </Route>
                <Route 
                    path = "/dashboard/lightcycle" 
                    render = {(props) => <DashboardLightCycle {...props} />}>
                </Route>
                <Route 
                    path = "/dashboard/usermanagement" 
                    render = {(props) => <DashboardUserManagement 
                                            location = {selectedLocation}
                                            area = {selectedArea}
                                            block = {selectedBlock}
                                            {...props} />}>
                </Route>
                <Route 
                    path = "/dashboard/add" 
                    render = {(props) => <DashboardAdd {...props} />}>
                </Route>
            </HashRouter>
        </div>
    );
}

export default Dashboard;