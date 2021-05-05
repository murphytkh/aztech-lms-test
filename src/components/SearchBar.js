import "../resources/css/dashboard-searchbar.css";

import React, {useState} from "react";
import SearchIcon from "../resources/dashboard/icon-search.svg";

function SearchBar(props)
{
    const [search, setSearch] = useState("");

    function handleChangeSearch(e)
    {
        setSearch(e.target.value);
        props.handleSearch(search);
    }

    return(
        <div className="searchbar">
            {/* icon */}
            <img alt="" src={SearchIcon}></img>
            {/* input */}
            <input
                type="text"
                id="searchbar"
                name="search"
                defaultValue={search}
                placeholder="SEARCH"
                onChange={handleChangeSearch}
             ></input>
        </div>
    );
}

export default SearchBar;