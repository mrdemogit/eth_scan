import { ActionsObservable } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import { of, throwError } from 'rxjs';
import { createEpicMiddleware } from 'redux-observable';
import {
  FETCH_TRANSACTIONS,
  SET_TRANSACTIONS,
  FETCH_TRANSACTIONS_ERROR,
} from '../actionTypes';
import { fetchTransactionsEpic } from '../epics';

describe('Transaction Epics', () => {
  it('fetchTransactions - success', async () => {
    const datasource = {
      fetchTransactions: () =>
        of({
          response: {
            result: [
              {
                hash: 'geage',
                value: '324',
                timeStamp: '1550417114',
                from: 'fromSome',
                to: 'toSome',
              },
            ],
          },
        }),
    };

    const mockStore = configureMockStore([
      createEpicMiddleware({ dependencies: { datasource } }),
    ]);

    const action$ = ActionsObservable.of({
      type: FETCH_TRANSACTIONS,
    });

    // @ts-ignore
    const epic$ = fetchTransactionsEpic(action$, mockStore, { datasource });

    const result = await epic$.toPromise();

    expect(result).toEqual({
      meta: 0,
      type: SET_TRANSACTIONS,
      payload: {
        transactionsMap: {
          ['geage']: {
            hash: 'geage',
            value: '324',
            timeStamp: '1550417114',
            from: 'fromSome',
            to: 'toSome',
          },
        },
        order: ['geage'],
      },
    });
  });

  it('fetchTransactions - error', async () => {
    const datasource = {
      fetchTransactions: () => throwError('api returns error'),
    };

    const mockStore = configureMockStore([
      createEpicMiddleware({ dependencies: { datasource } }),
    ]);

    const action$ = ActionsObservable.of({
      type: FETCH_TRANSACTIONS,
    });

    // @ts-ignore
    const epic$ = fetchTransactionsEpic(action$, mockStore, { datasource });

    const result = await epic$.toPromise();

    expect(result).toEqual({
      type: FETCH_TRANSACTIONS_ERROR,
      payload: 'api returns error',
      error: true,
    });
  });
});
