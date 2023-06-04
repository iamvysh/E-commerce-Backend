const mongoose=require("mongoose")

const adminSchema= new mongoose.Schema({
    username:String,
    password:String,
    email:String
})

let admin=mongoose.model("admin",adminSchema)

module.exports=admin;