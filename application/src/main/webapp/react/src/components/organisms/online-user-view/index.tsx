import React, {FunctionComponent} from "react";

const style = require("./style/style.module.css");

interface Props {
    userList: string[]
}

export const OnlineUserView: FunctionComponent<Props> = ({userList}: Props) => {

    return (
        <div className={style["view-container"]}>
            <div className={style["title"]}>
                <h4> Online Users </h4>
            </div>
            {
                userList.map((username: string) => {
                    return (<p> {username} </p>)
                })
            }
        </div>
    );
}

