import "../resources/css/view-status.css";

import React, {useState, useEffect, useRef} from "react";

import GenericDropdown from "./GenericDropdown";
import TableSortButton from "./TableSortButton";

import HeaderIcon from "../resources/view/status-header-icon.svg";
import RefreshIcon from "../resources/dashboard/icon-refresh-black.svg";
import EditIcon from "../resources/view/status-edit-icon.svg";

class LightStatusObject
{
    constructor(name, location, date, time, status)
    {
        this.name = name;
        this.location = location;
        this.date = date;
        this.time = time;
        this.status = status;
    }
}

class PageObject
{
    constructor(index, active, value, style, id)
    {
        this.index = index;
        this.active = active;
        this.value = value;
        this.style = style;
        this.id = id;
    }
}

function LightStatus(props)
{
    // comparison for sorting table
    const sortTypes =
    {
        name_descending: (a, b) => a.name.localeCompare(b.name),
        name_ascending: (a, b) => b.name.localeCompare(a.name),
        date_descending: (a, b) => a.date.localeCompare(b.date),
        date_ascending: (a, b) => b.date.localeCompare(a.date),
        time_descending: (a, b) => a.time.localeCompare(b.time),
        time_ascending: (a, b) => b.time.localeCompare(a.time),
        status_descending: (a, b) => a.status.localeCompare(b.status),
        status_ascending: (a, b) => b.status.localeCompare(a.status)
    };

    const entriesRef = useRef();

    const [selectedOption, setSelectedOption] = useState("10");
    const [sortingMode, setSortingMode] = useState("name_descending");
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);

    const [lightStatusData, setLightStatusData] = useState([]);
    const [displayLength, setDisplayLength] = useState([]);

    function RelocationHelper(name, location)
    {
        props.relocation(name, location);
    }

    function RelocationIcon(props)
    {
        function click()
        {
            RelocationHelper(props.name, props.location);
        }

        return(
            <div><img alt = "" src = {EditIcon} onClick = {click}></img></div>
        );
    }
    // display table elements
    let lightStatusList = lightStatusData.length &&
        lightStatusData.sort(sortTypes[sortingMode])
        .slice(currentPage * 10, (currentPage + 1) * 10)
        .map(lightStatus =>
            <tr key = {lightStatus.name}>
                <td className = "btn">
                    <RelocationIcon name = {lightStatus.name} location = {lightStatus.location}/>
                </td>
                <td className = "name">{lightStatus.name} - {lightStatus.location}</td>
                <td className = "date">{lightStatus.date}</td>
                <td className = "time">{lightStatus.time}</td>
                <td className = "status">{lightStatus.status}</td>
            </tr>
        );

    let pageListHelper = [];

    // update pagination
    for (var i = 0; i < lastPage + 1; ++i)
    {
        if (i === currentPage)
            pageListHelper.push(new PageObject(i, false, i + 1, "default", ""));
        else if (i === 0 || i === lastPage || i === currentPage - 1 || i === currentPage + 1)
            pageListHelper.push(new PageObject(i, true, i + 1, "default", "active"));
        else if (i === currentPage - 2 || i === currentPage + 2)
            pageListHelper.push(new PageObject(i, false, "...", "default", ""));
    }

    let pageList = pageListHelper.length &&
        pageListHelper
        .slice(0).reverse()
        .map((page) =>
            <div
                key = {page.index}
                className = {page.style}
                id = {page.id}
                onClick={page.active ? () => handlePageClick(page.index) : () => {}}
            >
                {page.value}
            </div>
        );

    useEffect(() =>
    {
        // simulate getting data
        var a = [];

        a.push(new LightStatusObject("1.1.1", "Front row, nearest to HR", "2020-09-01", "17:44:00", "ON"));
        a.push(new LightStatusObject("1.1.2", "Location undefined", "2020-09-02", "17:44:01", "OFF"));
        a.push(new LightStatusObject("1.1.3", "Location undefined", "2020-09-03", "17:44:03", "ON"));
        a.push(new LightStatusObject("1.1.4", "Location undefined", "2020-09-04", "17:44:04", "ON"));
        a.push(new LightStatusObject("1.1.5", "Location undefined", "2020-09-05", "17:44:05", "OFF"));
        a.push(new LightStatusObject("1.1.6", "Location undefined", "2020-09-06", "17:44:06", "ON"));
        a.push(new LightStatusObject("1.1.7", "Location undefined", "2020-09-07", "17:44:07", "OFF"));
        a.push(new LightStatusObject("1.1.8", "Location undefined", "2020-09-08", "17:44:08", "ON"));
        a.push(new LightStatusObject("1.1.9", "Location undefined", "2020-09-09", "17:44:09", "OFF"));
        a.push(new LightStatusObject("1.2.1", "Location undefined", "2020-09-10", "17:44:10", "ON"));
        a.push(new LightStatusObject("1.2.2", "Location undefined", "2020-09-11", "17:44:11", "OFF"));
        a.push(new LightStatusObject("1.2.3", "Location undefined", "2020-09-12", "17:44:12", "ON"));
        a.push(new LightStatusObject("1.2.4", "Location undefined", "2020-09-13", "17:44:13", "OFF"));
        a.push(new LightStatusObject("1.2.5", "Location undefined", "2020-09-14", "17:44:14", "ON"));
        a.push(new LightStatusObject("1.2.6", "Location undefined", "2020-09-15", "17:44:15", "OFF"));
        a.push(new LightStatusObject("1.2.7", "Location undefined", "2020-09-16", "17:44:16", "ON"));
        a.push(new LightStatusObject("1.2.8", "Location undefined", "2020-09-17", "17:44:17", "OFF"));
        a.push(new LightStatusObject("1.2.9", "Location undefined", "2020-09-18", "17:44:18", "ON"));
        a.push(new LightStatusObject("1.3.1", "Location undefined", "2020-09-19", "17:44:19", "OFF"));
        a.push(new LightStatusObject("1.3.2", "Location undefined", "2020-09-20", "17:44:20", "ON"));
        a.push(new LightStatusObject("1.3.3", "Location undefined", "2020-09-21", "17:44:21", "OFF"));
        a.push(new LightStatusObject("1.3.4", "Location undefined", "2020-09-22", "17:44:22", "ON"));
        a.push(new LightStatusObject("1.3.5", "Location undefined", "2020-09-23", "17:44:23", "OFF"));
        a.push(new LightStatusObject("1.3.6", "Location undefined", "2020-09-24", "17:44:24", "ON"));
        // 24

        // + 40
        for (var i = 0; i < 40; ++i)
            a.push(new LightStatusObject("1.4." + i.toString(), "Location undefined", 
                                         "2020-09-25", "17:44:25", (i % 2) ? "ON" : "OFF"));

        setLightStatusData(a);
        setDisplayLength(a.length < 10 ? a.length : 10);
        setLastPage(0);
    }, []);

    function handleStatusRefresh()
    {
        console.log("status refresh");
    }

    function handleSelectOption(option)
    {
        var len;
        if (option === "ALL" || parseInt(option) > lightStatusData.length)
            len = lightStatusData.length;
        else
            len = option;
        setDisplayLength(len);
        var last = Math.ceil(len / 10) - 1;
        setLastPage(last);
        if (currentPage > last)
            setCurrentPage(last);
        setSelectedOption(option);
    }

    function handleNameClick()
    {
        sortingMode === "name_descending" ? setSortingMode("name_ascending") : 
                            setSortingMode("name_descending");
    }

    function handleDateClick()
    {
        sortingMode === "date_descending" ? setSortingMode("date_ascending") : 
                            setSortingMode("date_descending");
    }

    function handleTimeClick()
    {
        sortingMode === "time_descending" ? setSortingMode("time_ascending") : 
                            setSortingMode("time_descending");
    }

    function handleStatusClick()
    {
        sortingMode === "status_descending" ? setSortingMode("status_ascending") : 
                            setSortingMode("status_descending");
    }

    function handlePrevClick()
    {
        if (currentPage !== 0)
            setCurrentPage(currentPage - 1);
    }

    function handleNextClick()
    {
        if (currentPage !== lastPage)
            setCurrentPage(currentPage + 1);
    }

    function handlePageClick(page)
    {
        setCurrentPage(page);
    }

    return(
        <div className = "card-container" id = "full">
            {/* header */}
            <div className = "card-header" id = "status">
                <h1 className = "header-text">LIGHT STATUS</h1>
                <img alt = "" src = {HeaderIcon} className = "header-icon"></img>
                <h1 className = "show">SHOW</h1>
                <h1 className = "entries">ENTRIES</h1>
                <div className = "dd-container" style = {{zIndex: 10}}>
                    <GenericDropdown
                        ref = {entriesRef}
                        default = {selectedOption}
                        options = {["10", "20", "30", "ALL"]}
                        selectOption = {handleSelectOption}
                        disabled = {false}
                    ></GenericDropdown>
                </div>
                <div className = "header-divider"></div>
                {/* refresh */}
                <img
                    alt = ""
                    src = {RefreshIcon}
                    className = "refresh"
                    onClick = {handleStatusRefresh}
                ></img>
            </div>
            {/* table */}
            {/* 0 - no arrows 1 - up 2 - down */}
            {lightStatusList &&
                <div className = "status-table-container">
                    {/* headers and buttons */}
                    <div  className = "status-table-header" id = "name" onClick = {handleNameClick}>
                        <TableSortButton
                            onClick = {handleNameClick}
                            sort = {sortingMode === "name_descending" ? 2 : 
                                    (sortingMode === "name_ascending" ? 1 : 0)}
                        />
                        LIGHT
                    </div>
                    <div  className = "status-table-header" id = "date" onClick = {handleDateClick}>

                        <TableSortButton
                            onClick = {handleDateClick}
                            sort = {sortingMode === "date_descending" ? 2 : 
                                    (sortingMode === "date_ascending" ? 1 : 0)}
                        />
                        LAST RESPONSE DATE
                    </div>
                    <div  className = "status-table-header" id = "time" onClick = {handleTimeClick}>

                        <TableSortButton
                            onClick = {handleTimeClick}
                            sort = {sortingMode === "time_descending" ? 2 : 
                                    (sortingMode === "time_ascending" ? 1 : 0)}
                        />
                        LAST RESPONSE TIME
                    </div>
                    <div  className = "status-table-header" id = "status" onClick = {handleStatusClick}>

                        <TableSortButton
                            onClick = {handleStatusClick}
                            sort = {sortingMode === "status_descending" ? 2 : 
                                    (sortingMode === "status_ascending" ? 1 : 0)}
                        />
                        STATUS
                    </div>
                    <div className = "status-table-divider" id = "divider0"></div>
                    {/* table object */}
                    <table className = "status-table">
                        <tbody>
                            {lightStatusList}
                        </tbody>
                    </table>
                    <div className = "status-table-divider" id = "divider1"></div>
                    {/* pagination */}
                    <div className = "status-bottomtext">
                        Showing {currentPage * 10 + 1} {" "}
                        to {" "}
                        {currentPage === lastPage ? displayLength : (currentPage + 1) * 10} {" "}
                        of {" "}
                        {displayLength} entries
                    </div>
                </div>                
            }
            {/* buttons */}
            <div className = "pagination-container" id = "status">
                <div 
                    className = "default"
                    id = {currentPage === lastPage ? "" : "active"}
                    onClick = {handleNextClick}>
                    NEXT
                </div>
                {lastPage > 1 && pageList}
                <div 
                    className = "left"
                    id = {currentPage === 0 ? "" : "active"}
                    onClick = {handlePrevClick}>
                    PREVIOUS
                </div>
            </div>
        </div>
    );
}

export default LightStatus;