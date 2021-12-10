const{Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


////to view all the products in the user profile
router.get(`/`, async (req, res) =>{
    // localhost:3000/api/v1/products << profile

    
  

    const productList = await Product.find({'ownedByString' : req.query.uid})

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

//1)SEARCH by  Category
router.get(`/search`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    if(req.query.categories)
    {
        console.log(req.query.categories);
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).limit(3);

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})
//add a NEW product *****but still need to add the user id
//3nd Fatma SELL PRODUCT Button


 

 router.post(`/`, async (req, res) =>{
 // localhost:3000/api/v1/products?uid=2342342234234
 
     console.log(req.query.uid);
// add the uid to the product as ownedByString
//it works

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        ownedByString: req.query.uid,
    })
 
    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})
/*router.post(`/`, async (req, res) =>{

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
    })
 
    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})
*/
//3)Modify an existing product

router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

//4)DELETE a product
router.delete('/:id', (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})
module.exports = router;