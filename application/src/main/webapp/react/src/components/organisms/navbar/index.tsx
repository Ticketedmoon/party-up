import React from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

export const NavigationBar = () => {

	const user = useSelector((state: RootStateOrAny) => state.activeUser);

	const logOut = () => {
		redirectToRouteWithRoot("/login", null);
	}

	return (
		<div className={style["navigation-wrapper"]}>

			<div className={style["app-title-container"]}>
				<a className={style["app-title"]} href={window.location.origin}> Party Up! </a>
			</div>

			<div className={style["navigation-right-container"]}>
				<div className={`${style["profile"]}`}>
					<FontAwesomeIcon icon={faUser}/>
					<span> {user.username} ({user.role}) </span>
					<span> {user.level} </span>
				</div>
				<div className={style["app-logout-container"]}>
					<a className={style["app-logout"]} onClick={() => logOut()}> Log out </a>
				</div>
			</div>
		</div>
	)
}