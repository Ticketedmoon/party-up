import React, {Fragment} from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import ButtonForm from "../../molecules/form/ButtonForm";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

const Dashboard = () => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    const handleMatchMakingClick = (gameID: string) => {
        redirectToRouteWithRoot("/party/game/" + gameID, null);
    };

    return (
        <Fragment>
            <div className={style["game-modes"]}>
                <div className={style["header"]}>
                    <div className={`${style["game-modes-item"]} ${style["profile"]}`}>
                        <FontAwesomeIcon icon={faUser}/>
                        <b><p> {user.username} </p></b>
                    </div>
                </div>

                <div className={style["main-body-wrapper"]}>
                    <div className={style["game-mode-area-container-wrapper"]}>
                        <ButtonForm buttonListConfigurations={[
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
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
