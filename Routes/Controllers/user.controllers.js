const express = require("express");
const User = require("../../Model/user.model");
const { generateToken } = require("./Middleware/auth.js");




const postRoute = async (req, res) => {
    try{
    const user =await User.create(req.body);
    const payload = {username: user.username, email: user.email, password: user.password, id: user._id};
    const token = await generateToken(payload);
    console.log("This is token", token);
    res.status(200).json({user: user, token: token});
    }
    catch(err){
        res.status(500).json({message: err});
    }
}


const getRoute = async(req, res) => {
    try{
      const users = await User.find({});
      res.status(200).json(users);
    }
    catch(error){
      res.status(500).json({message: error.message});
    }
}

const getUserRoute = async(req, res) => {
  try{
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
}


const putRoute = async(req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if(!user){
     return res.status(404).json({message: "User not found"});
    }
    const updatedUser = await User.findById(req.params.id);
    res.status(200).json(updatedUser);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
}


const deleteRoute = async(req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user && user.comparePassword(req.body.password)){
      return res.status(404).json({message: "Username or password is incorrect"});
    }

    res.status(200).json({message: "User has been deleted successfully"});
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
}



module.exports = {postRoute, getRoute, getUserRoute, putRoute, deleteRoute};