import * as React from "react";
import TextInputField from "../../../atoms/input/TextInputField";
import {useState} from "react";
import PrimaryButton from "../../../atoms/button/primary";
import "./style/style"

const LoginForm = (props: any) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className={"login-form"}>
            <TextInputField title={"Username: "} update={(value: string) => setUsername(value)}/>
            <TextInputField title={"Password: "} update={(value: string) => setPassword(value)}/>
            <PrimaryButton text={"Login"} click={() => {
                console.log(username + " has successfully logged in.");
            }}/>
        </div>
    );
};

export default LoginForm;