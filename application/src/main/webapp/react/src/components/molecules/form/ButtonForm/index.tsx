import BootstrapButton, {BootstrapButtonType} from "../../../atoms/button/primary";
import * as React from "react";
import "./style/style.css";

/**
 * Prop Values:
 * - buttonListConfigurations: PrimaryButtonType[] -- An Array of PrimaryButtonType objects to be rendered in the form.
 * - animation: string -- CSS animation name passed into the Form Container
 * @param props
 * @constructor
 */
const ButtonForm = (props: {buttonListConfigurations: BootstrapButtonType[], animation: string}) => {
    return (
        <div className={`button-form-container ${props.animation}`}>
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

export default ButtonForm;
