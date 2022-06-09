const express = require('express');
const products = require('../data/products.json');
const homeRouter = express.Router();

homeRouter.route('/').get((req,res)=>{
    res.render('index');
});



module.exports = homeRouter;