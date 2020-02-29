import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";
import history from "../../../utils/history";
import { useToasts } from 'react-toast-notifications';

const CreateNewLoginTemplate = (props: any) => {

    const { addToast } = useToasts();

    const verifyNewUser = (username: string, password: string) => {
        console.log("User with name: " + username + " validating...");

        fetch(window.location.href, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({'username': username, 'password': password})
        }).then(response => response.json().then(accountCreated => {
            if (accountCreated) {
                addToast("User: {" + username + "}  Successfully Created", {
                    appearance: 'success',
                    autoDismiss: true,
                });
                history.goBack();
            }
            else {
                addToast("User: {" + username + "}  failed to create", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        })).catch((e) => {
            addToast("User: {" + username + "}  failed to create", {
                appearance: 'error',
                autoDismiss: true,
            });
        });
    };

    return (

        <div className={"login-template"}>
            <span className={"login-template-title"}> Create New Account </span>
            <LoginForm text={"Create New Account"}
                       checkCredentials={(username: string, password: string) => verifyNewUser(username, password)}/>
        </div>
    );
};

export default CreateNewLoginTemplate;
