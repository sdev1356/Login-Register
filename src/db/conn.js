const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/testproject").then(()=>{
    console.log(`Mongodb Connected...`)
}).catch((e)=>{
    console.log(`Connection failed`)
})