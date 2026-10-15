import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    
    description: {
      type: [String],
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: [1, "Age must be a positive number"],
      max: [120, "Age must be less than or equal to 120"],
    }
    
  },


  {
    timestamps:true
  }
)

export const post = mongoose.model("Post", postSchema);