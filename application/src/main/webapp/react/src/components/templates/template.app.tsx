import React, {Fragment, PropsWithChildren} from "react";
import {NavigationBar} from "../organisms/navbar";

export const ApplicationNavigationWrapper = (props: PropsWithChildren<any>) => {
	return (
		<Fragment>
			<NavigationBar/>
			{props.children}
		</Fragment>
	)
}