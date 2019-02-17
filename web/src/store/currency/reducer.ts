import { AnyAction } from 'redux';
import * as actionTypes from './actionTypes';
import { CurrencyState } from 'currencyTypes';

const initialState = {
  currenciesMap: {},
};

export default function reducer(
  state: CurrencyState = initialState,
  action: AnyAction,
): CurrencyState {
  switch (action.type) {
    case actionTypes.SET_CURRENCIES: {
      return {
        currenciesMap: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
