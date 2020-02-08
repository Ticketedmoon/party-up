export enum EReduxActionTypes {
    TEST = 'TEST',
    ALL_TEST = 'ALL_TEST',
}

export interface IReduxBaseAction {
    type: EReduxActionTypes;
}