import * as React from "react";
import "./style/style.css";

const PrimaryButton = (props: any) => {

    return (
      <div>
          <button type="button" className="btn btn-primary custom" onClick={() => {
              props.click();
          }}> {props.text} </button>
      </div>
    );
};

export default PrimaryButton;
