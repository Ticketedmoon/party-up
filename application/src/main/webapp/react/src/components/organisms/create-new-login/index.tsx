import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";
import history, {redirectToRouteWithRoot} from "../../../utils/history";
import {useToasts} from 'react-toast-notifications';
import BootstrapButton from "../../atoms/button/primary";
import axios from "axios";

const CreateNewLoginContainer = (props: any) => {

    const { addToast } = useToasts();

    const verifyNewUser = (username: string, password: string) => {
        console.log("User with name: " + username + " validating...");

        axios.post(window.location.href, {'username': username, 'password': password})
            .then(response => {
            if (response.status >= 200 && response.status < 300) {
                addToast("User: {" + username + "}  Successfully Created", {
                    appearance: 'success',
                    autoDismiss: true,
                });
                history.goBack();
            }
        }).catch(() => {
            addToast("User: {" + username + "}  failed to create", {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    };

    return (
        <div className={"login-template-wrapper"}>
            <div className={"login-template"}>
                <span className={"login-template-title"}> Create New Account </span>
                <LoginForm text={"Create New Account"}
                           checkCredentials={(username: string, password: string) => verifyNewUser(username, password)}/>
                <BootstrapButton text={"Return to Login"} click={() => redirectToRouteWithRoot("/", {})}/>
            </div>
        </div>
    );
};

export default CreateNewLoginContainer;
