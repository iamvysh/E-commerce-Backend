const express=require("express")
const user= require("../controller/userController")
const product=require("../controller/productController")
const router=express.Router()


router.post("/users/register",user.registration)
router.post("/users/login",user.login)
router.get("/users/products",product.getProductsByCategory)
router.get("/users/products/:id",product.getProductById)



module.exports=router