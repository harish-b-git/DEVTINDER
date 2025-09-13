const express = require('express')

const app = express()


app.post('/abc',(req,res)=>{
console.log("req",req.query);
    res.send({firstName:'Harish',lastName:'Batta'})
})

app.get('/user',(req,res)=>{

    res.send('User Data')
})

app.listen(2323,()=>{
    console.log("Server has started");
})