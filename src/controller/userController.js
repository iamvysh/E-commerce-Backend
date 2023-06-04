const User = require("../model/userSchema");
const Product=require("../model/productSchema")
const jwt = require("jsonwebtoken");

// user registaration

const registration = async (req, res) => {
  try {
    console.log(req.body, "hjikhjhhipihjip");
    const userName = req.body.username;
    const findUser = await User.find({ username: userName });
    if (findUser.length > 0) {
      res.send("user already Exist");
    }

    const newuser = new User(req.body);
    await newuser.save();
    
    res.json("User registered successfully,plsease login");
  } catch (error) {
    console.log(error);
  }
}

// user-login

const login = async (req, res) => {
  try {
    const userName = req.body.username;
    const passWord = req.body.password;

    const user = await User.findOne({ username: userName });

    if (!user) {
      return res.status(401).json({ auth: false, message: 'Invalid username or password' });
    }

    if (passWord !== user.password) {
      return res.status(401).json({ auth: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: userName }, 'vysh', { expiresIn: '24h' });
    res.json({ auth: true, token });
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// add product to cart by user


const AddProductToCart=async(req,res)=>{

  let Id=req.params.id;
  
  let productid=await Product.findById(Id)
  
  if(!productid){
    res.send(`error while adding to cart`)
    
  }try{
    
    let authHeader=req.headers.authorization;
    let token=authHeader.split(" ")[1]
    let decodedTokenUsername=jwt.decode(token,"vysh")
    
    let user=await User.findOne({username:decodedTokenUsername.username})
    if (user.cart.includes(Id)) {
       
      res.send("Product already exists in the cart");
    }
       else {
      user.cart.push(productid);
      await user.save(user);
      res.send("Product added to cart successfully");
      
    }
  }
  catch(err){
    console.log("error",err)
  }
    

}

// get all cartitems of a specificUser by id

const GetCartItems=async(req,res)=>{
   let Id=req.params.id

   try{
    let user=await User.findById(Id)
     if(!user){
      res.sent("please login")
     } 
      res.json(user.cart)
     
    }

  catch(err)
  {
    console.log("err",err);
  }

}


















// add product to whishlist

const AddProductToWhishList=async(req,res)=>{

  let Id=req.params.id;
  
  let productid=await Product.findById(Id)
  
  if(!productid){
    res.send(`error while adding to cart`)
    
  }try{
    
    let authHeader=req.headers.authorization;
    let token=authHeader.split(" ")[1]
    let decodedTokenUsername=jwt.decode(token,"vysh")
    
    let user=await User.findOne({username:decodedTokenUsername.username})
    if (user.whishlist.includes(Id)) {
       
      res.send("Product already exists in the WhishList");
    }
       else {
      user.whishlist.push(productid);
      await user.save(user);
      res.send("Product added to WishList successfully");
      
    }
  }
  catch(err){
    console.log("error",err)
  }
    

}


// get Whishlist of a specific user


const GetWhishLIst=async(req,res)=>{
  let Id=req.params.id

  try{
   let user=await User.findById(Id)
    if(!user){
     res.sent("please login")
    } 
     res.json(user.whishlist)
    
   }

 catch(err)
 {
   console.log("err",err);
 }

}



// delete Whishlist from  user




const deleteItemFromWhishlist=async(req,res)=>{

  const userId=req.params.id
  const productId=req.body.id
   
  try{
        let user=await User.findById(userId)
        if(!user){
          res.send("please register")
        }
        
          const index = user.whishlist.indexOf(productId);
          if (index === -1) {
            return res.status(404).json({ message: "Product not found in wishlist" });
          }
      
          // remove the product from the wishlist and save the updated user document
          user.whishlist.splice(index, 1);
          await user.save();
          res.send("product deleted succesfully")
      
        
          
        }

  catch(err){
    console.log("error",err)
  }
  


}


// delete a procuct from cart



const deleteProductFromCart=async(req,res)=>{
  const userId=req.params.id
  const productId=req.body.id
   
  try{
    let user=await User.findById(userId)
    if(!user){
      res.send("please register")
    }
    
      const index = user.cart.indexOf(productId);
      if (index === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      // remove the product from the wishlist and save the updated user document
      user.cart.splice(index, 1);
      await user.save();
      res.send("product deleted succesfully")
  
    
      
    }

catch(err){
  console.log("error",err)

}
}





module.exports = {registration,login,AddProductToCart,AddProductToWhishList,GetCartItems,GetWhishLIst,deleteItemFromWhishlist,deleteProductFromCart}
