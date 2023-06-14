const Product=require("../model/productSchema")

const addProduct=async(req,res)=>{

    const product=new Product(req.body)

    
        item =await product.save()
        //  res.json(item)
        res.json({
          status: "success",
          
          data: item,
        });
      


}

const getAllTheProducts=async(req,res)=>{
        
    
        console.log("hello");
        const products=await Product.find()
        // res.json(products)
        res.json({
          status: "success",
          
          data: products,
        });
        
    
}

const getProductsByCategory=async(req,res)=>{

    const category=req.query.category
    console.log(category);
    
        const products=await Product.find({category:category})

        if(products.length>0){
            // res.send(products)
            res.json({
              status: "success",
              
              data: products,
            });
        }else{
            // res.send(`no products found`)
            res.json({
              status: "failure",
              message:"no products found in this category"
              
             
            });
        }
    
   


}

const getProductById=async(req,res)=>{
    const Id=req.params.id
    
        const product=await Product.findById(Id)

        if(product){
            res.status(200).json({
              status: "success",
              
              data: product,
            });
        }else{
            res.json({status:failure,message:"please enter a valid id"})
        }
    



}


const updateProduct=async(req,res)=>{
    const productId = req.params.id;
  const updatedproduct = req.body;
  console.log(productId,updatedproduct);

  
    const product = await Product.findByIdAndUpdate(productId , updatedproduct,{ new: true });
    // updateOne({_id:productId},{price:req.body.price})

    if (product) {
      res.status(200).json({status:success, message: 'product updated successfully.',data: product });
    } else {
      res.status(404).json({status:failure, message: 'product not found.' });
    }
 
}

const deleteProduct=async(req,res)=>{

    const productId=req.params.id

    
       const product=await Product.findByIdAndDelete(productId)
       if (product) {
        res.status(200).json({status:success, message: 'product deleted successfully.' });
      } else {
        res.status(404).json({status:failure, message: 'product not found.' });
      }
    

}



module.exports={addProduct,getProductsByCategory,getProductById,getAllTheProducts,updateProduct,deleteProduct}



// key id  rzp_test_nFmtKWz2oRbcjq
// key secret    Wy12mxeiE0bIXMeCKhnpRInM