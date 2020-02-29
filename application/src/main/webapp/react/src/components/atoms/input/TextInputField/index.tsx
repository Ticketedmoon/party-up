import * as React from "react";

const TextInputField = (props: {title: string, type: string, keypress: Function, update: Function}) => {
    return (
        <div>
            <p> {props.title} </p>
            <input type={props.type} onKeyDown={(event: React.KeyboardEvent) => props.keypress(event)} onChange={(event) => {
                props.update(event.currentTarget.value);
            }}/>
        </div>
    )
};

export default TextInputField;
