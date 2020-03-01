import * as React from "react";
import "./style/style.css";

export interface PrimaryButtonProps {
    text: string,
    enabled?: boolean,
    click: Function
}

const defaultProps: Object = {
    enabled: true
};

const PrimaryButton: React.FunctionComponent<PrimaryButtonProps> = (props:PrimaryButtonProps) => {
    return (
      <div>
          <button type="button" className="btn btn-primary custom" onClick={() => {
              props.click();
          }} disabled={!props.enabled}> {props.text} </button>
      </div>
    );
};

PrimaryButton.defaultProps = defaultProps;

export default PrimaryButton;
