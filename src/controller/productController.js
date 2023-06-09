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

const getAllTheProducts=async(req,res)=>{
        
    try{
        console.log("hello");
        const products=await Product.find()
        res.json(products)
        
    }catch(err){
        console.log("errr",err)
    }
}

const getProductsByCategory=async(req,res)=>{

    const category=req.query.category
    console.log(category);
    try{
        const products=await Product.find({category:category})

        if(products.length>0){
            res.send(products)
        }else{
            res.send(`no products found`)
        }
    }catch(err){
        console.log(`error in finding products`,err);
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


const updateProduct=async(req,res)=>{
    const productId = req.params.id;
  const updatedproduct = req.body;
  console.log(productId,updatedproduct);

  try {
    const product = await Product.findByIdAndUpdate(productId , updatedproduct,{ new: true });
    // updateOne({_id:productId},{price:req.body.price})

    if (product) {
      res.status(200).json({ message: 'product updated successfully.', product });
    } else {
      res.status(404).json({ message: 'product not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred.', error });
  }
}

const deleteProduct=async(req,res)=>{

    const productId=req.params.id

    try{
       const product=await Product.findByIdAndDelete(productId)
       if (product) {
        res.status(200).json({ message: 'product deleted successfully.' });
      } else {
        res.status(404).json({ message: 'product not found.' });
      }
    }catch(error){
        res.status(500).json({ message: 'An error occurred.', error });
    }

}



module.exports={addProduct,getProductsByCategory,getProductById,getAllTheProducts,updateProduct,deleteProduct}



// key id  rzp_test_nFmtKWz2oRbcjq
// key secret    Wy12mxeiE0bIXMeCKhnpRInM