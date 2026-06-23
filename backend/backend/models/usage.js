const mongoose = require("mongoose");

const usageSchema =
new mongoose.Schema({
  website:String,
  duration:Number,
  category:String,
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports =
mongoose.model(
"Usage",
usageSchema
);