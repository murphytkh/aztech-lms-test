import "../resources/css/common-elements.css";
import "../resources/css/dashboard-landing.css";

import React, {useState, useRef, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setLocationData, setLocations, setAreas, setBlocks, setSelectedLocation, 
        setSelectedArea, setSelectedBlock} from "../redux/locationDataSlice";

import {getCurrUser, getUsers, getNotifications, getVersion,
        getLocationData, getLocations, getAreas, getBlocks} from "./MockAPI";
import SelectorDropdown from "./SelectorDropdown";
import SearchBar from "./SearchBar";
import Notification from "./Notification";
import UserDropdown from "./UserDropdown";
import Sidebar from "./Sidebar";
import EditProfile from "./EditProfile";
import RouteManager from "./RouteManager";

import Map from "../resources/dashboard/map-sg.png";

const arrowVar = ">";
const copyright = "COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.";
const privacy = "PRIVACY POLICY · TERMS & CONDITIONS";

function Dashboard(props)
{
    // redux dispatcher
    const dispatch = useDispatch();

    // used for managing routes
    const history = useHistory();
    const location = useLocation();

    // refs for dropdown lists to control closing when
    // clicked outside of element
    const locationDDRef = useRef();
    const areaDDRef = useRef();
    const blockDDRef = useRef();
    const levelDDRef = useRef();
    const lightDDRef = useRef();
    const notificationRef = useRef();

    // sidebar display and user data
    const [version, setVersion] = useState(null);
    const [alerts, setAlerts] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [userList, setUserList] = useState(null);

    // lms data
    const locationData = useSelector((state) => state.locationData.value);
    const locations = useSelector((state) => state.locations.value);
    const areas = useSelector((state) => state.areas.value);
    const blocks = useSelector((state) => state.blocks.value);

    // selected parameters
    const selectedLocation = useSelector((state) => state.selectedLocation.value);
    const selectedArea = useSelector((state) => state.selectedArea.value);
    const selectedBlock = useSelector((state) => state.selectedBlock.value);

    // selectors
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedLight, setSelectedLight] = useState("");

    // modal states
    const [editProfile, setEditProfile] = useState(false);
    const [relocation, setRelocation] = useState(false);

    // dark mode toggle (unused)
    const [darkMode, setDarkMode] = useState(false);

    // simulate getting data
    useEffect(() =>
    {
        setVersion(getVersion());
        setAlerts(getNotifications());
        setCurrUser(getCurrUser());
        setUserList(getUsers());

        // get overall data and initialise list of locations
        getLocationData()
        .then((res) =>{
            dispatch(setLocationData(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
        dispatch(setLocations(getLocations()));

    }, [dispatch]);

    function goToPath(path)
    {
        if(location.pathname !== path)
            history.push(path);
    }

    function handleDashboardButton()
    {
        dispatch(setSelectedLocation(null));
        if (locationDDRef.current) 
            locationDDRef.current.clearChoice();
        handleLocationButton();
        
        goToPath("/dashboard");
    }

    function handleLocationButton()
    {
        dispatch(setSelectedArea(null));
        if (areaDDRef.current)
            areaDDRef.current.clearChoice();
        handleAreaButton();
    }

    function handleAreaButton()
    {
        dispatch(setSelectedBlock(null));
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
        dispatch(setSelectedLocation(location));
        handleLocationButton();

        // get areas data based on location
        dispatch(setAreas(getAreas(location, locationData)));
    }

    function setSelectedAreaHelper(area)
    {
        dispatch(setSelectedArea(area));
        handleAreaButton();

        // get blocks data based on location
        dispatch(setBlocks(getBlocks(area, locationData)));
    }

    function setSelectedBlockHelper(block)
    {
        dispatch(setSelectedBlock(block));
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
            <h1 onClick = {handleBlockButton}>{selectedBlock}</h1>
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
            options = {locations}
            initial = {selectedLocation}
            selectOption = {setSelectedLocationHelper}
        ></SelectorDropdown>
    );

    const areaDropdown =
    (
        <SelectorDropdown
            ref = {areaDDRef}
            title = "AREA"
            options = {areas}
            initial = {selectedArea}
            selectOption = {setSelectedAreaHelper}
        ></SelectorDropdown>
    );

    const blockDropdown =
    (
        <SelectorDropdown
            ref = {blockDDRef}
            title = "BLOCK"
            options = {blocks}
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

    function setRelocationHelper()
    {
        setRelocation(!relocation);
    }

    return(
        // enable/disable scrollbar
        <div className = "dashboard" id = {(editProfile || relocation) ? "popup" : ""}>
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
                relocation = {relocation}
                setRelocation = {setRelocationHelper}
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