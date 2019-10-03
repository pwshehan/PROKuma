const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const orderModule = require('../models/orders');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    orderModule.find()
    .populate('product')
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length > 0) {
            res.status(200).json(docs);
        } else {
            res.status(404).json({message: 'No valid entry found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}); 

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