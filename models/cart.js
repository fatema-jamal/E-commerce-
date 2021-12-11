const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  
    ownedByString:
    {
      type: String,
    },
    items: 
    [{
      productid: {type: String},
       // required: true,

        quantity:{type: Number,
        default: 1   
        }
    }]
 
})

exports.Cart = mongoose.model('Cart', cartSchema);

