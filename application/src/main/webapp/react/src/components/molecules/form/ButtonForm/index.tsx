import BootstrapButton, {BootstrapButtonType} from "../../../atoms/button/bootstrap";
import * as React from "react";

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
                props.buttonListConfigurations.map((buttonConfig: BootstrapButtonType, index: number) => {
                    return (
                        <BootstrapButton className={buttonConfig.className}
                                         key={index}
                                         text={buttonConfig.text}
                                         click={(event: Event) => buttonConfig.click(event)}
                                         bootstrapColor={buttonConfig.bootstrapColor}
                                         enabled={buttonConfig.enabled}
                        />
                    )
                })
            }
        </div>
    )
};

export interface ButtonFormType {
    buttonListConfigurations: BootstrapButtonType[],
    animation?: String
}

const defaultProps: Object = {
    animation: null
};

ButtonForm.defaultProps = defaultProps;

export default ButtonForm;
