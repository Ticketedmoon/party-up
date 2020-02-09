import * as React from "react";

const TextInputField = (props: any) => {
    return (
        <div>
            <p> {props.title} </p>
            <input type="text" onChange={(event) => {
                props.update(event.currentTarget.value);
            }}/>
        </div>
    )
};

export default TextInputField;