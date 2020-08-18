//import express from 'express';
//import cors from 'cors';
//import bodyParser from 'body-parser';
//import { connectDB } from './connect-db';
//import './initialize-db';
//import path from 'path'
var express = require ('express')
var cors = require('cors')
var path = require('path')
var bodyParser = require('body-parser')
var connectDB = require('./connect-db')
let port = process.env.PORT || 7777;


//create a new express instance
let app=express();

app.listen(port, console.log("Server listening on port ", port));

//app.get('/', (req,res) => {
//    res.send("Hello World")
//});

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
)

app.use(express.static(path.resolve(__dirname,'../../dist')));
app.get('/*',(req,res)=>{
    res.sendFile(path.resolve('../../dist','index.html'));
});


const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
}
module.exports = addNewTask

const updateTask = async task => {
    let {id,group, isComplete, name} = task;
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    if (group) {
        await collection.updateOne({id},{$set:{group}})
    }
    if (name) {
        await collection.updateOne({id},{$set:{name}})
    }

    if (isComplete !== undefined) {
        await collection.updateOne({id},{$set:{isComplete}})
    }
}

module.exports = updateTask;
app.post('/task/new', async (req,res)=>{
    let task=req.body.task;
    await addNewTask(task);
    res.status(200).send()
})

app.post('/task/update', async (req,res)=>{
    let task=req.body.task;
    await updateTask(task);
    res.status(200).send()
})