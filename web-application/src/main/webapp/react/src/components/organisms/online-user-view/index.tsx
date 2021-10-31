import React, {FunctionComponent} from "react";
import {Divider} from "@material-ui/core";

const style = require("./style/style.module.css");

interface Props {
    userList: string[]
}

export const OnlineUserView: FunctionComponent<Props> = ({userList}: Props) => {

    return (
        <div className={style["view-container"]}>
            <div className={style["title"]}>
                <span> Online Users </span>
            </div>
            <Divider/>
            <div>
            {
                userList.map((username: string, index: number) => {
                    return (<p key={"username-" + index}> {username} </p>)
                })
            }
            </div>
        </div>
    );
}

