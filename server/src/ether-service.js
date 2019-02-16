/* eslint-disable no-console */
const fetch = require('node-fetch');
const querystring = require('querystring');
const { Observable, of, forkJoin, from } = require('rxjs');
const { mergeMap, map, reduce } = require('rxjs/operators');
const config = require('./config');

const formatParams = params =>
  querystring.stringify({
    module: 'account',
    action: 'txlist',
    startblock: '0',
    endblock: '99999999',
    sort: 'asc',
    apikey: config.apiKey,
    ...params
  });

/**
 * Feth ethereum transactions
 * @param  {String} ethAddress Eth Address
 * @return {Observable} Eth Transactions Data
 */
const fetchSearchFlight = ethAddress =>
  Observable.create(async observer => {
    try {
      const response = await fetch(
        config.etherscanApi + formatParams(ethAddress)
      );
      const body = await response.json();
      observer.next(body);
      observer.complete();
    } catch (err) {
      throw err;
    }
  });

/**
 * Search for transactions
 * @param  {String} ethAddress ETH Address to fetch transactions
 * @return {Promise<Observable>} Stream of transactions data
 */
const search = async ethAddress => {
  try {
    return fetchTransactions(ethAddress).pipe(mergeMap(transformResponse));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  search
};
