import mongoose from "mongoose"
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    validate: {
      validator: function(value) {
        return !/\d/.test(value); // Only allows letters
      },
      message: "Please enter only letters for username",
    },
  },
  mobile:{
    type:String,
    default:" "
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  Confirm_password: {
    type: String,
    required: [true, "Confirm password is required"],
    validate: {
      validator: function(value) {
        return this.password === value;
      },
      message: "Passwords do not match",
    },
  },
  token:{
    type:String,
  },
  currentdate:{
     type:Date
  },
  expiredtime:{
    type:Date
  },
  Isadmin:{
    type:String,
    default:"user"
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next(); // Don't re-hash if password is not modified
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.Confirm_password = undefined; // Remove confirmPassword before saving
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const user = mongoose.model('user', userSchema);

export default user