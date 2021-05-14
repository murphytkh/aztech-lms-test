import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Label, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, 
        ResponsiveContainer} from 'recharts';
import moment from "moment";
import {getBlockId, getEnergyData} from "./MockAPI";
import {setEnergyData} from "../redux/blockDataSlice";

var axisStyle = {
    color: "#6D6E71",
    fontSize: "max(0.572vw, 8.247px)",
    fontWeight: "400",
};

// indicator ranges
function domainPicker(data, option)
{
    switch(option)
    {
        case "1D":
            return [59400, 145800];
        case "5D":
            //return [1, 5];
            return [59400, 145800];
        case "1M":
            return [1, data["energy-consumption"][0][0]["daily-data"].length];
        case "1Y":
            return [1, 12];
        case "3Y":
            return [1, 3];
        default: 
            return [59400, 145800];
    }
}

function tickPicker(data, option)
{
    switch(option)
    {
        case "1D":
            return [59400, 73800, 88200, 102600, 117000, 131400, 145800];
        case "5D":
            //return [1, 2, 3, 4, 5];
            return [59400, 73800, 88200, 102600, 117000, 131400, 145800];
        case "1M":
            var arr = [];
            for (var i = 0; i < data["energy-consumption"][0][0]["daily-data"].length; ++i)
                arr.push(i+1);
            return arr;
        case "1Y":
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        case "3Y":
            return [1, 2, 3];
        default:
            return;
    }
}

function formatterPicker(option)
{
    if (option === "1D" || option === "5D")
        return (tick) => moment(tick * 1000).format('HH:mm');
    else
        return (tick) => tick;
}

function dataPicker(data, option)
{
    switch(option)
    {
        case "1D":
        {
            let currHour = new Date().getHours().toString();
            let hour = Math.trunc(currHour / 4);
        
            // daily data comes in the form of 24 length array (per hour)
            // for 1D, process data into an array of length 6
            // add 0 at the front
            let arr = data["energy-consumption"][0][0]["hourly-data"];
            let result = [];
            let base = 73800;
            let inc = 14400;
        
            result.push({t: 59400, Present: arr[0] + arr[1] + arr[2] + arr[3]});
            for (let i = 0; i < hour; ++i)
            {
                let slice = arr.slice(i * 4, i * 4 + 4);
                result.push({t: base + i * inc, Present: slice[0] + slice[1] + slice[2] + slice[3]});
            }
            
            return result;
        }
        case "5D":
        {
            let currHour = new Date().getHours().toString();
            let hour = Math.trunc(currHour / 4);
        
            // daily data comes in the form of 24 length array (per hour)
            // for 1D, process data into an array of length 6
            // add 0 at the front
            let arr = data["energy-consumption"][0][0]["hourly-data"];
            let result = [];
            let base = 73800;
            let inc = 14400;
        
            result.push({t: 59400, Present: arr[0] + arr[1] + arr[2] + arr[3]});
            for (let i = 0; i < hour; ++i)
            {
                let slice = arr.slice(i * 4, i * 4 + 4);
                result.push({t: base + i * inc, Present: slice[0] + slice[1] + slice[2] + slice[3]});
            }
            
            return result;
        }
        case "1M":
        {
            let currDay = new Date().getDate();
            let arr = data["energy-consumption"][0][0]["daily-data"];
            let result = [];
            
            result.push({t: 0, Present: arr[0]});
            for (let i = 0; i < currDay; ++i)
                result.push({t: i + 1, Present: arr[i]});

            return result;
        }
        case "1Y":
        {
            let currMonth = new Date().getMonth();
            let arr = data["energy-consumption"][0][0]["monthly-data"];
            let result = [];

            result.push({t: 0, Present: arr[0]});
            for (let i = 0; i < currMonth; ++i)
                result.push({t: i + 1, Present: arr[i]});

            return result;
        }
        case "3Y":
        {
            let arr = data["energy-consumption"][0][0]["monthly-data"];
            let result = [];

            result.push({t: 0, Present: arr[0]});
            for (let i = 0; i < arr.length; ++i)
                result.push({t: i + 1, Present: arr[i]});

            return result;
        }
        default: break;
    }
}

function xLabelPicker(option)
{
    switch(option)
    {
        case "1D":
            return "(Hours)";
        case "5D":
            //return "(Days)";
            return "(Hours)";
        case "1M":
            return "(Days)";
        case "1Y":
            return "(Months)";
        case "3Y":
            //return "(Years)";
            return "(Months)";
        default: break;
    }
}

function GraphHelper(props)
{
    return(
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
                    domain={domainPicker(props.data, props.option)}
                    ticks={tickPicker(props.data, props.option)}
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
    );
}

function EnergyConsumptionGraph(props)
{
    const dispatch = useDispatch();
    const data = useSelector((state) => state.energyData.value);
    const locationData = useSelector((state) => state.locationData.value);
    const selectedArea = useSelector((state) => state.selectedArea.value);
    const selectedBlock = useSelector((state) => state.selectedBlock.value);

    useEffect(() => {
        var currDateObj = new Date();
        var startDate, endDate;
        var endYear = currDateObj.getFullYear().toString();
        var endMonth = (currDateObj.getMonth() + 1).toString();
        if (endMonth.length < 2)
            endMonth = "0" + endMonth;
        var endDay = currDateObj.getDate().toString();

        switch(props.option)
        {
            case "1D":
            {
                endDate = endYear + endMonth + endDay;
                startDate = endDate;

                break;
            }
            case "5D":
            {
                endDate = endYear + endMonth + endDay;
                startDate = endDate;

                break;
                //endDate = endYear + endMonth + endDay;

                //currDateObj.setDate(currDateObj.getDate() - 4);
                //
                //let startYear = currDateObj.getFullYear().toString();
                //let startMonth = (currDateObj.getMonth() + 1).toString();
                //if (startMonth.length < 2)
                //    startMonth = "0" + startMonth;
                //let startDay = currDateObj.getDate().toString();

                //startDate = startYear + startMonth + startDay;
                //break;
            }
            case "1M":
            {
                endDate = endYear + endMonth;
                startDate = endDate;

                break;
            }
            case "1Y":
            {
                endDate = endYear;
                startDate = endDate;

                break;
            }
            case "3Y":
            {
                //endDate = endYear;

                //currDateObj.setDate(currDateObj.getFullYear() - 2);

                //let startYear = currDateObj.getFullYear().toString();
                //startDate = startYear;

                //break;
                endDate = endYear;
                startDate = endDate;

                break;
            }
            default: 
            {
                startDate = endYear + endMonth + endDay;
                endDate = endYear + endMonth + endDay;
            }
        }

        let id = getBlockId(selectedArea, selectedBlock, locationData);

        getEnergyData(id, startDate, endDate)
        .then((res) => {
            dispatch(setEnergyData(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.option, dispatch, selectedArea, selectedBlock, locationData]);

    return(
        <div className={props.class}>{props.option && data && 
                        <GraphHelper data={data} option={props.option} />}
        </div>
    );
}

export default EnergyConsumptionGraph;