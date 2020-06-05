import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from "react-router";
import * as React from "react";
import {store} from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './utils/history/history';
import {ToastProvider} from "react-toast-notifications";
import {LoginTemplate} from "./components/templates/template.login";
import {CreateNewLoginTemplate} from "./components/templates/template.create.new.login";
import {GameModesTemplate} from "./components/templates/template.game.modes";
import {MatchmakingModeTemplate} from "./components/templates/template.matchmaking.mode";
import {Game} from "./components/templates/template.game";

import "./style.css";
import {StylesProvider} from "@material-ui/core/styles";
import {PublicChatTemplate} from "./components/templates/template.public.chat";

const App = () => {
    return (
        <StylesProvider injectFirst>
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Redirect exact from="/" to="/login"/>
                        <ToastProvider>
                            <Route exact path={"/login"} component={LoginTemplate}/>
                            <Route exact path={"/login/create"} component={CreateNewLoginTemplate}/>
                            <Route exact path={"/game-modes"} component={GameModesTemplate}/>
                            <Route exact path={"/game-modes/type/:mode"} component={MatchmakingModeTemplate}/>
                            <Route exact path={"/game/:id"} component={Game}/>
                            <Route exact path={"/public/chat"} component={PublicChatTemplate}/>
                        </ToastProvider>
                    </Switch>
                </Router>
            </Provider>
        </StylesProvider>
    );
};

export default App;
