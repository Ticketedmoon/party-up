import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router' ;
import * as React from "react";
import store from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <Route exact path="/" render={() => (<div> Match </div>)}/>
                <Route render={() => (<div> Miss </div>)}/>
            </Switch>
        </Provider>
    );
};

export default App;