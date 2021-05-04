import "../resources/css/common-elements.css";
import "../resources/css/dashboard-landing.css";

import React, {useState, useRef, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setLocationData, setLocations, setAreas, setBlocks, setLevels, setLights,
        setSelectedLocation, setSelectedArea, setSelectedBlock, setSelectedLevel, 
        setSelectedLights} from "../redux/locationDataSlice";
import {setBlockData} from "../redux/blockDataSlice";
import {setVersion} from "../redux/miscInfoSlice";
import {getCurrUser, getUsers, getNotifications, getVersion,
        getLocationData, getLocations,
        getBlockId, getBlockData} from "./MockAPI";

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
    const [currUser, setCurrUser] = useState(null);
    const [alerts, setAlerts] = useState(null);
    const [userList, setUserList] = useState(null);

    // lms data
    const locationData = useSelector((state) => state.locationData.value);
    const blockData = useSelector((state) => state.blockData.value);
    //const locations = useSelector((state) => state.locations.value);
    const areas = useSelector((state) => state.areas.value);
    const blocks = useSelector((state) => state.blocks.value);
    const levels = useSelector((state) => state.levels.value);
    const lights = useSelector((state) => state.lights.value);

    // selected parameters
    const selectedLocation = useSelector((state) => state.selectedLocation.value);
    const selectedArea = useSelector((state) => state.selectedArea.value);
    const selectedBlock = useSelector((state) => state.selectedBlock.value);
    const selectedLevel = useSelector((state) => state.selectedLevel.value);
    const selectedLights = useSelector((state) => state.selectedLights.value);

    // modal states
    const editProfile = useSelector((state) => state.editProfile.value);
    const relocation = useSelector((state) => state.relocation.value);

    // simulate getting data
    useEffect(() =>
    {
        // initialise data into redux store

        dispatch(setVersion(getVersion()));
        setAlerts(getNotifications());
        setCurrUser(getCurrUser());
        setUserList(getUsers());

        // get overall data and initialise list of locations
        getLocationData()
        .then((res) => {
            dispatch(setLocationData(res.data));

            let areas = res.data.map(obj => obj.name);
            if (areas)
                dispatch(setAreas(areas));
        })
        .catch((err) => {
            console.log(err);
        });
        dispatch(setLocations(getLocations()));
    }, [dispatch, location]);

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
        dispatch(setSelectedLevel(""));
        if (levelDDRef.current)
            levelDDRef.current.clearChoice();
        dispatch(setSelectedLights(""));
        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    //function setSelectedLocationHelper(location)
    //{
    //    dispatch(setSelectedLocation(location));
    //    handleLocationButton();

    //    // get areas data based on location
    //    let areas = getAreas(location, locationData);
    //    if (areas)
    //        dispatch(setAreas(areas));
    //}

    function setSelectedAreaHelper(area)
    {
        dispatch(setSelectedArea(area));
        handleAreaButton();

        // get blocks data based on location
        let tmp = locationData.find(obj => {return obj.name === area});
        tmp = tmp.blocks.map(obj => obj.blockName);
        dispatch(setBlocks(tmp));
    }

    function setSelectedBlockHelper(block)
    {
        dispatch(setSelectedBlock(block));
        handleBlockButton();

        if (selectedArea && block && locationData)
        {
            let id = getBlockId(selectedArea, block, locationData);

            // get individual block data from api
            getBlockData(id)
            .then((res) => {
                dispatch(setBlockData(res.data));

                let tmp = res.data.floors.map((obj) => obj.floorName);
                tmp.unshift("ALL SELECTED");
                dispatch(setLevels(tmp));
            })
            .catch((err) => {
                console.log(err);
            });
        }

        if (location.pathname === "/dashboard")
            goToPath("/dashboard/view");
    }

    function setSelectedLevelHelper(level)
    {
        dispatch(setSelectedLevel(level));
        dispatch(setSelectedLights(""));

        if (level && blockData)
        {
            // if not individual light selected, list lights
            // else, defualt to all selected option only
            if (level === "ALL SELECTED")
            {
                dispatch(setLights(["ALL SELECTED"]));
            }
            else
            {
                let tmp = blockData.floors.find(obj => {return obj.floorName === level});
                tmp = tmp.lights.map(obj => obj.displayName);
                tmp.unshift("ALL SELECTED");
                dispatch(setLights(tmp));
            }
        }

        if (lightDDRef.current)
            lightDDRef.current.clearChoice();
    }

    function setSelectedLightsHelper(light)
    {
        dispatch(setSelectedLights(light));
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

    function logout()
    {
        history.push("/login");
    }

    function handleConfigCancel()
    {
        goToPath("/dashboard/view");
    }

    // path helper blocks
    function showText(text, click = () => {})
    {
        return(
            <span>
                <h1 className="arrow">{arrowVar}</h1>
                <h1 onClick={click}>{text}</h1>
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
        <div className="path-container">
            <h1 className="left" onClick={handleDashboardButton}>DASHBOARD</h1>
            {selectedLocation && showText(selectedLocation, handleLocationButton)}
            {selectedArea && showText(selectedArea, handleAreaButton)}
            {selectedBlock && showText(selectedBlock, handleBlockButton)}
        </div>
    );

    const configPaths =
    (
        <div className="path-container">
            <h1 className="left">CONFIGURATIONS</h1>
            {selectedArea && showText(selectedArea, handleAreaButton)}
            {selectedArea && showText("GENERAL")}
        </div>
    );

    const photosensorPaths =
    (
        <div className="path-container">
            <h1 className="left">CONFIGURATIONS</h1>
            {selectedArea && showText(selectedArea, handleAreaButton)}
            {selectedArea && showText("PHOTOSENSOR")}
        </div>
    );

    const datachartsPaths =
    (
        <div className="path-container">
            <h1 className="left">DATA CHARTS</h1>
            {selectedArea && showText(selectedArea, handleAreaButton)}
            {selectedArea && showText("ENERGY CONSUMPTION")}
        </div>
    );

    const umPaths =
    (
        <div className="path-container">
            <h1 className="left" onClick={handleDashboardButton}>DASHBOARD</h1>
            {selectedArea && showText("USER MANAGEMENT")}
        </div>
    );

    // selector helper blocks
    const selectorDropDown = (ref, title, options, initial, click) =>
    {
        return (
            <SelectorDropdown
                ref={ref}
                title={title}
                options={options}
                initial={initial}
                selectOption={click}
            />
        );
    }

    //const locationDropdown = selectorDropDown(locationDDRef, "LOCATION", locations, 
    //                                          selectedLocation, setSelectedLocationHelper);
    const areaDropdown = selectorDropDown(areaDDRef, "AREA", areas, 
                                          selectedArea, setSelectedAreaHelper);
    const blockDropdown = selectorDropDown(blockDDRef, "BLOCK", blocks, 
                                           selectedBlock, setSelectedBlockHelper);
    const levelDropdown = selectorDropDown(levelDDRef, "LEVEL", levels,
                                           selectedLevel, setSelectedLevelHelper);
    const lightsDropdown = selectorDropDown(lightDDRef, "LIGHT(S)", lights,
                                            selectedLights, setSelectedLightsHelper);
    // selector dropdown templates
    const defaultTemplate =
    (
        <div className="dropdown-container">
            {areaDropdown}
            {selectedArea && blockDropdown}
            {selectedBlock && levelDropdown}
            {location.pathname === "/dashboard" && !selectedBlock &&
                <img alt="" src={Map} className="map"></img>
            }
        </div>
    );

    const configTemplate =
    (
        <div className="dropdown-container">
            {areaDropdown}
            {selectedArea && blockDropdown}
            {selectedArea && selectedBlock && levelDropdown}
            {selectedArea && selectedBlock && selectedLevel && lightsDropdown}
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
            <div className="footer" id={page}>
                <h1 className="footer-center">{copyright}</h1>
                <h1 className="footer-right">{privacy}</h1>
            </div>
        );
    }

    return(
        // enable/disable scrollbar
        <div className="dashboard" id={(editProfile || relocation) ? "popup" : ""}>
            {/* edit profile popup */}
            {editProfile && 
                <EditProfile 
                    userTypes={["Project Manager", "Operator", "Area Admin"]}
                    currUser={currUser}
                    setCurrUser={setCurrUser}
                />
            }
            {/* page header */}
            <div className="header">
                {/* search bar */}
                <SearchBar handleSearch={handleSearch}/>
                {/* notification dropdown button */}
                {alerts !== null && <Notification ref={notificationRef} notifications={alerts}/>}
                {/* header divider */}
                <div className="divider"></div>
                {/* user dropdown button */}
                {currUser !== null && userList !== null && 
                <UserDropdown 
                    currUser={currUser} 
                    userList={userList}
                    changeUser={changeUser}
                    addUser={addUser}
                    logout={logout}
                />}
            </div>
            {/* sidebar */}
            <Sidebar pathHelper={pathHelper} />
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
            <RouteManager cancel={handleConfigCancel} />
        </div>
    );
}

export default Dashboard;