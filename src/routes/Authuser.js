const express=require("express")
const user= require("../controller/userController")
const product=require("../controller/productController")
const router=express.Router()


router.post("/users/register",user.registration)
router.post("/users/login",user.login)
router.get("/users/products/category",product.getProductsByCategory)
router.get("/users/products/:id",product.getProductById)
router.post("/users/cart/:id",user.AddProductToCart)
router.post("/users/whishlists/:id",user.AddProductToWhishList)
router.get("/users/products",product.getAllTheProducts)
router.get("/users/cart/:id",user.GetCartItems)
router.get("/users/whishlists/:id",user.GetWhishLIst)
router.delete("/users/whishlists/:id",user.deleteItemFromWhishlist)
router.delete("/users/cart/:id",user.deleteProductFromCart)

module.exports=router