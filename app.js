const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const path = require('path');
const morgan = require('morgan');
const { Session } = require('inspector');



const productsRouter = require('./src/routers/productsRouter');
const adminRouter = require('./src/routers/adminRouter');
const homeRouter = require('./src/routers/homeRouter');

const port = process.env.PORT ||3000

const app = express();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public/')))

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/admin',adminRouter);
app.use('/home',homeRouter);
app.use('/products',productsRouter);


app.get('/',(req, res)=>{
    res.render('index',{title: 'Andreww', data:['A', 'B', 'C']});
})

app.listen(port,()=>{
    debug(`listening to port ${chalk.green(port)}`);
});