const express = require('express')
const mongoose=require('mongoose')
const app = express()
const port = 3000
const mongoDB = "mongodb+srv://vyshnavthaithottathil:qMYQmZzFuLRzBQsX@cluster0.qbpdcce.mongodb.net/"
var db = "mongodb://localhost:27017/example"
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })






//  user
const Authuser=require("./src/routes/Authuser")
app.use("/",Authuser)



// admin

const Authadmin=require("./src/routes/Authadmin")
app.use("/",Authadmin)


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(db);
  console.log("db connected");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})