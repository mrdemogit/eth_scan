import { createStandardAction } from 'typesafe-actions';
import {
  SET_TRANSACTIONS,
  FETCH_TRANSACTIONS,
  FETCH_BALANCE,
  SET_BALANCE,
} from './actionTypes';
import { TransactionsParamsType, TransactionGroupType } from 'transactionTypes';

export const fetchTransactions = createStandardAction(FETCH_TRANSACTIONS)<
  TransactionsParamsType
>();

export const setTransactions = createStandardAction(SET_TRANSACTIONS)<
  TransactionGroupType
>();

export const fetchBalance = createStandardAction(FETCH_BALANCE)<string>();

export const setBalance = createStandardAction(SET_BALANCE)<string>();
