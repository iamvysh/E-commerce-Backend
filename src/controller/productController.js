const Product=require("../model/productSchema")

const addProduct=async(req,res)=>{

    const product=new Product(req.body)

    try{
        item =await product.save()
         res.json(item)

    }catch(err){
        console.log("error",err);
    }

}

const getProductsByCategory=async(req,res)=>{

    const category=req.query.category
    try{
        const products=await Product.find({category})

        if(products.length>0){
            res.send(products)
        }else{
            res.send(`no products found`)
        }
    }catch(err){
        console.log(`error`,err);
    }
   


}

const getProductById=async(req,res)=>{
    const Id=req.params.id
    try{
        const product=await Product.findById(Id)

        if(product){
            res.status(200).send(product)
        }else{
            res.json({status:failed,message:"please enter a valid id"})
        }
    }catch(err)
    {
        console.log("error",err)
    }



}



module.exports={addProduct,getProductsByCategory,getProductById}