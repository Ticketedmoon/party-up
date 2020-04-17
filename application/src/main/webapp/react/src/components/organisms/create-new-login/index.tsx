import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import history, {redirectToRouteWithRoot} from "../../../utils/history";
import {useToasts} from 'react-toast-notifications';
import BootstrapButton from "../../atoms/button/bootstrap";
import axios from "axios";

const style = require("./style/style.module.css");

const CreateNewLoginContainer = () => {

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
            }).catch((error) => {
            addToast(`User: ${username} failed to create - ${error.response.data.message}`, {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    };

    return (
        <div className={style["login-template-wrapper"]}>
            <div className={style["login-template"]}>
                <span className={style["login-template-title"]}> Create New Account </span>
                <LoginForm text={"Create New Account"}
                           checkCredentials={(username: string, password: string) => verifyNewUser(username, password)}/>
                <BootstrapButton text={"Return to Login"} click={() => redirectToRouteWithRoot("/", {})}/>
            </div>
        </div>
    );
};

export default CreateNewLoginContainer;
