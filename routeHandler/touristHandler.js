const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const touristSchema = require("../schemas/touristSchema")

// create a model using touristSchema
const Tourist = new mongoose.model("Tourist", touristSchema)

// GET ALL TOURISTS using callback
router.get("/allTourist", (req, res) => {
Tourist.find({}, ((err, data)=> {
    if(err){
        res.status(500).json({
            error:"There was a server side error"
        })
    } else {
        res.status(200).json({
            data: data,
            message:"Success"
        })
    }
}))

})


// GET A TOURIST using async and await
router.get("/:id", async(req, res) => {
    try{
        const data = await Tourist.find({_id: req.params.id})
        res.status(200).json({
            result: data,
            message: "Success"
        })

    } catch(err){
        res.status(200).json({
            error:"There was a server side error"
        })
    }

})


//check is email Available 
router.post("/isEmailAvailable", async(req, res) => {
   
    try{
        const data = await Tourist.find({email: req.body.email})
        res.status(200).json({
            result: data.length,
            message: "Success",
            data: data
        })
       console.log(data)

    } catch(err){
        res.status(200).json({
            error:"There was a server side error"
        })
    }

})


// LOGIN
router.post("/login", async(req, res) => {
    try{
        const data = await Tourist.find({email: req.body.email, password: req.body.password})
        res.status(200).json({
            result: data.length,
            message: "Success",
            data: data
        })
       

    } catch(err){
        res.status(200).json({
            error:"There was a server side error"
        })
    }

})


// POST A TOURIST
router.post("/aTourist",(req, res) => {
    const newTourist = new Tourist(req.body)
    newTourist.save((err)=> {
        if(err){
            res.status(500).json({
                error: "There was server side error!"
            })
        } else {
            res.status(200).json({
                message: "Todo was inserted successfully"
            })
        }
    })
})

// POST MULTIPLE TOURIST
router.post("/fewTourist", (req, res) => {
    Tourist.insertMany(req.body, (err)=> {
        if(err){
            res.status(500).json({
                error: "There was server side error!"
            })
        } else {
            res.status(200).json({
                message: "Todos were inserted successfully"
            })
        }
    })
})


// PUT A TOURIST (only update)
// router.put("/hotelBooking", (req, res) => {
//     console.log(req.body);
//         // Tourist.updateOne({}, {
//         //     $set: req.body
//         // }, (err)=>{
//         //     if(err){
//         //         res.status(500).json({
//         //             error: "There was server side error!"
//         //         })
//         //     } else {
//         //         res.status(200).json({
//         //             message: "Todo updated successfully"
//         //         })
//         //     }
//         // })
// })


// PUT A TOURIST (update)
router.put("/hotelBooking", (req, res) => {
    Tourist.updateOne({email:req.body.email}, {
        $set: req.body
    }, ((err, data)=> {
        if(err){
            res.status(500).json({
                error:"There was a server side error"
            })
        } else {
            data,
            res.status(200).json({
                result: data,
                message:"Success"
            })
        }
    }))
})

// DELETE A TOURIST
router.delete("/:touristId", async(req, res) => {

})


module.exports = router