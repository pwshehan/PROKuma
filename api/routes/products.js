const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString()+file.originalname);
    }
})

const upload = multer({storage: storage});

const productModel = require('../models/products');

router.get('/', (req, res, next) => {
    productModel.find()
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

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const product = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Hadling Post',
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });  
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    productModel.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for  (const ops of req.body) {
        updateOps[ops.ptopName] = ops.value;
    }
    productModel.update({_id: is}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({ 
            updatedProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    productModel.remove({_id: id})
    .exec()
    then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }); 
});

module.exports = router;