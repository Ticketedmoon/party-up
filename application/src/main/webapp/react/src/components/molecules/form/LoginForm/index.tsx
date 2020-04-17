import * as React from "react";
import TextInputField from "../../../atoms/input/TextInputField";
import {useState} from "react";
import BootstrapButton from "../../../atoms/button/bootstrap";

const style = require("./style/style.module.css");

/**
 * Prop Values:
 * - checkCredentials(username, password): Function -- A callback function passed back up with values from form.
 * @param props
 * @constructor
 */
const LoginForm = (props: any) => {

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();

    const keyPress = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            props.checkCredentials(username, password);
        }
    };

    return (
        <div className={style["login-form"]}>
            <TextInputField title={"Email: "} type={"email"} update={(value: string) => setUsername(value)}
                            keypress={(e: React.KeyboardEvent) => keyPress(e)}/>
            <TextInputField title={"Password: "} type={"password"} update={(value: string) => setPassword(value)}
                            keypress={(e: React.KeyboardEvent) => keyPress(e)}/>
            <BootstrapButton text={props.text} click={() => props.checkCredentials(username, password)}/>
        </div>
    );
};

export default LoginForm;
