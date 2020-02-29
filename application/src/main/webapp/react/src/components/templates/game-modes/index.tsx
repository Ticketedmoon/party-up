import * as React from "react";
import PrimaryButton from "../../atoms/button/primary";
import "./style/style.css"
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getActiveState, redirectToRouteWithRoot} from "../../../utils/history";
import {RootStateOrAny, useSelector} from "react-redux";

const GameModes = (props: any) => {

    const username = useSelector((state: RootStateOrAny) => state.activeUser.username);

    return (
        <div className={"game-modes wrapper"}>

            <div className={"game-modes top-row"}>
                <div className={"game-modes user-details"}>
                    <FontAwesomeIcon icon={faChessKing} />
                    <p> Level: 52 </p>
                </div>
                <div className={"game-modes title"}>
                    <h2> Game Modes </h2>
                </div>
                <div className={"game-modes profile"}>
                    <FontAwesomeIcon icon={faUser} />
                    <b> <p> { username } </p> </b>
                </div>
            </div>

            <div className={"button-form-container"}>
                <PrimaryButton text={"Battle"} click={() => console.log("Battle Clicked")}/>
                <PrimaryButton text={"Time Attack"} click={() => console.log("Time Attack Clicked")}/>
                <PrimaryButton text={"War"} click={() => console.log("War Clicked")}/>
                <PrimaryButton text={"Tag Team"} click={() => console.log("Tag Team Clicked")}/>
            </div>

            <div className={"login-return-button"}>
                <PrimaryButton text={"Return to Login"} click={() => redirectToRouteWithRoot("/", {})}/>
            </div>
        </div>
    );
};

export default GameModes;
