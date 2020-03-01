import PrimaryButton, {PrimaryButtonProps} from "../../../atoms/button/primary";
import * as React from "react";
import "./style/style.css";

const ButtonForm = (props: {buttonListConfigurations: PrimaryButtonProps[], animation: string}) => {
  return (
      <div className={`button-form-container ${props.animation}`}>
          {
              props.buttonListConfigurations.map((buttonConfig: PrimaryButtonProps, index: number) => {
                  return (<PrimaryButton key={index} text={buttonConfig.text} click={(event: Event) => buttonConfig.click(event)} enabled={buttonConfig.enabled}/>)
              })
          }
      </div>
  )
};

export default ButtonForm;
