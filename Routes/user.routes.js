const express = require("express");
const User = require('../Model/user.model.js');
const { postRoute, getRoute, getUserRoute, putRoute, deleteRoute } = require("./Controllers/user.controllers.js");
const { generateToken, jwtAuth } = require("./Controllers/Middleware/auth.js");
const router = express.Router();



router.post("/signup", postRoute);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({username: username});
  if(!user){
    res.send({message: "User not found"});
  }
  try{
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
      return res.status(404).json({message: "Username or password is incorrect"});
    }
    const payload = { id: user._id, username: user.username, email: user.email };
    const token = await generateToken(payload);
    res.send({message: "Login successful", token: token});
  }
  catch(err){
    res.send({message: "Error generating token", error: err});
  }
});


router.get("/", jwtAuth, getRoute);

router.get("/:id", getUserRoute);

router.put("/:id", putRoute);

router.delete("/:id", deleteRoute);

module.exports = router;