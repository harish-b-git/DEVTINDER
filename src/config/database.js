const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://namastedev:0HDZdkyPNshI81xk@namastenode.cvu9kg1.mongodb.net/devTinder";
  // "mongodb+srv://namastedev:0HDZdkyPNshI81xk@namastenode.cvu9kg1.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode";
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { ssl: true });
    console.log("Connect to database");
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}

// connectDB();
module.exports = { connectDB };
