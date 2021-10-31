import React from "react";
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
	icon: JSX.Element
}

const sideBarItems: SidebarItem[] = [
	{
		text: 'Game Search',
		icon: <SportsEsportsIcon/>
	},
	{
		text: 'Chat Room',
		icon: <ChatIcon/>
	}
]

const style = require('./style/style.module.css')

const drawerWidth: number = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: "#8b46a7;"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#b066cf",
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

export const SideBar = () => {

	const classes = useStyles();

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
								<ListItem button key={item.text}>
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