import Loader from "react-loader-spinner";
import * as React from "react";
import "./style/style.css";

type Types =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified';

interface LoaderSpinnerType {
    type: Types,
    color: string,
    height: number,
    width: number
}

export const LoaderSpinner = (props: LoaderSpinnerType) => {
    return (
        <div className={"loader-spinner"}>
            <Loader type={props.type} color={props.color} height={props.height} width={props.width}/>
        </div>
    );
}
