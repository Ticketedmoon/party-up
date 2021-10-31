import React, {CSSProperties, useState} from "react";
import {RootStateOrAny, useSelector} from "react-redux";
import {redirectToRouteWithRoot} from "../../../utils/history/history";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ChatIcon from '@material-ui/icons/Chat';
import {
	AppBar,
	CssBaseline,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core/styles";

interface SidebarItem {
	text: string,
	icon: JSX.Element,
	path: string
}

const DRAWER_WIDTH: number = 240;
const SIDEBAR_ITEM_COLOUR: string = '#FFFFFF';
const SELECTED_ITEM_STYLE: CSSProperties = {
	color: '#000'
}

const sideBarItems: SidebarItem[] = [
	{
		text: 'Game Search',
		icon: <SportsEsportsIcon htmlColor={SIDEBAR_ITEM_COLOUR}/>,
		path: `/app/dashboard`
	},
	{
		text: 'Chat Room',
		icon: <ChatIcon htmlColor={SIDEBAR_ITEM_COLOUR}/>,
		path: `/app/dashboard`
	}
]

const style = require('./style/style.module.css')

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: "#389f9f"
	},
	drawer: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
	},
	drawerPaper: {
		width: DRAWER_WIDTH,
		backgroundColor: "#4f8585",
		color: "white"
	},
	drawerContainer: {
		overflow: "auto"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export const NavigationMenu = () => {

	const classes = useStyles();

	const [selected, setSelected] = useState<string>(sideBarItems[0].text);
	const user = useSelector((state: RootStateOrAny) => state.activeUser);

	const logOut = () => {
		redirectToRouteWithRoot("/login", null);
	}

	return (
		<div className={classes.root}>
			<CssBaseline/>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<div className={style["app-title-container"]}>
						<Typography variant="h6" noWrap component="div">
							Party Up
						</Typography>
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
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar/>
				<div className={classes.drawerContainer}>
					<List>
						{
							sideBarItems.map((item: SidebarItem) => (
								<ListItem button key={item.text}
										  style={selected === item.text ? SELECTED_ITEM_STYLE : undefined}
										  onClick={() => {
										  	setSelected(item.text);
										  	redirectToRouteWithRoot(item.path, null);
										  }}>
									<ListItemIcon>
										{item.icon}
									</ListItemIcon>
									<ListItemText primary={item.text}/>
								</ListItem>
							))
						}
					</List>
					<Divider/>
				</div>
			</Drawer>
		</div>
	);
};