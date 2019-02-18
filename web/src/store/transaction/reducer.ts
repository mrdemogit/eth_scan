import * as actionTypes from './actionTypes';
import { TransactionState } from 'transactionTypes';
import { Reducer } from 'redux';

const initialState = {
  address: null,
  transactionsMap: {},
  order: [],
  isFetching: false,
  isFetchingBalance: false,
  error: null,
  balance: null,
};

const reducer: Reducer<TransactionState> = (state = initialState, action) => {
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
    case actionTypes.FETCH_BALANCE: {
      return {
        ...state,
        isFetchingBalance: true,
      };
    }
    case actionTypes.FETCH_BALANCE_ERROR: {
      return {
        ...state,
        error: action.payload.response.error,
        isFetchingBalance: false,
      };
    }
    case actionTypes.SET_BALANCE: {
      return {
        ...state,
        balance: action.payload,
        isFetchingBalance: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
