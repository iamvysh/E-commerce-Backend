const jwt=require("jsonwebtoken")

const authorizeUser=((req,res,next)=>{

    let authHeader=req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).send("no token provided")
    }
        let token=authHeader.split(" ")[1]
        jwt.verify(token,"vysh",(err)=>{
            if(err){
                res.json( {status:"failure",message:"password or username mismatch",error_message:"password or username mismatch"});
            }else{
                next()
            }
        })


})

module.exports=authorizeUser;