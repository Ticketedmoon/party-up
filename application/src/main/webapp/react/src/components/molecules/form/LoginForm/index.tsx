import * as React from "react";
import {useState} from "react";
import TextInputField from "../../../atoms/input/TextInputField";
import {Button} from "@material-ui/core";

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
            <Button className={style["customized"]} color={"primary"} variant={"outlined"} size={"small"}
                    onClick={() => props.checkCredentials(username, password)}> {props.text} </Button>
        </div>
    );
};

export default LoginForm;
