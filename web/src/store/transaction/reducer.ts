import { AnyAction } from 'redux';
import * as actionTypes from './actionTypes';
import { TransactionState } from 'transactionTypes';

const initialState = {
  address: null,
  transactionsMap: {},
  order: [],
  isFetching: false,
  error: null,
};

export default function reducer(
  state: TransactionState = initialState,
  action: AnyAction,
): TransactionState {
  switch (action.type) {
    case actionTypes.FETCH_TRANSACTIONS: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.FETCH_TRANSACTIONS_ERROR: {
      return {
        ...state,
        error: action.payload.response.error,
        isFetching: false,
      };
    }
    case actionTypes.SET_TRANSACTIONS: {
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
}
