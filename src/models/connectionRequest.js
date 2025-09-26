const { Schema, model } = require("mongoose");
const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status:{
        type:String,
        enum:({
            values:['interested','ignored','accepted','rejected'],
            message:'{VALUE} is not a valid type'
        })
    }
  },
  { timestamps: true }
);


// connectionRequestSchema.pre("save",function(next){
//     const connectionRequest =this;
//     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
//         throw new Error('Cannot send connection request to self')
//     }
//     next()
// })
const connectionRequest = model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequest;
