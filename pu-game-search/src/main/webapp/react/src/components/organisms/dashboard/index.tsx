import React, {CSSProperties, Fragment, useEffect, useState} from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import axios from "axios";
import {Game} from "../../../utils/types/game.dto.type";
import {useToasts} from "react-toast-notifications";
import {Button} from "@material-ui/core";

const style = require("./style/style.module.css");

const Dashboard = () => {

    const {addToast} = useToasts();

    const [games, setGames] = useState<Game[]>([]);
    const [gameSearchQuery, setGameSearchQuery] = useState<string>("");

    const getGameBoxStyle = (gameImageURL: string): CSSProperties => {
        return {
            backgroundImage: `url(${gameImageURL})`,
            backgroundSize: "cover"
        }
    }

    useEffect(() => {
        axios.get(window.location.origin + "/api/games/find/all/10")
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

    const findGamesByQuery = () => {
        axios.get(window.location.origin + "/api/games/find/", {
            params: {
                query: gameSearchQuery
            }
        }).then((res) => {
            let games: Game[] = res.data;
            setGames(games);
        }).catch(() => {
            addToast(
                `Failure to find game listing data! Please check the application status`, {
                    appearance: 'error',
                    autoDismiss: true,
                });
        });
    }

    const handleClick = (gameID: any) => {
        redirectToRouteWithRoot("/app/party/game/" + gameID, null);
    };

    return (
        <Fragment>
            <div className={style["dashboard-container"]}>

                <div className={style["left-body-wrapper"]}>
                    <div>
                        <div className={style["search-box"]}>
                            <input placeholder={"Search for a game..."} onChange={(e) => setGameSearchQuery(e.target.value)}/>
                            <Button className={style["customized"]} color={"secondary"} variant={"contained"} size={"small"}
                                    onClick={() => findGamesByQuery()}> Search </Button>
                        </div>
                        <div className={style["search-info-text"]}>
                            <p> Search for a video game to party up with other players! </p>
                        </div>
                    </div>

                    <div>
                        <h2> Your recent searches: </h2>
                        <div className={style["recent-games-selected"]}>
                            {
                                games.slice(0, 3).map((game: Game) => {
                                    return (
                                        <div className={style['grid-item']}
                                             onClick={() => handleClick(1)}
                                             style={getGameBoxStyle("https://" + game.screenshots[0].url.substring(2))}>
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
                                     onClick={() => handleClick(1)}
                                     style={getGameBoxStyle("https://" + game.screenshots[0].url.substring(2))}>
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
