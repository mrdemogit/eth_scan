/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const { APIKEY, APIKEY_CURRENCY } = process.env;

if (!APIKEY) {
  console.error('APIKEY environment variable missing. Please re-run with `APIKEY=<key> npm run server`');
  process.exit(1);
}

if (!APIKEY_CURRENCY) {
  console.error('APIKEY_CURRENCY environment variable missing. Please re-run with `APIKEY_CURRENCY=<key> npm run server`');
  process.exit(1);
}

module.exports = {
  apiKeyCurrency: APIKEY_CURRENCY,
  currencyApi: 'https://min-api.cryptocompare.com',
  apiKey: APIKEY,
  etherscanApi: 'http://api.etherscan.io/api',
};
