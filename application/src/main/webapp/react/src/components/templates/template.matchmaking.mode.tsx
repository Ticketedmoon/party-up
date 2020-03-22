import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import "./style/style.css"
import Loader from 'react-loader-spinner';
import {redirectToRouteWithRoot} from "../../utils/history";
import {LoaderSpinner} from "../atoms/loaders/react-loader-spinner";

export const MatchmakingMode = () => {

    const [loading, setLoading] = useState(true);

    const startMatch = () => {
        redirectToRouteWithRoot("/game/1", null);
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
            <div className={"loading"}>
               <LoaderSpinner type={"Oval"} color={"green"} height={70} width={70}/>
            </div>
        ) : undefined
    );
};
