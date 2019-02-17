import {
  fetchTransactions,
  setTransactions,
  fetchBalance,
  setBalance,
} from '../actions';
import {
  FETCH_BALANCE,
  SET_BALANCE,
  FETCH_TRANSACTIONS,
  SET_TRANSACTIONS,
} from '../actionTypes';

describe('Transaction action', () => {
  test('fetchTransactions', () => {
    const params = { address: 'befea42' };
    expect({
      type: FETCH_TRANSACTIONS,
      payload: params,
    }).toEqual(fetchTransactions(params));
  });

  test('fetchBalance', () => {
    const response = fetchBalance();

    expect(response.type).toBe(FETCH_BALANCE);
  });

  test('setTransactions', () => {
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

    const expected = {
      type: SET_TRANSACTIONS,
      payload: transaction,
    };
    expect(setTransactions(transaction)).toEqual(expected);
  });
});
