/* eslint-disable no-console */
const fetch = require('node-fetch');
const querystring = require('querystring');
const { Observable } = require('rxjs');
const { reduce, concatMap } = require('rxjs/operators');
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
 * Converts items to object with transactions Map<hash,object> and Order[]
 * @type {[type]}
 */
const reduceToHashMap = reduce((prevItem, newItem) => {
  if (!prevItem.order) {
    prevItem.order = [];
  }
  return {
    transactionsMap: { ...prevItem.transactionsMap, [newItem.hash]: newItem },
    order: [...prevItem.order, newItem.hash],
  };
}, {});

/**
 * Search for transactions and transform to map
 * @param  {Object} params ETH Parameters to fetch transactions
 * @return {Promise<Observable>} Stream of transactions data
 */
const search = async params =>
  fetchTransactions(params).pipe(
    concatMap(response => response.result),
    reduceToHashMap,
  );

module.exports = {
  search,
};
