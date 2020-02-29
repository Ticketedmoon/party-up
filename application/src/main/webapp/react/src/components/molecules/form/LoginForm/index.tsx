import * as React from "react";
import TextInputField from "../../../atoms/input/TextInputField";
import {useState} from "react";
import PrimaryButton from "../../../atoms/button/primary";
import "./style/style.css"

const LoginForm = (props: any) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const keyPress = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            props.checkCredentials(username, password);
        }
    };

    return (
        <div className={"login-form"}>
            <TextInputField title={"Email: "} type={"email"} update={(value: string) => setUsername(value)}
                            keypress={(e: React.KeyboardEvent) => keyPress(e)}/>
            <TextInputField title={"Password: "} type={"password"} update={(value: string) => setPassword(value)}
                            keypress={(e: React.KeyboardEvent) => keyPress(e)}/>
            <PrimaryButton text={props.text} click={() => props.checkCredentials(username, password)}/>
        </div>
    );
};

export default LoginForm;
