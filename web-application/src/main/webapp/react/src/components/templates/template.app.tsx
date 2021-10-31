import React, {Fragment, PropsWithChildren} from "react";
import {NavigationMenu} from "../organisms/sidebar";
import {Toolbar} from "@material-ui/core";

export const ApplicationNavigationWrapper = (props: PropsWithChildren<any>) => {
	return (
		<Fragment>
			<div>
				<NavigationMenu/>
			</div>
			<Toolbar/>
			{props.children}
		</Fragment>
	)
}