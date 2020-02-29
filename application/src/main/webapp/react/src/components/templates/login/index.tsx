import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";
import PrimaryButton from "../../atoms/button/primary";
import {redirectToRouteWithCurrent, redirectToRouteWithRoot} from "../../../utils/history";
import {useToasts} from "react-toast-notifications";

const LoginTemplate = (props: any) => {

    const { addToast } = useToasts();

    const tryLogin = (username: string, password: string) => {
        console.log("User with name: " + username + " attempting login...");
        fetch(window.location.href, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({'username': username, 'password': password})
        }).then(response => response.json()).then(data => {
            if (data != null) {
                addToast("User: {" + username + "}  Successfully logged in", {
                    appearance: 'success',
                    autoDismiss: true,
                });
                redirectToRouteWithRoot("/game-modes");
            }
            else {
                addToast("User: {" + username + "}  failed to log in", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }).catch((err) => {
            addToast("User: {" + username + "}  failed to log in", {
                appearance: 'error',
                autoDismiss: true,
            });
        })
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
