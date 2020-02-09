import * as React from "react";

const PrimaryButton = (props: any) => {

    return (
      <div>
          <button type="button" className="btn btn-primary" onClick={() => {
              props.click();
          }}> {props.text} </button>
      </div>
    );
};

export default PrimaryButton;