import * as React from "react";

const style = require("./style/style.module.css");

/**
 * Prop Values:
 * - title: string -- A title describing the text input field above it.
 * - type: string -- The type of the input field.
 * - keypress: Function -- callback for when a user types a specific key (E.G. Enter).
 * - update: Function -- callback for when a user types a value into the field.
 * @param props
 * @constructor
 */
const TextInputField = (props: {title: string, type: string, keypress: Function, update: Function}) => {
    return (
        <div>
            <p> {props.title} </p>
            <input className={style["customized"]} type={props.type}
                   onKeyDown={(event: React.KeyboardEvent) => props.keypress(event)} onChange={(event) => {
                props.update(event.currentTarget.value);
            }}/>
        </div>
    )
};

export default TextInputField;
