const Admin=require("../model/adminSchema")
const jwt = require("jsonwebtoken");
const Users=require("../model/userSchema")
const bcrypt = require('bcrypt')
const validateSchema=require("../middlewares/schemaValidate")

// register admin

const adminRegistration = async (req, res) => {
    
      
      // const userName = req.body.username;
      // const Password=req.body.password
      const { error, value } = validateSchema.adschema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { username, password,email } = value;
      const findAdmin = await Admin.find({ username: username });
      if (findAdmin.length > 0) {
        res.send("admin already Exist");
      }
      let hashedpassword= await bcrypt.hash(password, 10)
  
      const newAdmin = new Admin({username:req.body.username,password:hashedpassword,email:email});
      await newAdmin.save();
      
      res.json("Admin registered successfully,plsease login");
    
  }

// login admin

const adminLogin=async(req,res)=>{
    
        // const userName = req.body.username;
        // const passWord = req.body.password;

        const { error, value } = validateSchema.adschema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { username, password } = value;
          console.log("hu");
        const admin = await Admin.findOne({ username: username });
    
        if (!admin) {
          return res.status(401).json({ auth: false, message: 'Invalid username or password' });
        }



        // hashing the password first

         let Password= await bcrypt.hash(password, 10)

        

         bcrypt.compare(Password, admin.password, (err, result) => {
          if (err) {
            res.status(401).json({ auth: false, message: 'Invalid  password' });
          }
        })
    
        // if (passWord !== admin.password) {
        //   return res.status(401).json({ auth: false, message: 'Invalid username or password' });
        // }
    
        const token = jwt.sign({ username: userName }, 'admin', { expiresIn: '24h' });
        res.json({
          status: "success",
          message: "Admin succefully logged in ",
          data: token,
        });
      
}


const toGetAllUsers=async(req,res)=>{

  
    let users=await Users.find()
    res.json(users)

    

  
  
}

const toGetAUserById=async(req,res)=>{
  userId=req.params.id
  
    let user=await Users.findById(userId)
    res.json(user)

  
}


const toGetStatus=async(req,res)=>{
  
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
    
  
}


const orderDetails=async(req,res)=>{
  
    const orderDetail = await Users.find({}, "orders");

    const validOrderDetail = orderDetail.filter((item) => {
      return item.orders && item.orders.length > 0;
    });

    // it eliminates the oraders of null array=> if the array contains null values

    if (validOrderDetail.length > 0) {
      res.status(200).json({ orders: validOrderDetail });
    } else {
      res.status(404).json({ message: "No valid orders found" });
    }
 
}


  module.exports={adminRegistration,adminLogin,toGetAllUsers,toGetAUserById,toGetStatus,orderDetails}
  