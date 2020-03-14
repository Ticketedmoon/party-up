import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from "react-router";
import * as React from "react";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginTemplate from "./components/templates/login";
import history from './utils/history';
import CreateNewLoginTemplate from "./components/templates/create-new-login";
import {ToastProvider} from "react-toast-notifications";
import GameModes from "./components/templates/game-modes";

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <ToastProvider>
                        <Route exact path={"/login"} component={LoginTemplate}/>
                        <Route exact path={"/login/create"} component={CreateNewLoginTemplate}/>
                        <Route exact path={"/game-modes"} component={GameModes}/>
                    </ToastProvider>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
