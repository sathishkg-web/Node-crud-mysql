const express= require('express');
const router=express.Router();
const path=require('path');
const productController= require("../controllers/productsController");


// /login =>get
router.post('/logout', productController.logout);


module.exports =router;