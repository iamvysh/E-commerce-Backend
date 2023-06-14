const express=require("express")
const procucts=require("../controller/productController")
const admin=require("../controller/adminController")
const tryCatchMiddleware=require("../middlewares/tryCatch")
const AdminToken=require("../middlewares/authorizeAdmin")

const router=express.Router()


router.post("/admin/register",tryCatchMiddleware(admin.adminRegistration))
router.post("/admin/login",tryCatchMiddleware(admin.adminLogin))

router.get("/admin/users",AdminToken,tryCatchMiddleware(admin.toGetAllUsers))
router.get("/admin/users/:id",AdminToken,tryCatchMiddleware(admin.toGetAUserById))

router.get("/admin/products",AdminToken,tryCatchMiddleware(procucts.getAllTheProducts))
router.get("/admin/products/:id",AdminToken,tryCatchMiddleware(procucts.getProductById ))
router.get("/admin/products/category",AdminToken,tryCatchMiddleware(procucts.getProductsByCategory))
router.post("/admin/products",AdminToken,tryCatchMiddleware(procucts.addProduct))
router.put("/admin/products/:id",AdminToken,tryCatchMiddleware(procucts.updateProduct))
router.delete("/admin/products/:id",AdminToken,tryCatchMiddleware(procucts.deleteProduct))

router.get("/admin/orders/status",AdminToken,tryCatchMiddleware(admin.toGetStatus))
router.get("/admin/orders/orderdatails",AdminToken,tryCatchMiddleware(admin.orderDetails))


module.exports=router