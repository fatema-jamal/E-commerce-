const{Cart} = require('../models/cart');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');





//get the cart
router.get(`/`, async (req, res) =>{

  
     const cart1 =  await Cart.find({'ownedByString': req.query.uid});
   
   if(!cart1)
   {
       res.status(500).json({success: false})
   }
    res.send(cart1);
 
  });

  //add the first** product to the user cart
  router.post(`/`, async (req, res) =>{
    // localhost:3000/api/v1/carts?uid=2342342234234&pid=uewui578878
   
   
       let cart = new Cart({
         
          // ownedByString: mongoose.SchemaType.objectid(req.query.uid),
          ownedByString: req.query.uid,
           items:[{productid: req.query.pid, quantity: req.query.quantity}]
          
       })
    
       cart = await cart.save();
   
       if(!cart) 
       return res.status(500).send('The cart cannot be created')
   
       res.send(cart);
   })

    
   //increment quantity of an existing product OR ADD a new product
   router.put('/',async (req, res)=> {
   
    //uid & pid
    
    const tempcart = await Cart.findOne( {'ownedByString': req.query.uid, 'items.productid':req.query.pid})
    if(tempcart){
    const cart = await Cart.findOneAndUpdate(
        {'ownedByString': req.query.uid, 'items.productid':req.query.pid},
        {
            $inc: {'items.$.quantity': 1}
        },
        { new: true}
        
    );

    if(!cart)
    {
    return res.status(500).send('the product cannot be updated!')
    }
    res.send(cart);
    }

    else
    {
        console.log('elseeeeeeyaraaaaaaab')
        const cart = await Cart.findOneAndUpdate(
            {'ownedByString': req.query.uid},
            {
               // $push: {'items.$.productid': req.query.pid}
               $push: {items:
                {'productid' : req.query.pid}
               }
            },
            { new: true}
        )
    

        res.send(cart);
    }
 
})


//4)DELETE an item from the cart using uid&pid

router.delete('/', async(req, res)=>{


    const cart = await Cart.findOneAndUpdate(
        {'ownedByString': req.query.uid, 'items.productid':req.query.pid},
        {
            $pull: {items:
                {'productid' : req.query.pid}
               }
            },
            { new: true}
        
    );

    if(!cart)
    {
    return res.status(500).send('the cart cannot be deleted!')
    }

   // res.send(cart);
    return res.status(200).json({success: true, message: 'the cart is deleted!'})
    
   
})





module.exports = router;
