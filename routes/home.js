const express= require('express');
const router=express.Router();
const path=require('path');
const productController= require("../controllers/productsController");

/*
router.get('/',(req,res,next)=>{
  //  res.sendFile(path.join(__dirname,'../','views','shop.html'));
      res.render("shop");
});
*/
router.get('/',productController.auth,productController.view);

router.post('/editproduct/:id',productController.auth,productController.edit);
router.get('/editproduct/:id',productController.auth,productController.editproduct);



router.get('/deleteproduct/:id',productController.auth,productController.deleteproduct);

module.exports =router;