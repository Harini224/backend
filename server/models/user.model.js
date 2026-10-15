import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userScheme = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      minlength:[3,"Username must be at least 3 characters long"],
      maxlength:[20,"Username must be at most 20 characters long"]  
    },

    password:{
      type:String,
      required:true,    
      minlength:[6,"Password must be at least 6 characters long"],
      maxlength:[20,"Password must be at most 20 characters long"]  
    },

    email:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"]
    }
  },

  {
    timestamps:true
  }

)

//pre-save middleware to hash the password before saving the user document
userScheme.pre("save",async function(){
  if(!this.isModified("password")){
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//method to compare the provided password with the hashed password in the database
userScheme.methods.comparePassword = async function(password){
  return bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userScheme);