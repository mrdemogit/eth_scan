import { createStandardAction } from 'typesafe-actions';
import { SET_TRANSACTIONS, FETCH_TRANSACTIONS } from './actionTypes';
import { TransactionState } from 'transactionTypes';

export const fetchTransactions = createStandardAction(FETCH_TRANSACTIONS)();

export const setTransactions = createStandardAction(SET_TRANSACTIONS)<
  TransactionState
>();
