const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose'); 
require('dotenv').config();

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(process.env.MONGO_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;