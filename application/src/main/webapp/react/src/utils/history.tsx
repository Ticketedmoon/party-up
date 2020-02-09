import { createBrowserHistory } from 'history';
const history = createBrowserHistory (
    { basename: '/' }
    );

export const redirectToRouteWithCurrent = (route: string) => {
    const currentPath: string = window.location.pathname;
    history.push(currentPath + route);
};

export const redirectToRouteWithRoot = (route: string) => {
    history.push(route);
};

export const currentRoute = () => {
    return window.location.pathname;
};

export default history;