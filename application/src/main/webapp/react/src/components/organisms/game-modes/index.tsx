import * as React from "react";
import {faChessKing, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {redirectToRouteWithCurrent, redirectToRouteWithRoot} from "../../../utils/history";
import ButtonForm from "../../molecules/form/ButtonForm";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

const GameModesContainer = () => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    enum GameMode {
        Battle,
        TimeAttack,
        War,
        TagTeam
    }

    const handleGameModeClick = (type: GameMode) => {
        switch (type) {
            case GameMode.Battle:
                break;
            case GameMode.TimeAttack:
                break;
            case GameMode.War:
                break;
            case GameMode.TagTeam:
                break;
        }
    };

    const handleMatchMakingClick = (mode: string) => {
        redirectToRouteWithCurrent("/type/" + mode, null);
    };

    return (
        <>
            <div className={style["game-modes"]}>
                <div className={style["header"]}>
                    {/* Nav Item A */}
                    <div className={`${style["game-modes-item"]} ${style["user-details"]}`}>
                        <FontAwesomeIcon icon={faChessKing}/>
                        <b><p> Level: {user.level} </p></b>
                    </div>

                    {/* Nav Item B */}
                    <div className={`${style["game-modes-item"]} ${style["title"]}`}>
                        <h4> Game Modes </h4>
                    </div>

                    {/* Nav Item C */}
                    <div className={`${style["game-modes-item"]} ${style["profile"]}`}>
                        <FontAwesomeIcon icon={faUser}/>
                        <b><p> {user.username} </p></b>
                    </div>
                </div>

                <div className={style["main-body-wrapper"]}>
                    <div className={style["game-mode-area-container-wrapper"]}>
                        <ButtonForm buttonListConfigurations={[
                            {text: "Battle", onClick: () => handleGameModeClick(GameMode.Battle), color: 'primary'},
                            {
                                text: "Time Attack",
                                onClick: () => handleGameModeClick(GameMode.TimeAttack),
                                enabled: false
                            },
                            {text: "War", onClick: () => handleGameModeClick(GameMode.War), enabled: false},
                            {text: "Tag Team", onClick: () => handleGameModeClick(GameMode.TagTeam), enabled: false},
                            {
                                text: "Public Chat",
                                onClick: () => redirectToRouteWithRoot("/public/chat", {}),
                            },
                            {
                                text: "Logout",
                                onClick: () => redirectToRouteWithRoot("/", {}),
                                color: "primary",
                                className: 'logout-button'
                            }
                        ]}/>
                    </div>

                    <div className={style["mode-body"]}>
                        {/* Item 1 - Public games container to appear on state change */}
                        <div className={`${style['grid-item-A']} ${style['grid-item-container']}`}
                             onClick={() => handleMatchMakingClick("matchmaking")}>
                            <div className={style["grid-item-a-image"]}/>
                            <div className={style["grid-item-text"]}> Matchmaking Mode</div>
                        </div>

                        {/* Item 2 */}
                        <div className={`${style['grid-item-container']}`}>
                            <div className={style["grid-item-b-image"]}/>
                            <div className={style["grid-item-text"]}> Tournament Mode</div>
                        </div>

                        {/* Item 3 */}
                        <div className={`${style['grid-item-C']} ${style['grid-item-container']}`}
                             onClick={() => handleMatchMakingClick("matchmaking")}>
                            <div className={style["grid-item-a-image"]}/>
                            <div className={style["grid-item-text"]}> X Mode</div>
                        </div>

                        {/* Item 4 */}
                        <div className={`${style['grid-item-D']} ${style['grid-item-container']}`}>
                            <div className={style["grid-item-b-image"]}/>
                            <div className={style["grid-item-text"]}> Y Mode</div>
                        </div>

                        {/* Item 5 */}
                        <div className={`${style['grid-item-E']} ${style['grid-item-container']}`}
                             onClick={() => handleMatchMakingClick("matchmaking")}>
                            <div className={style["grid-item-a-image"]}/>
                            <div className={style["grid-item-text"]}> Z Mode</div>
                        </div>

                        {/* Item 6 */}
                        <div className={`${style['grid-item-F']} ${style['grid-item-container']}`}>
                            <div className={style["grid-item-b-image"]}/>
                            <div className={style["grid-item-text"]}> S Mode</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default GameModesContainer;
