/* Signals to the store are done in the form of actions.
'Dispatching an action' refers to an retrieval interaction with the store for state.
 Actions are simply functions, such a function is an action creator. */

/* Actions contain:
1) A type property (Nothing more than a string) - Used to calculate the next state.
2) Best to define actions types as constants in another directory src/constants/ */
// addArticle action
import {EReduxActionTypes, IReduxBaseAction} from "./base/BaseAction";
/*

export function addCustomer(payload) {
    return { type: "ADD_CUSTOMER", payload }
}

export function addCustomersObj(payload) {
    return { type: "ADD_CUSTOMER_OBJ", payload }
}
*/


export interface IReduxGetMoviesAction extends IReduxBaseAction {
    type: EReduxActionTypes.ALL_TEST;
    data: string
}
export interface IReduxGetMovieAction extends IReduxBaseAction {
    type: EReduxActionTypes.TEST;
    data: string;
}