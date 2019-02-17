import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { TransactionState } from 'transactionTypes';
import transaction from './transaction/reducer';
import currency from './currency/reducer';
import transactionEpics from './transaction/epics';
import currencyEpics from './currency/epics';
import { CurrencyState } from 'currencyTypes';

export interface GlobalState {
  transaction: TransactionState;
  currency: CurrencyState;
}

export const createRootReducer = () =>
  combineReducers<GlobalState>({
    transaction,
    currency,
  });

export const createRootEpics = () =>
  combineEpics<any>(...transactionEpics, ...currencyEpics);
