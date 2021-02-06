import React from "react";
import {redirectToRouteWithRoot} from "../../../utils/history/history";

const style = require("./style/style.module.css");

export const NavigationBar = () => {

	const logOut = () => {
		redirectToRouteWithRoot("/login", null);
	}

	return (
		<div className={style["navigation-wrapper"]}>
			<div className={style["navigation-logout-container"]}>
				<a onClick={() => logOut()}> Log out </a>
			</div>
		</div>
	)
}