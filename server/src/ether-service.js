/* eslint-disable no-console */
const fetch = require('node-fetch');
const querystring = require('querystring');
const {
  Observable, of, forkJoin, from,
} = require('rxjs');
const { mergeMap, map, reduce } = require('rxjs/operators');
const config = require('./config');

const formatParams = params =>
  querystring.stringify({
    module: 'account',
    action: 'txlist',
    // startblock: '0',
    // endblock: '99999999',
    sort: 'desc',
    apikey: config.apiKey,
    ...params,
  });

/**
 * Feth ethereum transactions
 * @param  {String} params ETH Parameters to fetch transactions
 * @return {Observable} Eth Transactions Data
 */
const fetchTransactions = params =>
  Observable.create(async (observer) => {
    try {
      const response = await fetch(`${config.etherscanApi}?${formatParams(params)}`);
      const body = await response.json();
      if (body.status === '0') {
        observer.error(body.result);
      }
      observer.next(body);
      observer.complete();
    } catch (err) {
      throw err;
    }
  });

/**
 * Search for transactions
 * @param  {Object} params ETH Parameters to fetch transactions
 * @return {Promise<Observable>} Stream of transactions data
 */
const search = async params => fetchTransactions(params);

module.exports = {
  search,
};
