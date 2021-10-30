import * as React from "react";
import LoginForm from "../../../molecules/form/LoginForm";
import {redirectToRouteWithRoot} from "../../../../utils/history/history";
import {useToasts} from "react-toast-notifications";
import {useDispatch} from "react-redux";
import {setUser} from "../../../../store/Reducers/login/types/action.function.types";
import axios, {AxiosResponse} from "axios";
import {Button} from "@material-ui/core";
import {User} from "../../../../utils/types/user.dto.type";

const style = require("./style/style.module.css");

const LoginContainer = () => {

    const {addToast} = useToasts();
    const dispatch = useDispatch();

    const setUserAndLogin = (username: string): User | null => {
        axios.get(window.location.origin + "/users", {
            params: {
                username: username
            }
        }).then((res) => {
            let authenticatedUser: User = res.data;
            if (authenticatedUser != null) {
                dispatch(setUser(authenticatedUser));
                redirectToRouteWithRoot("/app/dashboard", null);
            }
        }).catch((error) => {
            throw error;
        })
        return null;
    }

    const tryLogin = (username: string, password: string) => {
        axios.post(window.location.origin + "/perform_login", {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then((response: AxiosResponse) => {
                let authenticatedSuccessful = response.status >= 200 && response.status < 300;
                if (authenticatedSuccessful) {
                   setUserAndLogin(username);
                }
            })
            .catch(() => {
                addToast(
                    `Login failure - Please verify your credentials.`, {
                        appearance: 'warning',
                        autoDismiss: true,
                    });
            });
    };

    return (
        <div className={style["login-template-wrapper"]}>
            <div className={style["login-template"]}>
                <span className={style["login-template-title"]}> Party Up! </span>
                <LoginForm text={"Login"}
                           checkCredentials={(username: string, password: string) => tryLogin(username, password)}/>
                <Button className={style["customized"]} color={"primary"} variant={"contained"}
                        onClick={() => redirectToRouteWithRoot("/new-login/create", {})}> Create New Account </Button>
            </div>
        </div>
    );
};

export default LoginContainer;
