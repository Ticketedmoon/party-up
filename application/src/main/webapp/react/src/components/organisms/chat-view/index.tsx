import React from "react";
import {Button} from "@material-ui/core";
import history from "../../../utils/history";

const style = require("./style/style.module.css");

export const ChatView = () => {

    return (
        <div className={style["page-container"]}>
            <div className={style["chat-view-container"]}>
                <div className={style["chat-box"]}>
                    <div className={style["chat-region"]}>

                    </div>
                    <div className={style["message-box-container"]}>
                        <input className={style["message-box"]} type={"text"} placeholder={"Enter a message"}/>
                    </div>
                </div>
                <div className={style["footer"]}>
                    <Button color="primary" variant="contained" className={style["button-return"]}
                            onClick={() => history.goBack()}> Return to Game Modes </Button>
                </div>
            </div>
        </div>
    )
}
