/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const { APIKEY } = process.env;

if (!APIKEY) {
  console.error('APIKEY environment variable missing. Please re-run with `APIKEY=<key> npm run server`');
  process.exit(1);
}

module.exports = {
  apiKey: APIKEY,
  etherscanApi: 'http://api.etherscan.io/api',
};
