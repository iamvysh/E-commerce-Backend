const jwt=require("jsonwebtoken")

const authorizeUser=((req,res,next)=>{

    let authHeader=req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).send("no token provided")
    }
        let token=authHeader.split(" ")[1]
        jwt.verify(token,"vysh",(err)=>{
            if(err){
                res.send("invalid user")
            }else{
                next()
            }
        })


})

module.exports=authorizeUser;