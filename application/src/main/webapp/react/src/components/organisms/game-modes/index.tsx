import * as React from "react";
import {useState} from "react";
import BootstrapButton from "../../atoms/button/primary";
import "./style/style.css"
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {redirectToRouteWithRoot} from "../../../utils/history";
import {RootStateOrAny, useSelector} from "react-redux";
import ButtonForm from "../../molecules/form/ButtonForm";

const GameModesContainer = (props: any) => {

    //const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const user = {username: "test", level: 1};

    const handleGameModeClick = (event: Event) => {
        console.log("clicked");
    };

    return (
        <>
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

                <div className={"game-mode-area-container-wrapper"}>
                    <ButtonForm buttonListConfigurations={[
                        {text: "Battle", click: (event: Event) => handleGameModeClick(event), bootstrapColor: 'success'},
                        {text: "Time Attack", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "War", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Tag Team", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Logout", click: () => redirectToRouteWithRoot("/", {}), bootstrapColor: 'light', className: 'logout-button'}
                    ]} />

                    {/* Public games container to appear on state change */}
                    <div className={'public-games-container'}>
                    </div>

                </div>

            </div>
        </>
    );
};

export default GameModesContainer;
