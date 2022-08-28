const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const touristHandler = require("./routeHandler/touristHandler")

const port = process.env.PORT || 5000
require('dotenv').config




// express application initialization
const app = express()


// use middleware
app.use(express.json())
app.use(cors())



//application routes
mongoose.connect(`mongodb+srv://vromon_tour:vromon01tour@cluster0.alvcfcv.mongodb.net/?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        autoIndex: true,
})
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err))

// application routes
app.use('/tourist', touristHandler)



function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err)
    } 
    res.status(500).json({error: err})
}




app.listen(port, ()=> {
    console.log("Listening on Port 5000")
})