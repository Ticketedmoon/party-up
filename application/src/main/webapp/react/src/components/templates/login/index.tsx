import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";
import PrimaryButton from "../../atoms/button/primary";
import { redirectToRouteWithCurrent } from "../../../utils/history";

const LoginTemplate = (props: any) => {

    const tryLogin = (username: string, password: string) => {
        // TODO: - Send to controller and verify with DB user exists
        // TODO: - Look into spring security?
        console.log("User with name: " + username + " attempted login");
    };

    return (
        <div className={"login-template"}>
            <span className={"login-template-title"}> Code Wars </span>
            <LoginForm text={"Login"} checkCredentials={(username: string, password: string) => tryLogin(username, password)}/>
            <PrimaryButton text={"Create New Account"} click={() => redirectToRouteWithCurrent("/create")}/>
        </div>
    );
};

export default LoginTemplate;