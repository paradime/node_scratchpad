var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  firstName: String,
  lastName: String,
  gpa: Number
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
