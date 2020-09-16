var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({

  username { type: String},

  amount:    { type: Integer},

  date: { type: Integer }

});

module.exports = mongoose.model('Products', productSchema);