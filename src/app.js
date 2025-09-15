const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User =require('./models/user')

app.use(express.json())

app.post("/signup", async (req, res) => {
  console.log("req",req);
  const user = new User(req.body);
  try{
    const data = await user.save();
    res.send("Data saved to database", data);
  }catch(error){
    res.send('Error sending the data')
  }
});

connectDB()
  .then(() => {
    app.listen(2323, () => {
      console.log("Server has started");
    });
  })
  .catch((err) => console.log("Error"));
