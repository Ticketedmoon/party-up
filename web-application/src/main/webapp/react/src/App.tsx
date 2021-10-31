import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {Router} from "react-router";
import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './utils/history/history';
import {ToastProvider} from "react-toast-notifications";
import {LoginTemplate} from "./components/templates/template.login";
import {CreateNewLoginTemplate} from "./components/templates/template.create.new.login";
import {GameModesTemplate} from "./components/templates/template.dashboard";
import {MatchmakingModeTemplate} from "./components/templates/template.game.room";

import "./style.css";
import {StylesProvider} from "@material-ui/core/styles";
import {PublicChatTemplate} from "./components/templates/template.public.chat";
import {ApplicationNavigationWrapper} from "./components/templates/template.app";
import {persistedStore} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react'

const App = () => {
    return (
        <StylesProvider injectFirst>
            <Provider store={persistedStore.store}>
                <PersistGate loading={null} persistor={persistedStore.persistor}>
                    <Router history={history}>
                        <Switch>
                            <ToastProvider>
                                <Route path={"/app"}>
                                    <ApplicationNavigationWrapper>
                                        <Route path={"/app/dashboard"} component={GameModesTemplate}/>
                                        <Route path={"/app/party/game/:game"} component={MatchmakingModeTemplate}/>
                                        <Route path={"/app/party/game/:game/room/:id"} component={PublicChatTemplate}/>
                                    </ApplicationNavigationWrapper>
                                </Route>
                                <Route exact path={"/new-login/create"} component={CreateNewLoginTemplate}/>
                                <Route exact path={["/login", "/"]} component={LoginTemplate}/>
                            </ToastProvider>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </StylesProvider>
    );
};

export default App;
