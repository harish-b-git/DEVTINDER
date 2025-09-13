const express = require('express')

const app = express()

app.use('/user',(req,res)=>{

    res.send('Hello Harish')
})
app.listen(2323,()=>{
    console.log("Server has started");
})