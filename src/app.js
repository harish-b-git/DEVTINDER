const express = require("express");

const app = express();

app.post("/abc", (req, res) => {
  console.log("req", req.query);
  res.send({ firstName: "Harish", lastName: "Batta" });
});

app.get(
  "/user",
  (req, res,next) => {
    console.log("res 1");
    // res.send("Response 1!!");
    next()
  },
  (req, res,next) => {
    console.log("res 2");
    next()
  },
  (req, res,next) => {
    console.log("res 3");
    // res.send("Respons3 3!!");
    next()
  },
  [(req, res,next) => {
    console.log("res 4");
    // res.send("Respons3 3!!");
    next()
  },
  (req, res,next) => {
    console.log("res 5");
    res.send("Respons5 !!");
    // next()
  }]
);

app.listen(2323, () => {
  console.log("Server has started");
});
