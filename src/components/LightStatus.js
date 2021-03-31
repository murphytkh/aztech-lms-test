import "../resources/css/view-status.css";

import React, {useState, useEffect, useRef} from "react";

import {PageObject} from "./Utility";
import GenericDropdown from "./GenericDropdown";
import TableSortButton from "./TableSortButton";

import HeaderIcon from "../resources/view/status-header-icon.svg";
import RefreshIcon from "../resources/dashboard/icon-refresh-black.svg";
import EditIcon from "../resources/view/status-edit-icon.svg";



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
    let lightStatusList = props.data.length &&
    props.data.sort(sortTypes[sortingMode])
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
        setDisplayLength(props.data.length < 10 ? props.data.length : 10);
        setLastPage(0);
    }, [props.data.length]);

    function handleStatusRefresh()
    {
        console.log("status refresh");
    }

    function handleSelectOption(option)
    {
        var len;
        if (option === "ALL" || parseInt(option) > props.data.length)
            len = props.data.length;
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