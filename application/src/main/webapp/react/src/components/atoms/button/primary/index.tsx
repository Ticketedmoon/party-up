import * as React from "react";
import "./style/style.css";

export interface PrimaryButtonType {
    className?: string,
    click: Function,
    enabled?: boolean,
    text: string,
}

const defaultProps: Object = {
    enabled: true
};

/**
 * Prop Values:
 * - className: string -- Access to class for styling
 * - click: Function -- callback method when button clicked
 * - enabled: boolean -- Whether button enabled or disabled
 * - text: string -- Text of the button
 * @param props
 * @constructor
 */
const PrimaryButton: React.FunctionComponent<PrimaryButtonType> = (props:PrimaryButtonType) => {
    return (
      <div className={props.className}>
          <button type="button" className="btn btn-primary custom" onClick={(event: React.MouseEvent<HTMLElement>) => {
              props.click(event);
          }} disabled={!props.enabled}> {props.text} </button>
      </div>
    );
};

PrimaryButton.defaultProps = defaultProps;

export default PrimaryButton;
