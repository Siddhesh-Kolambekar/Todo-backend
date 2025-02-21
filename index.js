const express = require("express")
const mongoose = require("mongoose")
const Task = require("./task.model")
const cors = require("cors")
const app = express()
require("dotenv").config()
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
app.use(cors())
app.use(express.json())
app.listen(8080,()=>{
    console.log("[server]: running on port 8080")
    connnectDB()
})
async function connnectDB() {
    try{
        await mongoose.connect(
            MONGO_CONNECTION
        )
        console.log("[server] : mongo connected")
    }catch(err){
        console.log("[server : error connecting to MongoDB Atlas",err)
    }
}
app.get("/",(req,res)=>{
    res.send("Welcome to my server")
})
app.post("/store",async(req,res)=>{
    const{title,desc,status}=req.body;
    const task=await Task.create({
        title,
        desc,
        status
    })
    res.send({
        message: "Your task is stored",
        task,
    })
})
app.get("/show",async(req,res)=>{
    const tasks=await Task.find({})
    res.send({
        message:"Here's your data",
        tasks
    })
})
app.delete("/remove/:id",async(req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id)
    res.send({
        message: "Data deleted",
        task
    })
})
app.patch("/modify/:id",async(req,res)=>{
    const tasks=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send({
        message:"Task Modified",
        tasks
    })
})