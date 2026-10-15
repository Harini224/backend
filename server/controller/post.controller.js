import {post} from "../models/post.model.js";

//create a new post
const createPost = async (req,res)=>{
  try{
    const {name, description, age} = req.body;
    if(!name || !description || !age){
      return res.status(400).json({message: "All fields are required"});
    }

    const newPost = await post.create({name, description, age});

    res.status(201).json({message: "Post created successfully", post:newPost});
  }
  catch(error){
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}


const getAllPosts = async (req,res)=>{
  try{
    const posts = await post.find();
    res.status(200).json({message: "Posts retrieved successfully", posts});
  }
  catch(error){
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}


const updatepost = async (req,res)=>{
  try {
    //basic validation
    //check if request body is empty i.e {name: "", description: "", age: ""} 
    // or {} => truthy 
    if(Object.keys(req.body).length === 0){
      return res.status(400).json({message: "No data provided for update"});
    }

    const updatedpost = await post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
    if(!updatedpost){
      return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json({message: "Post updated successfully", post: updatedpost});
  }
  catch(error){
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}

const deletepost = async (req,res)=>{
  try{
    const deletedpost = await post.findByIdAndDelete(req.params.id);
    if(!deletedpost){
      return res.status(404).json({message: "Post not found"});
    }

    res.status(200).json({message: "Post deleted successfully", post: deletedpost});
  }
  catch(error){
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}

export {createPost, getAllPosts, updatepost, deletepost};