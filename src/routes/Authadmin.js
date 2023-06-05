const express=require("express")
const procucts=require("../controller/productController")
const admin=require("../controller/adminController")
const AdminToken=require("../middlewares/authorizeAdmin")

const router=express.Router()


router.post("/admin/register",admin.adminRegistration)
router.post("/admin/login",admin.adminLogin)
router.post("/admin/products",AdminToken,procucts.addProduct)
router.get("/admin/users",AdminToken,admin.toGetAllUsers)
router.get("/admin/users/:id",AdminToken,admin.toGetAUserById)
router.get("/admin/products/category",AdminToken,procucts.getProductsByCategory)
router.get("/admin/products",AdminToken,procucts.getAllTheProducts)
router.get("/admin/products/:id",AdminToken,procucts.getProductById )
router.put("/admin/products/:id",AdminToken,procucts.updateProduct)
router.delete("/admin/products/:id",AdminToken,procucts.deleteProduct)


module.exports=router