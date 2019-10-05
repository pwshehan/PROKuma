const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');

const orderModule = require('../models/orders');
// const Product = require('../models/products');

const OrdersController = require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', (req, res, next) => {
    const order = new orderModule({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Hadling Special'
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated order'
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order'
    });
});

module.exports = router;