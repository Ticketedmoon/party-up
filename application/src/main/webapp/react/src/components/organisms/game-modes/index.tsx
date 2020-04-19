import * as React from "react";
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {redirectToRouteWithCurrent, redirectToRouteWithRoot} from "../../../utils/history";
import ButtonForm from "../../molecules/form/ButtonForm";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

const GameModesContainer = () => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    const handleGameModeClick = (event: Event) => {
        console.log("clicked: " + event);
    };

    const handleMatchMakingClick = (mode: string) => {
        redirectToRouteWithCurrent("/type/" + mode, null);
    };

    return (
        <>
            <div className={style["game-modes"]}>

                {/* Item 1*/}
                <div className={style["game-modes-item user-details"]}>
                    <FontAwesomeIcon icon={faChessKing} />
                    <b> <p> Level: { user.level } </p> </b>
                </div>

                {/* Item 2 */}
                <div className={style["game-modes-item title"]}>
                    <h4> Game Modes </h4>
                </div>

                {/* Item 3 */}
                <div className={style["game-modes-item profile"]}>
                    <FontAwesomeIcon icon={faUser} />
                    <b> <p> { user.username } </p> </b>
                </div>

                {/* Item 4 */}
                <div className={style["game-mode-area-container-wrapper"]}>
                    <ButtonForm buttonListConfigurations={[
                        {text: "Battle", click: (event: Event) => handleGameModeClick(event), bootstrapColor: 'success'},
                        {text: "Time Attack", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "War", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Tag Team", click: (event: Event) => handleGameModeClick(event), enabled: false},
                        {text: "Logout", click: () => redirectToRouteWithRoot("/", {}), bootstrapColor: 'light', className: 'logout-button'}
                    ]} />

                </div>

                {/* Item 5 - Public games container to appear on state change */}
                <div className={style['grid-item-A grid-item-container']} onClick={() => handleMatchMakingClick("matchmaking")}>
                    <div className={style["grid-item-a-image"]}/>
                    <div className={style["grid-item-text"]}> Matchmaking Mode </div>
                </div>

                {/* Item 6*/}
                <div className={style['grid-item-B grid-item-container']}>
                    <div className={style["grid-item-b-image"]}/>
                    <div className={style["grid-item-text"]}> Tournament Mode </div>
                </div>

            </div>
        </>
    );
};

export default GameModesContainer;
