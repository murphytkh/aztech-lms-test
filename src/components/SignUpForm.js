import "../resources/css/loginsignup.css";

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import BG from "../resources/login/nastuh-abootalebi-284883-unsplash@2x.png";
import LoginRect from "../resources/login/Rectangle 2@2x.png";
import Line from "../resources/login/Path 1.svg";
import Logo from "../resources/login/Aztech logo 2020-WH.svg";

function SignUpForm(props)
{
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifypassword, setVerifyPassword] = useState("");

    function handleSubmitNext(e)
    {
        e.preventDefault();
        console.log({email});
        console.log({password});
        console.log({verifypassword});
    }

    function handleLogin(e)
    {
        e.preventDefault();
        history.push("/login");
    }

    function handleChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function handleChangePassword(e)
    {
        setPassword(e.target.value);
    }

    function handleChangeVerifyPassword(e)
    {
        setVerifyPassword(e.target.value);
    }

    return (
        <div>
            <img alt = "" src = {BG} className = "main-bg"></img>
            <div className = "main-footer">
                <h1 className = "main-footer-center">COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.</h1>
                <h1 className = "main-footer-right">PRIVACY POLICY · TERMS & CONDITIONS</h1>
            </div>
            <div className = "signup-page-form">
                <img alt = "" src = {LoginRect} className = "signup-page-form-rect"></img>
                <h1 className = "signup-page-form-welcome">Welcome to</h1>
                <img alt = "" src = {Logo} className = "signup-page-form-logo"></img>
                <h1 className = "signup-page-form-signuptext">SIGN UP</h1>
                <h1 className = "signup-page-form-lmstext">Lighting Management System (LMS)</h1>
                <form onSubmit = {handleSubmitNext}>
                    <input
                        type = "text"
                        id = "signup-email"
                        className = "signup-page-form-email"
                        name = "email"
                        value = {email}
                        placeholder = "EMAIL"
                        onChange = {handleChangeEmail}
                    ></input>
                    <input
                        type = "password"
                        id = "signup-password"
                        className = "signup-page-form-password"
                        name = "password"
                        value = {password}
                        placeholder = "PASSWORD"
                        onChange = {handleChangePassword}
                    ></input>
                    <input
                        type = "password"
                        id = "signup-verifypassword"
                        className = "signup-page-form-verifypassword"
                        name = "verifypassword"
                        value = {verifypassword}
                        placeholder = "VERIFY PASSWORD"
                        onChange = {handleChangeVerifyPassword}
                    ></input>
                    <button type = "submit" className = "signup-page-form-nextbtn"></button>
                </form>
                <form onSubmit = {handleLogin}>
                    <h1 className = "signup-page-form-logintext">ALREADY REGISTERED?</h1>
                    <button type = "submit" className = "signup-page-form-loginbtn">
                        <h1 className = "signup-page-form-loginbtntext">LOGIN</h1>
                    </button>
                </form>
                <img alt = "" src = {Line} className = "signup-page-form-line"></img>
                <h2 className = "signup-page-form-agreetext">
                    By clicking on next, you acknowledge that you have read and accepted the Terms of Service and the Privacy Policy.
                </h2>
            </div>
        </div>
    );
}

export default SignUpForm;