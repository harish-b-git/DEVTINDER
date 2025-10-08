const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;
    try {
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Not a valid allowed type");
      }
      const toUser = await User.findById(toUserId);
      console.log(toUser);
      if (!toUser) {
        throw new Error("Check your touserId User not found");
      }
      if(fromUserId.equals(toUserId)){            /// fromUserId,toUserId are objects so we are checking like this
         throw new Error('Cannot send connection request to self')
      }
      const isConnectionFound = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (isConnectionFound) {
        throw new Error("Connection request ALready sent");
      }
      //   Creating a new instance of the connectionrequest model
      const connection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await connection.save();
      res.send("Connection Request Sent from" + req.user.firstName);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
module.exports = requestRouter;
