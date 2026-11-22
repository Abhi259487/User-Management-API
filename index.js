const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const userRoutes = require("./Routes/user.routes.js");
const dotenv = require('dotenv');
dotenv.config();
const DbUrl = process.env.DbUrl;


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