const express = require('express')
const mongoose=require('mongoose')
const app = express()
const port = 3000

var db = "mongodb://localhost:27017/example"
var bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // change to expresss

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db);
  console.log("db connected");
}
// 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })






//  user
const Authuser=require("./routes/Userroutes")
app.use("/",Authuser)



// admin

const Authadmin=require("./routes/Adminroutes")
app.use("/",Authadmin)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})