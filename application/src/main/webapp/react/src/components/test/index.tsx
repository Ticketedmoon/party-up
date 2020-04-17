import React, {useState} from "react";
import ReactDOM from "react-dom";

export function App() {
    let [userMessage, setUserMessage] = useState("");

    return (
        <form className="form-inline" onSubmit={(e) => {
            setUserMessage(handleLoginRequest(e))
        }} >
            <label className="mr-sm-2">Email address:</label>
            <input type="email" className="form-control mb-2 mr-sm-2" placeholder="Enter email" id="email" />
            <label className="mr-sm-2">Password:</label>
            <input type="password" className="form-control mb-2 mr-sm-2" placeholder="Enter password" id="password" />
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
            {userMessage}
        </form>

    );
}

const handleLoginRequest = (event: any): any => {
    event.preventDefault();
    return 'login request received';
};


ReactDOM.render(<App />, document.querySelector("#app"));
