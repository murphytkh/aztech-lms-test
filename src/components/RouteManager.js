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
            <Route path="/dashboard/view" component={DashboardView} />
            <Route 
                path="/dashboard/config" 
                render={(props) => <DashboardConfig cancel={propss.cancel} {...props} />}
            ></Route>
            <Route 
                path="/dashboard/photosensor" 
                render={(props) => <DashboardPhotosensor cancel={propss.cancel} {...props} />}
            ></Route>
            <Route 
                path="/dashboard/datacharts" 
                render={(props) => <DashboardDatacharts cancel={propss.cancel}{...props} />}
            ></Route>
            <Route 
                path="/dashboard/placeholder" 
                render={(props) => <DashboardPlaceholder {...props} />}>
            </Route>
            <Route 
                path="/dashboard/usermanagement" 
                render={(props) => <DashboardUserManagement {...props} />}
            ></Route>
            {/*<Route 
                path="/dashboard/add" 
                render={(props) => <DashboardAdd {...props} />}>
            </Route>*/}
            <Route
                path="/dashboard/three"
                render={(props) => <ThreeJsScene {...props} />}
            ></Route>
        </HashRouter>
    );
}

export default RouteManager;