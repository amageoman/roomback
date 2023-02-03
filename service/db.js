
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hotelroom', {useNewUrlParser:true})

const User = mongoose.model('User',{
    email: String,
    username:String,
    password:String,
    
    roomid:[],
    roomdetails:[]
    
    
})

const Room=mongoose.model('Room',{

    roomid:Number,
    distid:Number,
    name:String,
    images:[],
    location:String,
    beds:String,
    airport:String,
    railway:String,
    touristplace:String,
    ac:String,
    hotwater:String,
    breakfast:String,
    service:String
})

module.exports={
    User,Room
}