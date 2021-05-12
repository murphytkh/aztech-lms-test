import React from "react";
import {Label, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, 
        ResponsiveContainer} from 'recharts';
import moment from "moment";

var axisStyle = {
    color: "#6D6E71",
    fontSize: "max(0.572vw, 8.247px)",
    fontWeight: "400",
};

// indicator ranges
function domainPicker(option)
{
    //switch(option)
    //{
    //    case "1D":
    //        return [59400, 145800];
    //    case "5D":
    //        return [1, 5];
    //    case "1M":
    //        return [1, 4];
    //    case "1Y":
    //        return [1, 12];
    //    case "3Y":
    //        return [1, 3];
    //    default: break;
    //}
    return [59400, 145800];
}

function tickPicker(option)
{
    //switch(option)
    //{
    //    case "1D":
    //        return [59400, 73800, 88200, 102600, 117000, 131400, 145800];
    //    case "5D":
    //        return [1, 2, 3, 4, 5];
    //    case "1M":
    //        return [1, 2, 3, 4];
    //    case "1Y":
    //        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    //    case "3Y":
    //        return [1, 2, 3];
    //    default: break;
    //}
    return [59400, 73800, 88200, 102600, 117000, 131400, 145800];
}

function formatterPicker(option)
{
    //if (option === "1D")
    //    return (tick) => moment(tick * 1000).format('HH:mm');
    //else
    //    return (tick) => tick;
    return (tick) => moment(tick * 1000).format("HH:mm");
}

function dataPicker(data, option)
{
    //switch(option)
    //{
    //    case "1D":
    //        return [data[0], data[1]];
    //    case "5D":
    //        return [data[2], data[3]];
    //    case "1M":
    //        return [data[4], data[5]];
    //    case "1Y":
    //        return [data[6], data[7]];
    //    case "3Y":
    //        return [data[8], data[9]];
    //    default: break;
    //}

    //{t: 59400, Present: 0.02},
    //{t: 73800, Present: 0.035},
    //{t: 88200, Present: 0.025},
    //{t: 102600, Present: 0.042},
    //{t: 117000, Present: 0.078},
    //{t: 131400, Present: 0.07},
    //{t: 145800, Present: 0.06},

    // daily data comes in the form of 24 length array (per hour)
    // for 1D, process data into an array of length 6
    // add 0 at the front
    var arr = data["energy-consumption"][0][0]["hourly-data"];
    var result = [];
    result.push({t: 59400, Present: 0.0});
    result.push({t: 73800, Present: arr[0] + arr[1] + arr[2] + arr[3]});
    result.push({t: 88200, Present: arr[4] + arr[5] + arr[6] + arr[7]});
    result.push({t: 102600, Present: arr[8] + arr[9] + arr[10] + arr[11]});
    result.push({t: 117000, Present: arr[12] + arr[13] + arr[14] + arr[15]});
    result.push({t: 131400, Present: arr[16] + arr[17] + arr[18] + arr[19]});
    result.push({t: 145800, Present: arr[20] + arr[21] + arr[22] + arr[23]});

    return result;
}

function xLabelPicker(option)
{
    //switch(option)
    //{
    //    case "1D":
    //        return "(Hours)";
    //    case "5D":
    //        return "(Days)";
    //    case "1M":
    //        return "(Weeks)";
    //    case "1Y":
    //        return "(Months)";
    //    case "3Y":
    //        return "(Years)";
    //    default: break;
    //}
    return "(Hours)";
}

function EnergyConsumptionGraph(props)
{
    const graph =
    (
        <ResponsiveContainer>
            <AreaChart>
                {/* colours for graphs */}
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
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                {/* axes */}
                <XAxis
                    dataKey="t"
                    style={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    type="number"
                    domain={domainPicker(props.option)}
                    ticks={tickPicker(props.option)}
                    tickFormatter={formatterPicker(props.option)}
                >
                    <Label
                        value={xLabelPicker(props.option)}
                        offset={-5}
                        position="bottom"
                        fontSize="max(0.7vw, 10.08px)"
                        fill="#6D6E71"
                    />
                </XAxis>
                <YAxis 
                    style={axisStyle}
                    stroke="#E0E0E0"
                    tick={{fill: "#6D6E71"}}
                >
                    <Label
                        value="(KwH)"
                        offset={-25}
                        position="left"
                        fontSize="max(0.7vw, 10.08px)"
                        fill="#6D6E71"
                    />
                </YAxis>
                {/* custom rollover tooltip */}
                <Tooltip 
                    wrapperStyle={{
                        color: "#6D6E71",
                        fontSize: "max(0.572vw, 8.247px)",
                        fontWeight: "400",
                    }}
                    labelFormatter={index => ""}
                />
                {/* custom graph fill */}
                <Area 
                    data={dataPicker(props.data, props.option)} 
                    type="line" dataKey="Present" 
                    stroke="#2CD9C5" fillOpacity={1} 
                    fill="url(#presentColour)" 
                    dot={{stroke: "#2CD9C5", strokeWidth: 2, fill: "#FFFFFF"}} 
                />
            </AreaChart>
        </ResponsiveContainer>
    )

    return(
        <div className={props.class}>{props.data && props.option && graph}</div>
    );
}

export default EnergyConsumptionGraph;