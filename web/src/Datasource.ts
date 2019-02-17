import { merge } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import querystring from 'querystring';
import {
  TransactionsParamsType,
  TransactionsAjaxResponse,
  BalancesAjaxResponse,
} from 'transactionTypes';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = 'http://localhost:4000';
export const OFFSET = 20;

/**
 * Transform js object to query params
 * @param {TransactionsParamsType} params
 * @return {String}
 */
const formatParams = (params: TransactionsParamsType): string =>
  querystring.stringify(params);

/**
 * Fetch Ethereum transactions for first stream 50 transactions and second stream rest
 * @param  {TransactionsParamsType} params Parameters for fetching subset of transactions
 * @return {Observable} Stream of transactions
 */
export const fetchTransactions = (
  params: TransactionsParamsType,
): Observable<TransactionsAjaxResponse> =>
  merge(
    ajax({
      url: `${API_URL}/api/transactions?${formatParams({
        ...params,
        page: 1,
        offset: OFFSET,
      })}`,
      method: 'GET',
    }),
    ajax({
      url: `${API_URL}/api/transactions?${formatParams(params)}`,
      method: 'GET',
    }),
  );

/**
 * Fetching ethereum balance
 * @param  {String} address Address for fetching ballance
 * @return {Observable} Stream of transactions
 */
export const fetchBalance = (
  address: string,
): Observable<BalancesAjaxResponse> =>
  ajax({
    url: `${API_URL}/api/balances?${formatParams({ address })}`,
    method: 'GET',
  });

/**
 * Fetching currencies for ethereum
 * @return {Observable} Stream of currencies
 */
export const fetchCurrencies = (): Observable<AjaxResponse> =>
  ajax({
    url: `${API_URL}/api/currencies`,
    method: 'GET',
  });
