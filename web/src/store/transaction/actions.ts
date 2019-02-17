import { createStandardAction } from 'typesafe-actions';
import {
  SET_TRANSACTIONS,
  FETCH_TRANSACTIONS,
  FETCH_BALANCE,
  SET_BALANCE,
} from './actionTypes';
import { TransactionState } from 'transactionTypes';

export const fetchTransactions = createStandardAction(FETCH_TRANSACTIONS)();

export const setTransactions = createStandardAction(SET_TRANSACTIONS)<
  TransactionState
>();

export const fetchBalance = createStandardAction(FETCH_BALANCE)();

export const setBalance = createStandardAction(SET_BALANCE)<TransactionState>();
