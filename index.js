//console.log("hello ,ecommerce first step");
//for every libiraries we create const
const express = require("express");
const app = express();
const morgan = require ('morgan');
const mongoose=require('mongoose');
const cors = require('cors');
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler =require('./helpers/error-handler');
//to connect to any front 
app.use(cors());
app.options('*',cors())
//middleware
app.use(express.json());
app.use(morgan('tiny'));
// if user is authenticated or not
app.use(authJwt());
app.use(errorHandler);

//routers
const usersRoutes=require('./routes/users');


const api = process.env.API_URL;

app.use(`${api}/users`,usersRoutes);

///database
mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:'myFirstDatabase'
})
.then(() =>{
    console.log('Database connection is ready....')
})
.catch((err)=>{
    console.log('err');
})

 //server 
 app.listen(3000, () => {
    // console.log(api);
    console.log("server is running http://localhost:3000");
  });
  ////////
/*const productSchema = mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number
 
})
const Product=mongoose.model('product',productSchema);

const api = process.env.API_URL;
//creating route
app.get(`${api}/products`,async (req, res) => {
  const productlist= await Product.find(); 
  res.send(productlist);
})
app.post(`${api}/products`, (req, res) => {
   // const newproduct = req.body;
   //console.log(newproduct);
   const product = new Product({
       name:req.body.name,
       image:req.body.image,
       countInStock:req.body.countInStock
   })
   product.save().then((createdProduct =>{
       res.status(201).json(createdProduct)
   })).catch((err)=>{
       res.status(500).json({
           error:err,
           sucsess:false
       })
   })
    
  
  
  })*/
 
 
