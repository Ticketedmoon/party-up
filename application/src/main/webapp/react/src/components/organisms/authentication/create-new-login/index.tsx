import * as React from "react";
import LoginForm from "../../../molecules/form/LoginForm";
import history, {redirectToRouteWithRoot} from "../../../../utils/history/history";
import {useToasts} from 'react-toast-notifications';
import axios from "axios";
import {Button} from "@material-ui/core";

const style = require("./style/style.module.css");

const CreateNewLoginContainer = () => {

    const {addToast} = useToasts();

    const createNewUser = (username: string, password: string) => {
        axios.post(window.location.origin + "/users/create", {'username': username, 'password': password})
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
                           checkCredentials={(username: string, password: string) => createNewUser(username, password)}/>
                <Button color="primary" variant="contained"
                        onClick={() => redirectToRouteWithRoot("/", {})}> Return to Login </Button>
            </div>
        </div>
    );
};

export default CreateNewLoginContainer;
