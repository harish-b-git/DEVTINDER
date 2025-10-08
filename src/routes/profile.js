const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditFields, validatePasswordInputRequest } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

//view
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditFields(req);
    const loggedInuser = req.user;
    console.log("user", loggedInuser);
    Object.keys(req.body).forEach((field) => {
      //   if (req.body[field] !== undefined) {
      loggedInuser[field] = req.body[field];
      //   }
    });
    console.log(loggedInuser);
    loggedInuser.save();
    res.json({ status: "Updated successfully", user: loggedInuser });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update password
profileRouter.patch("/profile/resetPassword", userAuth, async (req, res) => {
  try {
    validatePasswordInputRequest(req)
    const loggedInuser = req.user;
    const isMatched = await loggedInuser.validatePassword(
      req.body.previousPassword
    );
    if (!isMatched) {
      throw new Error("Old Password not matched");
    }
    const updatedPasswordHash = await bcrypt.hash(req.body.newPassword, 10);
    loggedInuser["password"] = updatedPasswordHash;
    loggedInuser.save();
    res.send("Password Updated Successfully");
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
});
module.exports = profileRouter;
