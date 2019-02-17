import reducer from '../reducer';
import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_ERROR,
  SET_TRANSACTIONS,
} from '../actionTypes';

const initialState = {
  address: null,
  transactionsMap: {},
  order: [],
  isFetching: false,
  isFetchingBalance: false,
  error: null,
  balance: null,
};

describe('Transaction reducer', () => {
  test('FETCH_TRANSACTIONS reducer', () => {
    const expected = { ...initialState, isFetching: true };

    expect(reducer(initialState, { type: FETCH_TRANSACTIONS })).toEqual(
      expected,
    );
  });

  test('FETCH_TRANSACTIONS_ERROR reducer', () => {
    const expected = { ...initialState, isFetching: false, error: 'error!!' };

    expect(
      reducer(initialState, {
        type: FETCH_TRANSACTIONS_ERROR,
        payload: { response: { error: 'error!!' } },
      }),
    ).toEqual(expected);
  });

  test('SET_TRANSACTIONS reducer', () => {
    const transaction = {
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
    };

    const expected = { ...initialState, ...transaction };

    expect(
      reducer(initialState, {
        type: SET_TRANSACTIONS,
        payload: transaction,
      }),
    ).toEqual(expected);
  });
});
