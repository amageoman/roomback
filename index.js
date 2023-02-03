
// import cors

const cors=require('cors')

const dataservice =require('./service/dataservice')


// import express
const express=require('express')
const { json } = require('express')

// create app
const app=express()

app.use(cors({origin:'http://localhost:4200'}))

app.use(express.json())




app.post('/register',(req,res)=>{
   dataservice.register(req.body.email,req.body.username,req.body.password).then(result=>{
    res.status(result.statuscode).json(result)
   }) 
})


app.post('/login',(req,res)=>{
    dataservice.login(req.body.email,req.body.password).then(result=>{
     res.status(result.statuscode).json(result)
    }) 
 })

 app.get('/getrooms',(req,res)=>{
    dataservice.getrooms().then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })


 app.get('/getsingleroom/:rid',(req,res)=>{
    dataservice.getsingleroom(req.params.rid).then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })



 app.post('/book',(req,res)=>{
    dataservice.Book(req.body.user,req.body.roomid,req.body.checkin,req.body.checkout,req.body.location,req.body.price,req.body.name).then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })



 app.get('/roomsbooked',(req,res)=>{
    dataservice.roomsbooked().then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })


 app.post('/roomdetails',(req,res)=>{
    dataservice.roomdetails(req.body.email).then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })



 app.patch('/deleteroom',(req,res)=>{
    dataservice.deleteroom(req.body.index,req.body.email).then(result=>{
        res.status(result.statuscode).json(result.message)
    })
 })

app.listen(3000,()=>{
    console.log("port started");
})