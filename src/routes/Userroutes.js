const express=require("express")
const user= require("../controller/userController")
const product=require("../controller/productController")
const userToken=require("../middlewares/authorizeUser")
const tryCatchMiddleware=require("../middlewares/tryCatch")
const router=express.Router()


router.post("/users/register",tryCatchMiddleware(user.registration))
router.post("/users/login",tryCatchMiddleware(user.login))

router.get("/users/products/category",userToken,tryCatchMiddleware(product.getProductsByCategory))
router.get("/users/products/:id",userToken,tryCatchMiddleware(product.getProductById))
router.get("/users/products",userToken,tryCatchMiddleware(product.getAllTheProducts))

router.post("/users/cart/:id",userToken,tryCatchMiddleware(user.AddProductToCart))
router.get("/users/cart/:id",userToken,tryCatchMiddleware(user.GetCartItems))
router.delete("/users/cart/:id",userToken,tryCatchMiddleware(user.deleteProductFromCart))

router.post("/users/whishlists/:id",userToken,tryCatchMiddleware(user.AddProductToWhishList))
router.get("/users/whishlists/:id",userToken,tryCatchMiddleware(user.GetWhishLIst))
router.delete("/users/whishlists/:id",userToken,tryCatchMiddleware(user.deleteItemFromWhishlist))

router.get("/users/payment/:id",tryCatchMiddleware(user.proceedToPayment))

module.exports=router