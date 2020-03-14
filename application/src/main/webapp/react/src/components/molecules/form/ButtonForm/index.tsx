import PrimaryButton, {PrimaryButtonType} from "../../../atoms/button/primary";
import * as React from "react";
import "./style/style.css";

/**
 * Prop Values:
 * - buttonListConfigurations: PrimaryButtonType[] -- An Array of PrimaryButtonType objects to be rendered in the form.
 * - animation: string -- CSS animation name passed into the Form Container
 * @param props
 * @constructor
 */
const ButtonForm = (props: {buttonListConfigurations: PrimaryButtonType[], animation: string}) => {
  return (
      <div className={`button-form-container ${props.animation}`}>
          {
              props.buttonListConfigurations.map((buttonConfig: PrimaryButtonType, index: number) => {
                  return (<PrimaryButton key={index} text={buttonConfig.text} click={(event: Event) => buttonConfig.click(event)} enabled={buttonConfig.enabled}/>)
              })
          }
      </div>
  )
};

export default ButtonForm;
