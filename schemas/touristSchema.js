const mongoose = require("mongoose")

const touristSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique : true,
        dropDups: true
    },
    password:String,
    userRole:{
        type:String,
        enum:['tourist', 'admin']
    },
    uid: String,
    roomNo: String,
    roomType: String,
    roomImage: String,
    totalDays: Number,
    roomCost: Number,
    totalCost:Number,
    checkInDate: String,
    checkOutDate: String,
    extraServices: Array,
    extraServicesCost: Number,
    bookingDate: String,
    gmailUsed: Boolean
})

module.exports = touristSchema