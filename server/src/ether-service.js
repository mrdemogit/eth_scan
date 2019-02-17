/* eslint-disable no-console */
const fetch = require('node-fetch');
const querystring = require('querystring');
const { Observable } = require('rxjs');
const config = require('./config');

const formatParams = params => querystring.stringify(params);

const formatScanEthParams = params =>
  formatParams({
    module: 'account',
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
      const response = await fetch(`${config.etherscanApi}?${formatScanEthParams({
        ...params,
        action: 'txlist',
        sort: 'desc',
      })}`);
      const body = await response.json();
      if (body.status === '0') {
        observer.error(`${body.message} ${body.result}`);
      }
      observer.next(body);
      observer.complete();
    } catch (err) {
      throw err;
    }
  });

/**
 * Search for transactions and transform to map
 * @param  {Object} params ETH Parameters to fetch transactions
 * @return {Promise<Observable>} Stream of transactions data
 */
const searchTransactions = async params => fetchTransactions(params);

/**
 * Fetch ethereum balance
 * @param  {String} params ETH Parameters to fetch balances
 * @return {Observable} Eth Balance
 */
const getBalances = params =>
  Observable.create(async (observer) => {
    try {
      const response = await fetch(`${config.etherscanApi}?${formatScanEthParams({
        ...params,
        action: 'balance',
        tag: 'latest',
      })}`);
      const body = await response.json();
      if (body.status === '0') {
        observer.error(`${body.message} ${body.result}`);
      }
      observer.next(body);
      observer.complete();
    } catch (err) {
      throw err;
    }
  });

/**
 * Fetch currencies
 * @param  {String} params ETH Parameters to fetch balances
 * @return {Observable} Eth Balance
 */
const getCurrencies = () =>
  Observable.create(async (observer) => {
    try {
      const response = await fetch(`${config.currencyApi}/data/price?${formatParams({
        api_key: config.apiKeyCurrency,
        fsym: 'ETH',
        tsyms: 'USD,JPY,EUR,SGD,KRW,GBP, CNY',
      })}`);
      const body = await response.json();
      observer.next(body);
      observer.complete();
    } catch (err) {
      throw err;
    }
  });

module.exports = {
  searchTransactions,
  getBalances,
  getCurrencies,
};
