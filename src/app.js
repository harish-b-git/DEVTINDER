const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// find a user by id
app.get("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const result = await User.findById({ _id: id });
    if (!result) {
      res.status(404).send("User Not Found");
    } else {
      res.send(result);
    }
  } catch (Error) {
    res.status(400).send("Something went wrong");
  }
});

// delete a user
app.delete("/user", async (req, res) => {
  console.log("req", req.body.id);
  try {
    const result = await User.findByIdAndDelete(req.body.id);
    //  const result = await User.findByIdAndDelete({ _id: req.body.id });
    res.send("Deleted Successfully");
  } catch (Error) {
    res.status(400).send("Something went wrong");
  }
});

//update a user
app.patch("/user", async (req, res) => {
  try {
    // const name = req.body.first_name;
    const email = req.body.email;
    const result = await User.findOneAndUpdate(
      {emailId:email},
      req.body,
      { returnDocument: "after" }
    );
    res.send(result);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// get all the users
app.get("/feed", async (req, res) => {
  try {
    const result = await User.find({});

    if (result.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(result);
    }
  } catch (Error) {
    res.status(400).send("Something went wrong");
  }
});

// create a user
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    const data = await user.save();
    res.send("Data saved to database", data);
  } catch (error) {
    res.send("Error sending the data");
  }
});

connectDB()
  .then(() => {
    app.listen(2323, () => {
      console.log("Server has started");
    });
  })
  .catch((err) => console.log("Error"));
