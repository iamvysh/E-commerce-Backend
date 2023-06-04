const Admin=require("../model/adminSchema")
const jwt = require("jsonwebtoken");
const Users=require("../model/userSchema")


// register admin

const adminRegistration = async (req, res) => {
    try {
      
      const userName = req.body.username;
      const findAdmin = await Admin.find({ username: userName });
      if (findAdmin.length > 0) {
        res.send("admin already Exist");
      }
  
      const newAdmin = new Admin(req.body);
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
    
        if (passWord !== admin.password) {
          return res.status(401).json({ auth: false, message: 'Invalid username or password' });
        }
    
        const token = jwt.sign({ username: userName }, 'admin', { expiresIn: '24h' });
        res.json({ auth: true, token });
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



  module.exports={adminRegistration,adminLogin,toGetAllUsers,toGetAUserById}
  