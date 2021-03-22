import "../resources/css/table-sort-button.css";

import DownArrow from "../resources/dashboard/icon-dropdown-down.svg";
import UpArrow from "../resources/dashboard/icon-dropdown-up.svg";

import React from "react";

// props.sort 0 - no arrows 1 - up 2 - down

function TableSortButton(props)
{
    return(
        <div className = "tablesort-btn" onClick = {props.onClick}>
            <img
                alt = ""
                src = {UpArrow}
                className = "tablesort-up"
                id = {props.sort === 1 ? "tablesort-on" : "tablesort-off"}
            ></img>
            <img
                alt = ""
                src = {DownArrow}
                className = "tablesort-down"
                id = {props.sort === 2 ? "tablesort-on" : "tablesort-off"}
            ></img>
        </div>
    );
}

export default TableSortButton;