const{Cart} = require('../models/cart');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//get the cart

/*
router.get(`/`, async (req, res) =>{

    // console.log('gsje');
    // console.log(req.params.id);
    
     
  
     const cart1 =  await Cart.find({'ownedByString': req.query.uid});
   
   if(!cart1)
   {
       res.status(500).json({success: false})
   }
    res.send(cart1);
 
  });
*/
  ////
  router.post(`/`, async (req, res) =>{
    // localhost:3000/api/v1/carts?uid=2342342234234&pid=uewui578878
   
   
       let cart = new Cart({
         
           ownedByString: mongoose.SchemaType.objectud(req.query.ownedByString),
           items:[{productid: req.query.productid, quantity: req.body.quantity}]
          
       })
    
       cart = await cart.save();
   
       if(!cart) 
       return res.status(500).send('The cart cannot be created')
   
       res.send(cart);
   })
    
   //increment quantity
   router.put('/',async (req, res)=> {
   
    //uid & pid

    const cart = await Cart.findOneAndUpdate(
        {$and:[{'ownedByString': req.query.uid},{'items.productid':req.query.pid}]},
        {
            
        },
        { new: true}
    )

    if(!cart)
    return res.status(500).send('the product cannot be updated!')

    res.send(cart);
})
//4)DELETE an item from the cart
//i need to search for an item inside an object inside an array
//localhost:3000/api/va/carts?userid=4656&productid=7436

/*

{ $pull: { items: { $elemMatch: { productid: req.query.pid  } } } },
                function (err,val) {
                    console.log(val)
                    console.log(err)
                });
    
*/
router.get(`/`, (req, res)=>{
    console.log(req.query.uid);
    console.log('YESSSSSSSSSSSS');
    console.log(req.query.pid);

        //find the cart owned by this user
        
Cart.findOne({$and:[{'ownedByString': req.query.uid},{'items.productid':req.query.pid}]}) 
              

});





module.exports = router;
