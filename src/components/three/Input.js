// suppress warning for key and action dependency
/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from "react";

// key hooks

function useKeyDown(key, action)
{
    useEffect(() => {
        function onKeydown(e)
        {
            if (e.key === key) action();
        }
        window.addEventListener("keydown", onKeydown);
        return () => window.removeEventListener("keydown", onKeydown);   
    }, []);
}

function useKeyUp(key, action)
{
    useEffect(() => {
        function onKeyup(e)
        {
            if (e.key === key) action();
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);   
    }, []);
}

// ctrl + key
function useCtrlCombo(key, action)
{
    var ctrl = false;
    useEffect(() => {
        function onKeydown(e)
        {
            if (e.key === "Control") ctrl = true;
        }
        function onCtrlcombo(e)
        {
            if (e.key === key && ctrl) action();
        }
        window.addEventListener("keydown", onKeydown);
        window.addEventListener("keyup", onCtrlcombo);
        return () => {
            window.removeEventListener("keydown", onKeydown);
            window.removeEventListener("keyup", onCtrlcombo);
        };   
    }, []);
}

// mouse hooks


export {useKeyDown, useKeyUp, useCtrlCombo};