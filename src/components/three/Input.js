// suppress warning for key and action dependency
/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from "react";

// key hooks

export function useKeyDown(key, action)
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

export function useKeyUp(key, action)
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
export function useCtrlCombo(key, action)
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

// mouse hooks 0 - lmb 2 - rmb

export function useLMBUp(action)
{
    useEffect(() => {
        function onLMBUp(e)
        {
            if (e.button === 0) action();
        }
    
        window.addEventListener("pointerup", onLMBUp);
        return () => window.removeEventListener("pointerup", onLMBUp);
    }, []);
}

export function useRMBUp(action)
{
    useEffect(() => {
        function onRMBUp(e)
        {
            if (e.button === 2) action();
        }

        window.addEventListener("pointerup", onRMBUp);
        return () => window.removeEventListener("pointerup", onRMBUp);
    }, []);
}

//export function useCtrlMouseDown(action)
//{
//    useEffect(() => {
//        
//    }, []);
//}

//export function useCtrlMouseUp(action)
//{
//    useEffect(() => {
//        
//    }, []);
//}