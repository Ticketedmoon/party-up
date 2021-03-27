import React from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";

const style = require("./style/style.module.css");

export const NavigationBar = () => {

	const logOut = () => {
		redirectToRouteWithRoot("/login", null);
	}

	return (
		<div className={style["navigation-wrapper"]}>
			<div className={style["app-title-container"]}>
				<a className={style["app-title"]} href={window.location.origin}> Party Up! </a>
			</div>
			<div className={style["navigation-logout-container"]}>
				<a onClick={() => logOut()}> Log out </a>
			</div>
		</div>
	)
}