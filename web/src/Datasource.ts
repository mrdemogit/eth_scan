import { merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import querystring from 'querystring';
import {
  TransactionsParamsType,
  TransactionsAjaxResponse,
} from 'transactionTypes';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = 'http://localhost:4000';

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
      url: `${API_URL}/api/search?${formatParams({
        ...params,
        page: 1,
        offset: 20,
      })}`,
      method: 'GET',
    }),
    ajax({
      url: `${API_URL}/api/search?${formatParams(params)}`,
      method: 'GET',
    }),
  );
