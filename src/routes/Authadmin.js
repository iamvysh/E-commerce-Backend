const express=require("express")
const procucts=require("../controller/productController")
const admin=require("../controller/adminController")

const router=express.Router()


router.post("/admin/register",admin.adminRegistration)
router.post("/admin/login",admin.adminLogin)
router.post("/admin/products",procucts.addProduct)



module.exports=router