import PrimaryButton, {PrimaryButtonProps} from "../../../atoms/button/primary";
import * as React from "react";
import "./style/style.css";

const ButtonForm = (props: {buttonListConfigurations: PrimaryButtonProps[]}) => {
  return (
      <div className={"button-form-container"}>
          {
              props.buttonListConfigurations.map((buttonConfig: PrimaryButtonProps, index: number) => {
                  return (<PrimaryButton key={index} text={buttonConfig.text} click={() => buttonConfig.click()} enabled={buttonConfig.enabled}/>)
              })
          }
      </div>
  )
};

export default ButtonForm;
