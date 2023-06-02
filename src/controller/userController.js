const User = require("../model/userSchema");
const Product=require("../model/productSchema")
const jwt = require("jsonwebtoken");



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
const login=async(req,res)=>{
  try{
    const userName=req.body.username;
    const passWord=req.body.password;
    

    let dbusername=await User.find({username:userName})
    let dbpassword=await User.find({password:passWord})

    if (dbusername.length > 0 && dbpassword.length > 0 && userName === dbusername[0].username && passWord === dbpassword[0].password) {

      console.log("hy");
      const body=req.body
      let token = jwt.sign(body, "vysh",{expiresIn: '24h'})
      res.json({auth:true,token})
    }
  }catch(err){
    console.log("error",err);
  }
}

const AddProductToCart=async(req,res)=>{

  let id=req.params.id;
 let productid=await Product.find(id)

 if(!productid){
     res.send(`error while adding to cart`)

 }else{
    cart
 }

}

module.exports = {registration,login}
