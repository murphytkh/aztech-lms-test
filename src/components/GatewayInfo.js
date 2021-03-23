import "../resources/css/view-gateway.css";

import React, {useState, useEffect} from "react";

import HeaderIcon from "../resources/view/gateway-header-icon.svg";
import RefreshIcon from "../resources/view/gateway-refresh.svg";

function GatewayInfo(props)
{
    const [gatewayInfo, setGatewayInfo] = useState("");

    useEffect(() =>
    {
        // simulate getting data
        setGatewayInfo("{“lpAddress”:{“wlp2s0”:”192.168.1.188”,”lo”:”127.0.0.1”}}")
    }, []);

    function handleRefreshButton()
    {
        console.log("refresh");
    }

    return(
        <div className = "card-container" id = "small">
            {/* header */}
            <div className = "card-header" id = "gateway">
                <h1 className = "header-text">GATEWAY INFORMATION</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
            </div>
            {/* elements */}
            <div className = "gateway-button" onClick = {handleRefreshButton}>
                <img alt = "" src = {RefreshIcon} className = "gateway-button-icon"></img>
                <h1>REFRESH / VIEW DETAIL</h1>
            </div>
            {gatewayInfo && 
                <div>
                    <h1 className = "gateway-text">{gatewayInfo}</h1>
                    <h1 className = "gateway-subtext">Last updated: Refresh for update</h1>
                </div>
            }
        </div>
    );
}

export default GatewayInfo;