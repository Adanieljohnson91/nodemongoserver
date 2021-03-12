const Person = require("../models/PersonSchema")

async function create(personObject){
    let person = new Person(personObject)
    let doc = await person.save()
    console.log(doc.favoiteFoods)
    return doc;
}
async function getById(id){
    let doc = await Person.find({ _id: id})
    console.log(doc)
    return doc
}

async function getByName(name){
    let doc = await Person.findOne({name})
    console.log(doc)
    return doc;
}

async function getAll(){
    let doc = await Person.find()
    return doc
}

async function update(id, person){
    let doc = await Person.findByIdAndUpdate({_id: id}, person, { new: true})
    return doc
}

async function deleteById(id){
    await Person.findByIdAndDelete(id).catch(err=>console.log(err)) 
}

async function searchUserByName(name){
    let results = await Person.find({name: { $regex: name}})
    .catch(err=> console.log(err))
    return results;
}

module.exports = {
    getByName,
    create,
    update,
    getAll,
    deleteById,
    getById,
    searchUserByName
}