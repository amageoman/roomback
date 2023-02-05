const db = require('./db')


register = (email, username, password) => {

    return db.User.findOne({ email }).then(result => {
        if (result) {
            return {
                message: "mail already registered",
                status:false,
                statuscode:400
            }
        }
        else {
            const newuser = new db.User({
                email,
                username,
                password,
                checkin:'',
                checkout:'',
                roomno:[],
                totalprice:0

            })

            newuser.save();
            return {
                message: "user registered",
                status:true,
                statuscode:200
            }
        }

    }
    )
}



login=(email,password)=>{

    return db.User.findOne({email , password}).then(result=>{
        if(result){
            return {
                message:"login success",
                status:true,
                statuscode:200,
                user:result.email,
                username:result.username

            }
        }
        else{
            return{
                message:"Wrong inputs",
                status:false,
                statuscode:400
            }
        }
    })
}


getrooms=()=>{

    return db.Room.find().then(result=>{

        if(result){
            return{
                message:result,
                status:true,
                statuscode:200
            }

        }

        else{
            return {
                message:"no rooms",
                status:false,
                statuscode:400
            }
        }
    })
}


getsingleroom=(roomid)=>{

    var roomid=parseInt(roomid)

    return db.Room.findOne({roomid}).then(result=>{

        if(result){
            return{
                message:result,
                status:true,
                statuscode:200
            }

        }

        else{
            return {
                message:"no rooms",
                status:false,
                statuscode:400
            }
        }
    })
}



Book=(user,roomid,checkin,checkout,location,price,name)=>{

return db.User.findOne({email:user}).then(item=>{


    var checkindate=checkin.split('-')
var checkoutdate=checkout.split('-') 

const indate =new Date(`${checkindate[1]}/${checkindate[2]}/${checkindate[0]}`)
var outdate = new Date(`${checkoutdate[1]}/${checkoutdate[2]}/${checkoutdate[0]}`)

var time =Math.round(Math.abs((indate.getTime())-(outdate.getTime()))) 

var days=time/(1000*3600*24)
var pricenumber=parseInt(price)
var totalprice=days*pricenumber;
    if(item){
item.roomid.push(roomid);
item.roomdetails.push({name,checkin,checkout,location,price,totalprice,days})



item.save()

return {
    message:item,
    status:true,
    statuscode:200
}
    }
    else{

        return {
            message:"no user found",
            status:false,
            statuscode:400
        }
    }
})


}

roomsbooked=()=>{
    return db.User.find().then(item=>{

        if(item){
var rooms=[]
            for(i of item){
                var roomno=i.roomid
                for(j of roomno){
                    rooms.push(j);
                }
            }

            return {
                message:rooms,
                status:true,
                statuscode:200
            }
        }
        else{
            return {
                message:"no rooms booked",
                status:false,
                statuscode:400
            }
        }
    })

}



roomdetails=(email)=>{
    return db.User.findOne({email}).then(item=>{
        if(item){
            return {
                message:item.roomdetails,
                status:true,
                statuscode:200
            }
        }
        else{
            return {
                message:"no rooms booked",
                status:false,
                statuscode:400
            }
        }
    })


}



deleteroom=(index,email)=>{
    var index=parseInt(index)
return db.User.findOne({email}).then(data=>{
    
    if(data){

        
        data.roomid.splice(index,1)
        data.roomdetails.splice(index,1)
        data.save();

        return{
            message:"deleted",
            status:true,
            statuscode:200
        }
    }
    else{
        return{
            message:"already deleted",
            status:false,
            statuscode:400
        }
    }
})
}

module.exports = {
    register,login,getrooms,getsingleroom,Book,roomsbooked,roomdetails,deleteroom
}