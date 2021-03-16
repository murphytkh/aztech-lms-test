import "../resources/css/selector-dropdown.css";

import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from "react";
import DownArrow from "../resources/dashboard/icon-dropdown-down.svg";
import UpArrow from "../resources/dashboard/icon-dropdown-up.svg";

const SelectorDropdown = forwardRef((props, ref) =>
{
    const node = useRef();
    const [choice, setChoice] = useState(props.initial);
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
        if (node.current.contains(e.target))
            return;
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
        <div ref = {node} className = "selector-container" onClick = {handleDropdownClick}>
            <h1 className = "title">{props.title}</h1>
            <h1 className = "choice">{choice}</h1>
            <img  alt = ""src = {isOpen ? UpArrow : DownArrow} className = "arrow"></img>
            {isOpen && <ul>{optionsList}</ul>}
        </div>
    );
})

export default SelectorDropdown;