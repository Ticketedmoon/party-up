import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

// Migration tools are a self-contained Single Page Application (SPA)
ReactDOM.render(
        <Router>
                {/* Component Tree */}
                <p> hello world ! </p>

        </Router>,
    document.getElementById('root')
);
