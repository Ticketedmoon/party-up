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

    const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const [hasPublicGamesOpened, setHasPublicGamesOpened] = useState(false);
    const [animation, setAnimation] = useState(null);

    const handleGameModeClick = (event: Event) => {
        if (!hasPublicGamesOpened) {
            // Animate the buttons
            setAnimation("button-list-animation");
            // Set condition to true
            setHasPublicGamesOpened(true);
        }

        // Change active button colour and current display
    };

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
                {text: "Battle", click: (event: Event) => handleGameModeClick(event)},
                {text: "Time Attack", click: (event: Event) => handleGameModeClick(event), enabled: false},
                {text: "War", click: (event: Event) => handleGameModeClick(event), enabled: false},
                {text: "Tag Team", click: (event: Event) => handleGameModeClick(event), enabled: false},
                {text: "Logout", click: () => redirectToRouteWithRoot("/", {}), className: "logout-button-style"}
            ]} animation={animation}/>
        </div>
    );
};

export default GameModesContainer;
