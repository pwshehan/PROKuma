const orderModule = require('../models/orders');

exports.orders_get_all = (req, res, next) => {
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
}