import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { AnyAction } from 'redux';
import { of } from 'rxjs';
import { FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_ERROR } from './actionTypes';
import { setTransactions } from './actions';
import { TransactionGroupType, TransactionType } from 'transactionTypes';

const reduceToState = (txs: TransactionType[]) =>
  txs.reduce((prevItem: any, newItem): TransactionGroupType => {
    if (!prevItem.order) {
      prevItem.order = [];
    }
    return {
      transactionsMap: { ...prevItem.transactionsMap, [newItem.hash]: newItem },
      order: [...prevItem.order, newItem.hash],
    };
  }, {});

export const fetchTransactionsEpic: Epic<AnyAction, any, any> = (
  action$,
  _,
  { datasource },
) =>
  action$.pipe(
    ofType(FETCH_TRANSACTIONS),
    mergeMap(action =>
      datasource.fetchTransactions(action.payload).pipe(
        map(({ response }: any) => response.result),
        map(reduceToState),
        map(setTransactions),
        catchError(error =>
          of({
            type: FETCH_TRANSACTIONS_ERROR,
            payload: error,
            error: true,
          }),
        ),
      ),
    ),
  );

export default [fetchTransactionsEpic];
