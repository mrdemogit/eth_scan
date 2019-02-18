import { Reducer } from 'redux';
import * as actionTypes from './actionTypes';
import { CurrencyState } from 'currencyTypes';

const initialState = {
  currenciesMap: {},
};

const reducer: Reducer<CurrencyState> = (state = initialState, action) => {
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
};
export default reducer;
