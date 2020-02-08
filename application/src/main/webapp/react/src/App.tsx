import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import * as React from "react";
import store from "./store";
import PrimaryButton from "./components/atoms/button/primary";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <PrimaryButton/>
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;