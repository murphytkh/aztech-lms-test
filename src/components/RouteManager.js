import React from "react";
import {HashRouter, Route} from "react-router-dom";

import DashboardView from "./DashboardView";
import DashboardConfig from "./DashboardConfig";
import DashboardPhotosensor from "./DashboardPhotosensor";
import DashboardDatacharts from "./DashboardDatacharts";
import DashboardPlaceholder from "./DashboardPlaceholder";
import DashboardUserManagement from "./DashboardUserManagement";
//import DashboardAdd from "./DashboardAdd";
import ThreeJsScene from "./ThreeJsScene";

// using propss instead of props is a bit of a hack, some name conflict
// going on here
function RouteManager(propss)
{
    return(
        <HashRouter>
            <Route 
                path = "/dashboard/view" 
                render = {(props) => <DashboardView 
                                        relocation = {propss.relocation}
                                        setRelocation = {propss.setRelocation}
                                        location = {propss.location}
                                        area = {propss.area}
                                        block = {propss.block}
                                        {...props} />}
                                    >
            </Route>
            <Route 
                path = "/dashboard/config" 
                render = {(props) => <DashboardConfig 
                                        location = {propss.location}
                                        area = {propss.area}
                                        block = {propss.block}
                                        level = {propss.level}
                                        lights = {propss.lights}
                                        cancel = {propss.cancel}
                                        {...props} />}
                                    >
            </Route>
            <Route 
                path = "/dashboard/photosensor" 
                render = {(props) => <DashboardPhotosensor 
                                        location = {propss.location}
                                        area = {propss.area}
                                        block = {propss.block}
                                        level = {propss.level}
                                        lights = {propss.lights}
                                        cancel = {propss.cancel}
                                        {...props} />}
                                    >
            </Route>
            <Route 
                path = "/dashboard/datacharts" 
                render = {(props) => <DashboardDatacharts 
                                        location = {propss.location}
                                        area = {propss.area}
                                        block = {propss.block}
                                        level = {propss.level}
                                        lights = {propss.lights}
                                        cancel = {propss.cancel}
                                        {...props} />}
                                    >
            </Route>
            <Route 
                path = "/dashboard/placeholder" 
                render = {(props) => <DashboardPlaceholder {...props} />}>
            </Route>
            <Route 
                path = "/dashboard/usermanagement" 
                render = {(props) => <DashboardUserManagement 
                                        location = {propss.location}
                                        area = {propss.area}
                                        block = {propss.block}
                                        {...props} />}>
            </Route>
            {/*<Route 
                path = "/dashboard/add" 
                render = {(props) => <DashboardAdd {...props} />}>
            </Route>*/}
            <Route
                path = "/dashboard/three"
                render = {(props) => <ThreeJsScene {...props} />}
            ></Route>
        </HashRouter>
    );
}

export default RouteManager;