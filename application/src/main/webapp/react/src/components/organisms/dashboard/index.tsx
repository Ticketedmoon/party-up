import React, {Fragment, useEffect, useState} from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import axios from "axios";
import {Game} from "../../../utils/types/game.dto.type";
import {useToasts} from "react-toast-notifications";

const style = require("./style/style.module.css");

const Dashboard = () => {

    const {addToast} = useToasts();

    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        axios.get(window.location.origin + "/games/findAll")
            .then((res) => {
                let games: Game[] = res.data;
                setGames(games);
            })
            .catch(() => {
                addToast(
                    `Failure to find game listing data! Please check the application status`, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
            });
    }, []);

    const handleClick = (gameID: any) => {
        redirectToRouteWithRoot("/app/party/game/" + gameID, null);
    };

    return (
        <Fragment>
            <div className={style["dashboard-container"]}>

                <div className={style["left-body-wrapper"]}>
                    <div>
                        <div className={style["search-box"]}>
                            <input placeholder={"Search for a game..."}/>
                        </div>
                        <div className={style["search-info-text"]}>
                            <p></p>
                        </div>
                    </div>

                    <div>
                        <h2> Your recent searches: </h2>
                        <div className={style["recent-games-selected"]}>
                            {
                                games.slice(0, 3).map((game: Game) => {
                                    return (
                                        <div className={style['grid-item']}
                                             onClick={() => handleClick(1)}>
                                            <div>
                                                <img src={"https://" + game.screenshotUrl.substring(2)} alt={"Screenshot for game: " + game.name}/>
                                            </div>
                                            <div className={style["grid-item-text"]}> {game.name} </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className={style["right-body-wrapper"]}>
                    {
                        games.map((game: Game) => {
                            return (
                                <div className={style['grid-item']}
                                     onClick={() => handleClick(1)}>
                                    <div>
                                        <img src={"https://" + game.screenshotUrl.substring(2)} alt={"Screenshot for game: " + game.name}/>
                                    </div>
                                    <div className={style["grid-item-text"]}> {game.name} </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </Fragment>
    );
};

export default Dashboard;
