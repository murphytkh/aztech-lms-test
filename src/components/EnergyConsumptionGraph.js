import React from "react";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import moment from "moment";

var axisStyle = {
    color: "#6D6E71",
    fontSize: "max(0.572vw, 8.247px)",
    fontWeight: "400",
};

function domainPicker(option)
{
    switch(option)
    {
        case "1D":
            return [59400, 145800];
        case "5D":
            return [1, 5];
        case "1M":
            return [1, 4];
        case "1Y":
            return [1, 12];
        case "3Y":
            return [1, 3];
        default: break;
    }
}

function tickPicker(option)
{
    switch(option)
    {
        case "1D":
            return [59400, 73800, 88200, 102600, 117000, 131400, 145800];
        case "5D":
            return [1, 2, 3, 4, 5];
        case "1M":
            return [1, 2, 3, 4];
        case "1Y":
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        case "3Y":
            return [1, 2, 3];
        default: break;
    }
}

function formatterPicker(option)
{
    if (option === "1D")
        return (tick) => moment(tick * 1000).format('HH:mm');
    else
        return (tick) => tick;
}

function dataPicker(data, option)
{
    switch(option)
    {
        case "1D":
            return [data[0], data[1]];
        case "5D":
            return [data[2], data[3]];
        case "1M":
            return [data[4], data[5]];
        case "1Y":
            return [data[6], data[7]];
        case "3Y":
            return [data[8], data[9]];
        default: break;
    }
}

function EnergyConsumptionGraph(props)
{
    const graph =
    (
        <ResponsiveContainer>
            <AreaChart>
                <defs>
                    <linearGradient id="presentColour" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#2CD9C5" stopOpacity={0.15}/>
                        <stop offset="100%" stopColor="#2CD9C5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="pastColour" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#8C54FF" stopOpacity={0.15}/>
                        <stop offset="100%" stopColor="#8C54FF" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke = "#ccc" strokeDasharray = "5 5"/>
                <XAxis 
                    dataKey = "t"
                    style = {axisStyle}
                    axisLine = {false}
                    tickLine = {false}
                    type = "number"
                    domain = {domainPicker(props.option)}
                    ticks = {tickPicker(props.option)}
                    tickFormatter = {formatterPicker(props.option)}
                />
                <YAxis 
                    style = {axisStyle}
                    stroke = "#E0E0E0"
                    tick = {{fill: "#6D6E71"}}
                />
                <Tooltip 
                    wrapperStyle = {{
                        color: "#6D6E71",
                        fontSize: "max(0.572vw, 8.247px)",
                        fontWeight: "400",
                    }}
                    labelFormatter={index => ""}
                />
                <Area 
                    data = {dataPicker(props.data, props.option)[0]} 
                    type = "line" dataKey = "Present" 
                    stroke = "#2CD9C5" fillOpacity = {1} 
                    fill = "url(#presentColour)" 
                    dot = {{stroke: "#2CD9C5", strokeWidth: 2, fill: "#FFFFFF"}} 
                />
                <Area 
                    data = {dataPicker(props.data, props.option)[1]} 
                    type = "line" dataKey = "Past" 
                    stroke = "#8C54FF" fillOpacity = {1} 
                    fill = "url(#pastColour)" 
                    dot = {{stroke: "#8C54FF", strokeWidth: 2, fill: "#FFFFFF"}} 
                />
            </AreaChart>
        </ResponsiveContainer>
    )

    return(
        <div className = {props.class}>
            {props.data && props.option && graph}
        </div>
    );
}

export default EnergyConsumptionGraph;