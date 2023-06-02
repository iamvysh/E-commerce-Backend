const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
  }],
  whishlist:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products"
  }]

});

let user = mongoose.model("user", userschema);
module.exports = user;
