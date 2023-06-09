const User = require("../model/userSchema");
const Product=require("../model/productSchema")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Razorpay = require("razorpay");

// user registaration

const registration = async (req, res) => {
  try {
    console.log(req.body, "hjikhjhhipihjip");
    const userName = req.body.username;
    const Password=req.body.password
    const findUser = await User.find({ username: userName });
    if (findUser.length > 0) {
      res.send("user already Exist");
    }
    let hashedpassword= await bcrypt.hash(Password, 10)
    

    const newuser = new User({username:userName,password:hashedpassword});
    console.log("helloooooooo");
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

    // hashing the password first

    let Password= await bcrypt.hash(passWord, 10)

    // comparing both passwords

    bcrypt.compare(Password, user.password, (err, result) => {
      if (err) {
        res.status(401).json({ auth: false, message: 'Invalid  password' });
      }
    })


    
    const token = jwt.sign({ username: userName }, 'vysh', { expiresIn: '24h' });
    res.json({ auth: true,message: "user logined succussfully", token });
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


// proceed to payment


const proceedToPayment=async(req,res)=>{

  const userId=req.params.id;
  
  try{
    let user=await User.findById(userId).populate("cart")

    // res.send(user.cart)

    if(user.cart.length==0){
      res.json({message:"your cart is empty"})
    }
    
    let totalSum = user.cart.reduce((sum,item)=>{

       return sum+item.price
      
    },0)
    console.log(totalSum)
    let noOfProducts=user.cart.length


    var instance = new Razorpay({
      key_id: 'rzp_test_nFmtKWz2oRbcjq',
      key_secret: 'Wy12mxeiE0bIXMeCKhnpRInM',
    });

    const order = await instance.orders.create({
      amount: totalSum ,
      currency: "INR",
      receipt: "Receipt#1",
    });











    console.log(order)

    let details=user.orders.push({
      products: noOfProducts,
      orderId: order.id,
      totalAmount: totalSum,
      
    });


    // const newOrder = {
    //   products: noOfProducts,
        
    //   orderId: order.id,
    //   totalAmount: totalSum,
    // };


    // let details=User.findByIdAndUpdate(
    //   user._id,
    //   { $push: { orders: newOrder } },
    //   { new: true })
    //    console.log(user._id);
      
    





    console.log(details);

    if (user.cart.length === 1) {
      user.cart = [];
    } else {
      user.cart.splice(0, user.cart.length);
    }
    await user.save();

    res.json({ message: "Order placed successfully" });




  }catch(err){
      console.log("error",err)
  }

}





module.exports = {registration,login,AddProductToCart,AddProductToWhishList,GetCartItems,GetWhishLIst,deleteItemFromWhishlist,deleteProductFromCart,proceedToPayment,proceedToPayment}
