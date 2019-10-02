 const mongoose = require('mongoose');

 const pruductSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     name: String,
     price: {
         type: Number,
         required: true
     }
 });

 module.exports = mongoose.model('product', pruductSchema);