import { createStandardAction } from 'typesafe-actions';
import { FETCH_CURRENCIES, SET_CURRENCIES } from './actionTypes';
import { CurrencyGroupType } from 'currencyTypes';

export const fetchCurrencies = createStandardAction(FETCH_CURRENCIES)();

export const setCurrencies = createStandardAction(SET_CURRENCIES)<
  CurrencyGroupType
>();
