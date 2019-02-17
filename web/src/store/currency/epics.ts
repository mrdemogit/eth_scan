import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { of } from 'rxjs';
import { FETCH_CURRENCIES, FETCH_CURRENCIES_ERROR } from './actionTypes';
import { setCurrencies } from './actions';

export const fetchCurrencies: Epic<AnyAction, any, any> = (
  action$,
  _,
  { datasource },
) =>
  action$.pipe(
    ofType(FETCH_CURRENCIES),
    mergeMap(() =>
      datasource.fetchCurrencies().pipe(
        map(({ response }: any) => response),
        map(setCurrencies),
        catchError(error =>
          of({
            type: FETCH_CURRENCIES_ERROR,
            payload: error,
            error: true,
          }),
        ),
      ),
    ),
  );

export default [fetchCurrencies];
