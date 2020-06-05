import {createBrowserHistory} from "history";

const history = createBrowserHistory(
    {basename: '/'}
);

export const redirectToRouteWithCurrent = (route: string, state: Object | null) => {
    const currentPath: string = window.location.pathname;
    history.push({
        pathname: currentPath + route,
        state: state
    });
};

export const redirectToRouteWithRoot = (route: string, state: Object | null) => {
    history.push({
        pathname: route,
        state: state
    });
};

export const currentRoute = () => {
    return window.location.pathname;
};

export const getActiveState = () => {
    return history.location.state;
};

export default history;
