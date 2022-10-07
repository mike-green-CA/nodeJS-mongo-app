const mongoose = require("mongoose");
 
const {Schema} = mongoose;
 
const courseModel = new Schema({
  courseNumber: {type: Number},
  courseName: {type: String},
  description: {type: String},
  credits: {type: Number},
  prerequisites: {type: Array}
});
 
module.exports = mongoose.model("Course", courseModel);