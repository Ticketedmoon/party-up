import * as React from "react";
import LoginForm from "../../molecules/form/LoginForm";
import "./style/style.css";
import history from "../../../utils/history";

const CreateNewLoginTemplate = (props: any) => {

    const verifyNewUser = (username: string, password: string) => {
        console.log("User with name: " + username + " validating...");
        history.goBack();
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