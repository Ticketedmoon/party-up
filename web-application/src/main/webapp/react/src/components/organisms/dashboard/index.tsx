import React, {CSSProperties, Fragment, useEffect, useState} from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import axios from "axios";
import {Game} from "../../../utils/types/game.dto.type";
import {useToasts} from "react-toast-notifications";

const style = require("./style/style.module.css");

export const Dashboard = () => {

    const {addToast} = useToasts();

    const [games, setGames] = useState<Game[]>([]);

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


    const handleClick = (gameID: any) => {
        redirectToRouteWithRoot("/app/party/game/" + gameID, null);
    };

    return (
        <Fragment>
            <div className={style["dashboard-container"]}>

                <div className={style["left-body-wrapper"]}>
                    <div>
                        <h2> Your recent searches: </h2>
                        <div className={style["recent-games-selected"]}>
                            {
                                games.slice(0, 3).map((game: Game) => {
                                    return (
                                        <div className={style['grid-item']}
                                             onClick={() => handleClick(1)}
                                             style={getGameBoxStyle(game.image.original_url)}>
                                            <div className={style["grid-item-text"]}> {game.name} </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};