const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');
const products = require('../data/products.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://andrewwessa:CON8ujoVIIcDYwtd@products.be5n3lu.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'Products';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const response = await db.collection('products').insertMany(products);
      res.json(response);
      client.close();
    } catch (error) {
      debug(error.stack);
    }

  })();
});

module.exports = adminRouter;
