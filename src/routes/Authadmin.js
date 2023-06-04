const express=require("express")
const procucts=require("../controller/productController")
const admin=require("../controller/adminController")

const router=express.Router()


router.post("/admin/register",admin.adminRegistration)
router.post("/admin/login",admin.adminLogin)
router.post("/admin/products",procucts.addProduct)
router.get("/admin/users",admin.toGetAllUsers)
router.get("/admin/users/:id",admin.toGetAUserById)
router.get("/admin/products/category",procucts.getProductsByCategory)
router.get("/admin/products",procucts.getAllTheProducts)
router.get("/admin/products/:id",procucts.getProductById )
router.put("/admin/products/:id",procucts.updateProduct)
router.delete("/admin/products/:id",procucts.deleteProduct)


module.exports=router