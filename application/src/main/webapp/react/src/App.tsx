import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import * as React from "react";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginTemplate from "./components/templates/login";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <LoginTemplate/>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;