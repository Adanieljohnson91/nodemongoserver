require('dotenv').config("./.env");

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express()
const { create, getByName, update, getAll, getById, deleteById, searchUserByName} = require("./services/personService");

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/", async (req, res)=>{
   let result = await getAll()
   res.send({ results: result})
})
app.get("/user/search", async (req,res)=>{
    console.log(req.query)
   let result = await searchUserByName(req.query.name)
   res.send(result)
})
app.get("/user/:id", async (req, res)=>{
   let result = await getById(req.params.id)
    res.send(result)
})

app.post("/", (req, res)=>{
    const data = req.body
    create(req.body)
    res.send(data)
})

app.put("/:id", async (req, res)=>{
    let newPerson = await update(req.params.id, req.body.user)
    res.status(200).send(JSON.stringify(newPerson))

})                                                                                             

app.delete('/:id', (req, res)=>{
    deleteById(req.params.id)
    res.send(req.params.id)
})


app.listen(3000, ()=> console.log("listening on port 3000"))