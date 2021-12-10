const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        //required: true
    },
    image: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category: {
        type: String,
        required: true

    },
    
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
  
    dateCreated: {
        type: Date,
        default: Date.now,
    },
   /* ownedByObject:
    {
 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',

    },
    */
    ownedByString:
    {
        type: String,
    }

});

//i will use Product as a mapping to this model(collection)
exports.Product = mongoose.model('Product',productSchema);
