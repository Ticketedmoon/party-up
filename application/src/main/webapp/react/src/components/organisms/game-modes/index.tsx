import * as React from "react";
import "./style/style.css"
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {redirectToRouteWithCurrent, redirectToRouteWithRoot} from "../../../utils/history";
import ButtonForm from "../../molecules/form/ButtonForm";
import {RootStateOrAny, useSelector} from "react-redux";

const GameModesContainer = (props: any) => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    const handleGameModeClick = (event: Event) => {
        console.log("clicked");
    };

    const handleMatchMakingClick = (mode: string) => {
        redirectToRouteWithCurrent("/type/" + mode, null);
    };

    return (
        <>
            <div className={"game-modes wrapper"}>

                {/* Item 1*/}
                <div className={"game-modes-item user-details"}>
                    <FontAwesomeIcon icon={faChessKing} />
                    <b> <p> Level: { user.level } </p> </b>
                </div>

                {/* Item 2 */}
                <div className={"game-modes-item title"}>
                    <h4> Game Modes </h4>
                </div>

                {/* Item 3 */}
                <div className={"game-modes-item profile"}>
                    <FontAwesomeIcon icon={faUser} />
                    <b> <p> { user.username } </p> </b>
                </div>

                {/* Item 4 */}
                <div className={"game-mode-area-container-wrapper"}>
                    <ButtonForm buttonListConfigurations={[
                        {text: "Battle", click: (event: Event) => handleGameModeClick(event), bootstrapColor: 'success'},
                        {text: "Time Attack", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "War", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Tag Team", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Logout", click: () => redirectToRouteWithRoot("/", {}), bootstrapColor: 'light', className: 'logout-button'}
                    ]} />

                </div>

                {/* Item 5 - Public games container to appear on state change */}
                <div className={'grid-item-A grid-item-container'} onClick={() => handleMatchMakingClick("matchmaking")}>
                    <div className={"grid-item-a-image"}/>
                    <div className={"grid-item-text"}> Matchmaking Mode </div>
                </div>

                {/* Item 6*/}
                <div className={'grid-item-B grid-item-container'}>
                    <div className={"grid-item-b-image"}/>
                    <div className={"grid-item-text"}> Tournament Mode </div>
                </div>

            </div>
        </>
    );
};

export default GameModesContainer;
