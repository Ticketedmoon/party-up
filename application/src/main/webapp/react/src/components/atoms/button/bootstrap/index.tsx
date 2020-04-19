import * as React from "react";

export interface BootstrapButtonType {
    className?: string,
    click: Function,
    enabled?: boolean,
    text: string,
    bootstrapColor?: string
}

const defaultProps: Object = {
    enabled: true,
    bootstrapColor: "primary",
    className: "default"
};

/**
 * Prop Values:
 * - className: string -- Access to class for styling
 * - click: Function -- callback method when button clicked
 * - enabled: boolean -- Whether button enabled or disabled
 * - text: string -- Text of the button
 * - bootstrap-color: string -- Examples: {primary, secondary, success, danger, warning, info, light, dark, link}
 * @param props
 * @constructor
 */
const BootstrapButton: React.FunctionComponent<BootstrapButtonType> = (props:BootstrapButtonType) => {
    return (
      <div className={props.className}>
          <button type="button" className={`btn-${props.bootstrapColor}`} onClick={(event: React.MouseEvent<HTMLElement>) => {
              props.click(event);
          }} disabled={!props.enabled}> {props.text} </button>
      </div>
    );
};

BootstrapButton.defaultProps = defaultProps;

export default BootstrapButton;
