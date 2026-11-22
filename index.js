const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const userRoutes = require("./Routes/user.routes.js");
const DbUrl = "mongodb+srv://abhipaul7525_db_user:AvWSwyI9mbCVrS0J@cluster0.vx2mlvj.mongodb.net/";

mongoose.connect(DbUrl)
  .then(() => console.log('Connected to MongoDB'))

  app.use(express.json());


  const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toTimeString()}] Method: ${req.method}, URL: localhost:3000${req.url}`);
    next();
  }

app.get('/', loggingMiddleware, (req, res) => {
  res.send('<h1>Welcome to the user management system</h1>');
});


app.use("/api/users", userRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})