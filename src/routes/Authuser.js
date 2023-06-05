const express=require("express")
const user= require("../controller/userController")
const product=require("../controller/productController")
const userToken=require("../middlewares/authorizeUser")
const router=express.Router()


router.post("/users/register",user.registration)
router.post("/users/login",user.login)
router.get("/users/products/category",userToken,product.getProductsByCategory)
router.get("/users/products/:id",userToken,product.getProductById)
router.post("/users/cart/:id",userToken,user.AddProductToCart)
router.post("/users/whishlists/:id",userToken,user.AddProductToWhishList)
router.get("/users/products",userToken,product.getAllTheProducts)
router.get("/users/cart/:id",userToken,user.GetCartItems)
router.get("/users/whishlists/:id",userToken,user.GetWhishLIst)
router.delete("/users/whishlists/:id",userToken,user.deleteItemFromWhishlist)
router.delete("/users/cart/:id",userToken,user.deleteProductFromCart)

module.exports=router