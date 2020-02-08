// A reducer is just a JavaScript function.
// A reducer takes two parameters: the current state and an action (more about actions soon).
// Reducers produce the state of the application.
// Redux says the only way to change the state is by sending a signal to the store. This signal is an action.

/* There are two key points for avoiding mutations in Redux:
   1. Using concat(), slice(), and …spread for arrays
   2. Using Object.assign() and …spread for objects */

import * as React from "react";
import { AnyAction } from 'redux';

export interface IReduxLoginState {
    loading: true,
    warningIsVisible: false,
}

/* The reducer will grow as your app will become bigger.
 * You can split a big reducer into separate functions and combine them with combineReducers. */
const rootReducer = (state: IReduxLoginState, action: AnyAction) => {
    switch (action.type) {
        case "ADD_CUSTOMER":
            return Object.assign({}, state, {
                selectedCustomer: action.payload,
                newTableName: "stage_" + action.payload.customerName,
                defaultTableName: "stage_" + action.payload.customerName
            });
        case "ADD_CUSTOMER_OBJ":
            return Object.assign({}, state, {customersObj: action.payload.customersObj});
        case "ADD_CUSTOMER_NAMES":
            return Object.assign({}, state, {customerNames: action.payload.customerNames});
        case "SET_LOADING":
            return Object.assign({}, state, {loading: action.payload});
        case "SET_NEW_TABLE_NAME":
            return Object.assign({}, state, {newTableName: action.payload});
        case "SET_SELECTED_DASHBOARD_TABLE":
            return Object.assign({}, state, {selectedTableName: action.payload});
        case "SET_WARNING_VISIBILITY":
            return Object.assign({}, state, {warningIsVisible: action.payload});
        case "SET_TABLE_DESCRIPTION":
            return Object.assign({}, state, {tableDescription: action.payload});
        case "SET_TABLE_KEY_ROW_COLUMN_INDEXES":
            return Object.assign({}, state, {
                uniqueTableColumn: action.payload.uniqueTableColumn,
                uniqueKeyRow: action.payload.uniqueKeyRow,
                tableIndexes: action.payload.tableIndexes
            })
    }
    return state;
};

export default rootReducer;