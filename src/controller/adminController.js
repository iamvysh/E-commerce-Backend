const Admin=require("../model/adminSchema")
const jwt = require("jsonwebtoken");
const Users=require("../model/userSchema")
const bcrypt = require('bcrypt')

// register admin

const adminRegistration = async (req, res) => {
    try {
      
      const userName = req.body.username;
      const Password=req.body.password
      const findAdmin = await Admin.find({ username: userName });
      if (findAdmin.length > 0) {
        res.send("admin already Exist");
      }
      let hashedpassword= await bcrypt.hash(Password, 10)
  
      const newAdmin = new Admin({username:req.body.username,password:hashedpassword});
      await newAdmin.save();
      
      res.json("Admin registered successfully,plsease login");
    } catch (error) {
      console.log(error);
    }
  }

// login admin

const adminLogin=async(req,res)=>{
    try {
        const userName = req.body.username;
        const passWord = req.body.password;
          console.log("hu");
        const admin = await Admin.findOne({ username: userName });
    
        if (!admin) {
          return res.status(401).json({ auth: false, message: 'Invalid username or password' });
        }



        // hashing the password first

         let Password= await bcrypt.hash(passWord, 10)

        

         bcrypt.compare(Password, admin.password, (err, result) => {
          if (err) {
            res.status(401).json({ auth: false, message: 'Invalid  password' });
          }
        })
    
        // if (passWord !== admin.password) {
        //   return res.status(401).json({ auth: false, message: 'Invalid username or password' });
        // }
    
        const token = jwt.sign({ username: userName }, 'admin', { expiresIn: '24h' });
        res.json({ auth: true,message: "Admin logined successfully", token });
      } catch (err) {
        console.log('error', err);
        res.status(500).json({ error: 'Internal server error' });
      }
}


const toGetAllUsers=async(req,res)=>{

  try{
    let users=await Users.find()
    res.json(users)

    

  }catch(err){
    console.log("error",err)
    res.send("No Users Found")
  }
  
}

const toGetAUserById=async(req,res)=>{
  userId=req.params.id
  try{
    let user=await Users.findById(userId)
    res.json(user)

  }catch(err){
    console.log("error",errr)
    res.send("no user found")
  }
}


const toGetStatus=async(req,res)=>{
  try {
    const aggregation = Users.aggregate([
      {
        $unwind: '$orders'
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$orders.totalAmount' },
          totalItemsSold: { $sum: { $sum: '$orders.products' } }
        }
      }
    ]);


    console.log(aggregation);
  
    const result = await aggregation.exec();
    console.log(result);
  
    const totalRevenue = result[0].totalRevenue;
    const totalItemsSold = result[0].totalItemsSold;
    res.json({'Total Revenue:': totalRevenue,'Total Items Sold:':totalItemsSold});
    
  } catch (err) {
    console.error(err);
  }
}


  module.exports={adminRegistration,adminLogin,toGetAllUsers,toGetAUserById,toGetStatus}
  