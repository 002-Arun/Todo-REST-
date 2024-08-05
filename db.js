const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Arun:753864291@cluster0.45t5roo.mongodb.net/REST?retryWrites=true&w=majority&appName=Cluster0")

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const Todo = mongoose.model("Todo" , todoSchema)

module.exports = {
    Todo
}
