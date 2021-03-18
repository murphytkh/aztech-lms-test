import "../resources/css/main-login.css";

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import BG from "../resources/login/main-bg.png";
import LoginRect from "../resources/login/signup-form-bg.svg";
import Line from "../resources/login/login-form-divider.svg";
import Logo from "../resources/login/main-logo.svg";
import Button from "../resources/login/next-btn.svg";

const copyright = "COPYRIGHT © 2020 AZTECH TECHNOLOGIES PTE LTD. ALL RIGHTS RESERVED.";
const privacy = "PRIVACY POLICY · TERMS & CONDITIONS";
const agree = "By clicking on next, you acknowledge that you have read and accepted the Terms of Service and the Privacy Policy."

function SignUpForm(props)
{
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    function handleNext()
    {
        console.log({email});
        console.log({password});
        console.log({verifyPassword});
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
            {/* backgorund image */}
            <img alt = "" src = {BG} className = "main-bg"></img>
            {/* footer */}
            <div className = "footer">
                <h1 className = "footer-center">{copyright}</h1>
                <h1 className = "footer-right">{privacy}</h1>
            </div>
            {/* signup form */}
            <div className = "signup-form">
                {/* labels and images */}
                <img alt = "" src = {LoginRect} className = "bg"></img>
                <img alt = "" src = {Logo} className = "logo"></img>
                <img alt = "" src = {Line} className = "line"></img>

                <h1>Welcome to</h1>
                <h2>SIGN UP</h2>
                <h3>Lighting Management System (LMS)</h3>
                <h4>LOGIN</h4>
                <h5 onClick = {handleLogin}>ALREADY REGISTERED?</h5>
                <h6>{agree}</h6>

                {/* inputs */}
                <input
                    type = "text"
                    id = "signup-email"
                    className = "input0"
                    name = "email"
                    value = {email}
                    placeholder = "EMAIL"
                    onChange = {handleChangeEmail}
                ></input>
                <input
                    type = "password"
                    id = "signup-password"
                    className = "input1"
                    name = "password"
                    value = {password}
                    placeholder = "PASSWORD"
                    onChange = {handleChangePassword}
                ></input>
                <input
                    type = "password"
                    id = "signup-verifypassword"
                    className = "input2"
                    name = "verifypassword"
                    value = {verifyPassword}
                    placeholder = "VERIFY PASSWORD"
                    onChange = {handleChangeVerifyPassword}
                ></input>
                <img 
                    alt = "" 
                    src = {Button} 
                    className = "btn"
                    onClick = {handleNext}
                ></img>
            </div>
        </div>
    );
}

export default SignUpForm;