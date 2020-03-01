import * as React from "react";
import PrimaryButton from "../../atoms/button/primary";
import "./style/style.css"
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getActiveState, redirectToRouteWithRoot} from "../../../utils/history";
import {RootStateOrAny, useSelector} from "react-redux";
import ButtonForm from "../../molecules/form/ButtonForm";

const GameModes = (props: any) => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    return (
        <div className={"game-modes wrapper"}>

            <div className={"game-modes top-row"}>
                <div className={"game-modes user-details"}>
                    <FontAwesomeIcon icon={faChessKing} />
                    <b> <p> Level: { user.level } </p> </b>
                </div>
                <div className={"game-modes title"}>
                    <h2> Game Modes </h2>
                </div>
                <div className={"game-modes profile"}>
                    <FontAwesomeIcon icon={faUser} />
                    <b> <p> { user.username } </p> </b>
                </div>
            </div>

            <ButtonForm buttonListConfigurations={[
                {text: "Battle", click: () => console.log("Battle Clicked")},
                {text: "Time Attack", click: () => console.log("Time Attack Clicked"), enabled: false},
                {text: "War", click: () => console.log("War Clicked"), enabled: false},
                {text: "Tag Team", click: () => console.log("Tag Team Clicked"), enabled: false}
            ]}/>

            <div className={"login-return-button"}>
                <PrimaryButton text={"Return to Login"} click={() => redirectToRouteWithRoot("/", {})}/>
            </div>
        </div>
    );
};

export default GameModes;
