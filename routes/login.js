const express= require('express');
const router=express.Router();
const path=require('path');
const productController= require("../controllers/productsController");

// /login =>get
router.get('/login',(req,res,next)=>{
      res.render("login");
});

// /login =>post
router.post('/auth', productController.login);


module.exports =router;