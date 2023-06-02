const jwt=require("jsonwebtoken")
const user=require("./model/userschema")

const authuser=((req,res,next)=>{

    let authHeader=req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).send("no token provided")
    }
        let token=authHeader.split(" ")[1]
        jwt.verify(token,"secret",(err)=>{
            if(err){
                res.sent("invalid user")
            }else{
                next()
            }
        })


})

module.exports=authuser;