import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";

const LoginTemplate = (props: any) => {

    const tryLogin = (username: string, password: string) => {
        // TODO: - Send to controller and verify with DB user exists
        // TODO: - Look into spring security?
        console.log("User with name: " + username + " attempted login");
    };

    return (
        <div className={"login-template"}>
            <span className={"login-template-title"}> Code Wars </span>
            <LoginForm tryLogin={(username: string, password: string) => tryLogin(username, password)}/>
        </div>
    );
};

export default LoginTemplate;