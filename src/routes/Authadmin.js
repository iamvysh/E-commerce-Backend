const express=require("express")
const procucts=require("../controller/productController")
const router=express.Router()



router.post("/admin/products",procucts.addProduct)


module.exports=router