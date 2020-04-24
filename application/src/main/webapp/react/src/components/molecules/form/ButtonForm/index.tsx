import * as React from "react";
import {Button} from "@material-ui/core";

const style = require("./style/style.module.css");

/**
 * Prop Values:
 * - buttonListConfigurations: PrimaryButtonType[] -- An Array of PrimaryButtonType objects to be rendered in the form.
 * - animation: string -- CSS animation name passed into the Form Container
 * @param props
 * @constructor
 */
const ButtonForm = (props: ButtonFormType) => {
    return (
        <div className={`${style[`button-form-container`]} ${style[`${props.animation}`]}`}>
            {
                props.buttonListConfigurations.map((buttonConfig: ButtonConfigurationType, index: number) => {
                    return (
                        <Button key={index}
                                variant={"contained"}
                                onClick={(event) => buttonConfig.onClick(event)}
                                color={buttonConfig.color}
                                disabled={!buttonConfig.enabled}
                        > {buttonConfig.text} </Button>
                    )
                })
            }
        </div>
    )
};

export interface ButtonConfigurationType {
    text: string,
    onClick: Function,
    color: string,
    enabled: boolean
}

export interface ButtonFormType {
    buttonListConfigurations: ButtonConfigurationType[],
    animation?: String
}

const defaultProps: Object = {
    animation: null
};

ButtonForm.defaultProps = defaultProps;

export default ButtonForm;
