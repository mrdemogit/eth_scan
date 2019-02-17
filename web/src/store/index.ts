import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { TransactionState } from 'transactionTypes';
import transaction from './transaction/reducer';
import transactionEpics from './transaction/epics';

export interface GlobalState {
  transaction: TransactionState;
}

export const createRootReducer = () =>
  combineReducers<GlobalState>({
    transaction,
  });

export const createRootEpics = () => combineEpics<any>(...transactionEpics);
