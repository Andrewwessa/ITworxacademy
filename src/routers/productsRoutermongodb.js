const express = require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ObjectID } = require('mongodb');

const products = require('../data/products.json');

const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
    const url =
    'mongodb+srv://andrewwessa:CON8ujoVIIcDYwtd@products.be5n3lu.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'Products';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
      client.close();
    } catch (error) {
      debug(error.stack);
    }

  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
  'mongodb+srv://andrewwessa:CON8ujoVIIcDYwtd@products.be5n3lu.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Products';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectID(id) });

      res.render('product', {
        product,
      });
      client.close();
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
