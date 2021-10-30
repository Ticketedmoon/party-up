import * as React from "react";
import {FunctionComponent, useEffect, useState} from "react";
import {redirectToRouteWithCurrent} from "../../utils/history/history";
import {LoaderSpinner} from "../atoms/loaders/react-loader-spinner";

const style = require("./style/style.module.css");

export const MatchmakingModeTemplate: FunctionComponent<any> = () => {

    const [loading, setLoading] = useState(true);

    const startMatch = () => {
        redirectToRouteWithCurrent("/room/1", null);
    };

    // Temporary - delete after
    useEffect(() => {
        setTimeout(() => {
            startMatch();
            setLoading(false);
        }, 3000)
    }, []);

    return (
        (loading) ? (
            <div className={style["loading"]}>
               <LoaderSpinner type={"Oval"} color={"green"} height={70} width={70}/>
            </div>
        ) : null
    );
};
