import "../resources/css/generic-dropdown.css";

import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";

import UpArrow from "../resources/dashboard/icon-dropdown-up.svg";
import DownArrow from "../resources/dashboard/icon-dropdown-down.svg";

const GenericDropdown = forwardRef((props, ref) =>
{
    const node = useRef();
    const [choice, setChoice] = useState(props.default);
    const [isOpen, setIsOpen] = useState(false);
    
    const optionsList = props.options.map(option =>
        <li 
             key = {option}
             onClick = {() => {
                                props.selectOption(option);
                                setChoice(option);
                                setIsOpen(false);
                              }}
        >
            {option}
        </li>
    );

    useImperativeHandle(ref, () => ({
        clearChoice()
        {
            setChoice("");
        }
    }));

    const handleClickOutside = e =>
    {
        if (node.current)
            if (node.current.contains(e.target))
                return;
            else
                setIsOpen(false);
    };

    function handleDropdownClick()
    {
        setIsOpen(!isOpen);
    }

    useEffect(() => 
    {    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    return(
        <div 
            ref = {node} 
            className = "dropdown" 
            id = {props.disabled ? "disabled" : ""}
            onClick = {handleDropdownClick}
        >
            {/* current choice */}
            <h1 id = {props.disabled ? "disabled" : ""}>{choice}</h1>
            {/* up/down arrow */}
            <img alt = "" src = {isOpen ? UpArrow : DownArrow}></img>
            {/* dropdown list */}
            {isOpen && <ul>{optionsList}</ul>}
        </div>
    );
});

export default GenericDropdown;