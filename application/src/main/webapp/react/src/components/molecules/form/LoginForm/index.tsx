import * as React from "react";
import TextInputField from "../../../atoms/input/TextInputField";
import {useState} from "react";
import PrimaryButton from "../../../atoms/button/primary";
import "./style/style.css"

const LoginForm = (props: any) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <div className={"login-form"}>
            <TextInputField title={"Email: "} type={"email"} update={(value: string) => setUsername(value)}/>
            <TextInputField title={"Password: "} type={"password"} update={(value: string) => setPassword(value)}/>
            <PrimaryButton text={props.text} click={() => props.checkCredentials(username, password)}/>
        </div>
    );
};

export default LoginForm;