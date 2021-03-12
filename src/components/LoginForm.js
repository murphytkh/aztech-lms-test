import "../resources/css/loginsignup.css";

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import BG from "../resources/login/nastuh-abootalebi-284883-unsplash@2x.png";
import LoginRect from "../resources/login/Rectangle 2@2x.png";
import Line from "../resources/login/Path 1.svg";
import Logo from "../resources/login/Aztech logo 2020-WH.svg";

function LoginForm(props)
{
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmitNext(e)
    {
        e.preventDefault();
        console.log({email});
        console.log({password});
        history.push("/dashboard")
    }

    function handleForgotPW()
    {
        history.push("/signup");
    }

    function handleChangeEmail(e)
    {
        setEmail(e.target.value);
    }

    function handleChangePassword(e)
    {
        setPassword(e.target.value);
    }

    return (
        <div>
            {/* backgorund image */}
            <img alt = "" src = {BG} className = "main-bg"></img>
            {/* footer */}
            <div className = "main-footer">
                <h1 className = "main-footer-center">COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.</h1>
                <h1 className = "main-footer-right">PRIVACY POLICY · TERMS & CONDITIONS</h1>
            </div>
            {/* login form */}
            <div className = "login-form">
                {/* labels and images */}
                <img alt = "" src = {LoginRect} className = "login-form-bg"></img>
                <img alt = "" src = {Logo} className = "login-form-logo"></img>
                <img alt = "" src = {Line} className = "login-form-line"></img>
                <h1>Welcome Back!</h1>
                <h2>LOGIN</h2>
                <h3>Lighting Management System (LMS)</h3>
                <h4>FORGOT PASSWORD?</h4>
                <h5 onClick = {handleForgotPW}>CHECK HERE</h5>
                <h6>
                    By clicking on next, you acknowledge that you have read and accepted the Terms of Service and 
                    the Privacy Policy.
                </h6>
                {/* inputs */}
                <form onSubmit = {handleSubmitNext}>
                    <input
                        type = "text"
                        id = "login-email"
                        className = "login-form-email"
                        name = "email"
                        value = {email}
                        placeholder = "EMAIL"
                        onChange = {handleChangeEmail}
                    ></input>
                    <input
                        type = "password"
                        id = "login-password"
                        className = "login-form-password"
                        name = "password"
                        value = {password}
                        placeholder = "PASSWORD"
                        onChange = {handleChangePassword}
                    ></input>
                    <button type = "submit" className = "login-form-nextbtn"></button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;