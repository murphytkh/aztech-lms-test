import "../resources/css/view-activity.css";

import React, {useState, useEffect, useRef} from "react";
//import {useSelector} from "react-redux";

import {getActivityData} from "./MockAPI";

import {PageObject} from "./Utility";
import GenericDropdown from "./GenericDropdown";
import TableSortButton from "./TableSortButton";

import HeaderIcon from "../resources/view/activity-header-icon.svg";
import RefreshIcon from "../resources/dashboard/icon-refresh-black.svg";

function ActivityLog(props)
{
    // comparison functions for sorting table
    const sortTypes = 
    {
        user_descending: (a, b) => a.user.localeCompare(b.user),
        user_ascending: (a, b) => b.user.localeCompare(a.user),
        action_descending: (a, b) => a.action.localeCompare(b.action),
        action_ascending: (a, b) => b.action.localeCompare(a.action)
    };

    const entriesRef = useRef();

    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("10");
    const [sortingMode, setSortingMode] = useState("user_descending");
    const [currentPage, setCurrentPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [displayLength, setDisplayLength] = useState([]);

    // currently displayed entries
    let activityList = data.length ? (
        [].concat(data)
        .sort(sortTypes[sortingMode])
        .slice(currentPage * 10, (currentPage + 1) * 10)
        .map(activity =>
        <tr key={activity.user + activity.action}>
            <td className="user">{activity.user}</td>
            <td className="action">{activity.action}</td>
        </tr>
        )) : null;

    let pageListHelper = [];

    // update display of pagination controls
    for (var i = 0; i < lastPage + 1; ++i)
    {
        if (i === currentPage)
            pageListHelper.push(new PageObject(i, false, i + 1, "default", ""));
        else if (i === 0 || i === lastPage || i === currentPage - 1 || i === currentPage + 1)
            pageListHelper.push(new PageObject(i, true, i + 1, "default", "active"));
        else if (i === currentPage - 2 || i === currentPage + 2)
            pageListHelper.push(new PageObject(i, false, "...", "default", ""));
    }

    // render pagination controls
    let pageList = pageListHelper.length &&
    pageListHelper
    .slice(0).reverse()
    .map((page) =>
        <div
            key={page.index}
            className={page.style}
            id={page.id}
            onClick={page.active ? () => handlePageClick(page.index) : () => {}}
        >
            {page.value}
        </div>
    );

    useEffect(() =>
    {
        // simulate getting data
        let tmp = getActivityData();
        setData(tmp);
        setDisplayLength(tmp.length < 10 ? tmp.length : 10);
        setLastPage(0);
    }, []);

    // button functions
    function handleActivityLogRefresh()
    {
        console.log("activity log refresh");
    }

    function handleSelectOption(option)
    {
        var len;
        if (option === "ALL" || parseInt(option) > data.length)
            len = data.length;
        else
            len = option;
        setDisplayLength(len);
        var last = Math.ceil(len / 10) - 1;
        setLastPage(last);
        if (currentPage > last)
            setCurrentPage(last);
        setSelectedOption(option);
    }

    // sorting toggles
    function handleUserClick()
    {
        sortingMode === "user_descending" ? setSortingMode("user_ascending") : 
                            setSortingMode("user_descending");
    }

    function handleActionClick()
    {
        sortingMode === "action_descending" ? setSortingMode("action_ascending") : 
                            setSortingMode("action_descending");
    }

    // pagination controls functions
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
        <div className="card-container" id="large">
            {/* header */}
            <div className="card-header" id="activity">
                <h1 className="header-text">ACTIVITY LOG</h1>
                <img alt="" src={HeaderIcon} className="header-icon"></img>
                {/* dropdown */}
                <h1 className="show">SHOW</h1>
                <h1 className="entries">ENTRIES</h1>
                <div className="dd-container" style={{zIndex: 10}}>
                    <GenericDropdown
                        ref={entriesRef}
                        default={selectedOption}
                        options={["10", "20", "30", "ALL"]}
                        selectOption={handleSelectOption}
                        disabled={false}
                    ></GenericDropdown>
                </div>
                <div className = "header-divider"></div>
                {/* refresh */}
                <img 
                    alt="" 
                    src={RefreshIcon} 
                    className="refresh"
                    onClick={handleActivityLogRefresh}
                ></img>
            </div>
            {/* table */}
            {/* 0 - no arrows 1 - up 2 - down */}
            <div className="activity-table-container">
                {/* headers and buttons */}
                <div className="activity-table-header" id="user" onClick={handleUserClick}>
                    <TableSortButton 
                        onClick={handleUserClick} 
                        sort={sortingMode === "user_descending" ? 2 : (sortingMode === "user_ascending" ? 1 : 0)}
                    />
                    USER
                </div>
                <div className="activity-table-header" id="action" onClick={handleActionClick}>
                    <TableSortButton 
                        onClick={handleActionClick}
                        sort={sortingMode === "action_descending" ? 2 : (sortingMode === "action_ascending" ? 1 : 0)}
                    />
                    ACTION
                </div>
                <div className="activity-table-divider" id="divider0"></div>
                {/* table object */}
                <table className="activity-table">
                    <tbody>{activityList}</tbody>
                </table>
                <div className="activity-table-divider" id="divider1"></div>
                {/* pagination */}
                <div className="activity-bottomtext">
                    Showing {currentPage * 10 + 1} {" "}
                    to {" "}
                    {currentPage === lastPage ? displayLength : (currentPage + 1) * 10} {" "}
                    of {" "}
                    {displayLength} entries
                </div>
            </div>
            {/* buttons */}
            <div className="pagination-container" id="activity">
                <div 
                    className="default"
                    id={currentPage === lastPage ? "" : "active"}
                    onClick={handleNextClick}>
                    NEXT
                </div>
                {lastPage > 1 && pageList}
                <div 
                    className="left"
                    id={currentPage === 0 ? "" : "active"}
                    onClick={handlePrevClick}>
                    PREVIOUS
                </div>
            </div>
        </div>
    );
}

export default ActivityLog;