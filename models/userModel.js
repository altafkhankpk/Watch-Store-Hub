const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
  },
 
 
  maritalStatus: {
    type: String,
    enum: ['single', 'married'], // You can adjust the values as needed
    required: true,
  },
 
  terms: {
    type: Boolean,
    required: true,
  },
});

// module.exports = mongoose.model('User', userSchema);
const User=mongoose.models.users ||mongoose.model("users",userSchema);
export default User;
