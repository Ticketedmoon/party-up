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

export default history;