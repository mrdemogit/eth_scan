/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');
const etherService = require('./ether-service');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/transactions', async (req, res) => {
  try {
    const response = await etherService.searchTransactions(req.query);

    response.subscribe(
      (data) => {
        res.status(200).send(data);
      },
      (error) => {
        res.status(500).send({ error });
      },
    );
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/api/balances', async (req, res) => {
  try {
    const response = await etherService.getBalances(req.query);

    response.subscribe(
      (data) => {
        res.status(200).send(data);
      },
      (error) => {
        console.error({ error });
        res.status(500).send({ error });
      },
    );
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

app.get('/api/currencies', async (req, res) => {
  try {
    const response = await etherService.getCurrencies(req.query);

    response.subscribe(
      (data) => {
        res.status(200).send(data);
      },
      (error) => {
        console.error({ error });
        res.status(500).send({ error });
      },
    );
  } catch (error) {
    console.error({ error });
    res.status(500).send({ error });
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
