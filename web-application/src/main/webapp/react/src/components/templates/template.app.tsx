import React, {Fragment, PropsWithChildren} from "react";
import {SideBar} from "../organisms/sidebar";
import {Toolbar} from "@material-ui/core";

export const ApplicationNavigationWrapper = (props: PropsWithChildren<any>) => {
	return (
		<Fragment>
			<div>
				<SideBar/>
			</div>
			<Toolbar/>
			{props.children}
		</Fragment>
	)
}