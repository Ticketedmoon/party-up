import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Router} from "react-router";
import * as React from "react";
import store from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import history from './utils/history';
import {ToastProvider} from "react-toast-notifications";
import {LoginTemplate} from "./components/templates/template.login";
import {CreateNewLoginTemplate} from "./components/templates/template.create.new.login";
import {GameModesTemplate} from "./components/templates/template.game.modes";

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <ToastProvider>
                        <Route exact path={"/login"} component={LoginTemplate}/>
                        <Route exact path={"/login/create"} component={CreateNewLoginTemplate}/>
                        <Route exact path={"/game-modes"} component={GameModesTemplate}/>
                    </ToastProvider>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
