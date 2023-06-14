const jwt=require("jsonwebtoken")



const authorizeAdmin=((req,res,next)=>{

    let authHeader=req.headers.authorization;
    if(authHeader==undefined){
        res.status(401).json( {status:"failure",message:"no token provided",error_message:"no token provided"})
    }
        let token=authHeader.split(" ")[1]
        jwt.verify(token,'admin',(err)=>{
            if(err){
                res.json( {status:"failure",message:"token mismatch",error_message:"token mismatch"});
            }else{
                next()
            }
        })


})

module.exports=authorizeAdmin