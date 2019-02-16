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
 * Fetch Ethereum transactions
 * @param  {TransactionsParamsType} params Parameters for fetching subset of transactions
 * @return {Observable} Stream of transactions
 */
export const fetchTransactions = (
  params: TransactionsParamsType,
): Observable<TransactionsAjaxResponse> =>
  ajax({ url: `${API_URL}/api/search?${formatParams(params)}`, method: 'GET' });
