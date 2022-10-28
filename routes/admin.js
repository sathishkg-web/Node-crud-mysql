const express= require('express');
const router=express.Router();
const path=require('path');
const productController= require("../controllers/productsController");

// /admin/add-produt =>get
router.get('/add-product',productController.auth,(req,res,next)=>{
  //  res.sendFile(path.join(__dirname,'../','views','add-product.html'));
      res.render("add-product",{name:req.session.username});
});
/*
// /admin/add-produt =>post
router.post('/add-product',(req,res, next)=>{
    console.log(req.body);
    res.redirect('/');
});
*/
router.post('/add-product',productController.auth,productController.addproduct);
module.exports =router;