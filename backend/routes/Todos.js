const express = require('express');
const router = express.Router();
const Todo = require('../models/Todos')

// Get all Todo route
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

// create new Todo
router.post('/new', async (req, res) => {
    const newTodo = new Todo(
        //req.body // what vue app is sending 
        {
            author: "Fox",
            todo: "hunt"
        }
    );
    const saveTodo = await newTodo.save()
    res.json(saveTodo)
})

// getter by id 
router.get('/get/:id', async (req, res) => {
    const t = await Todo.findById({ _id : req.params.id })
    res.json(t)
})

// delete todo by id
router.delete('/delete/:id', async (req, res) => {
    const tDelete = await Todo.findByIdAndDelete({ _id : req.params.id })
    res.json(tDelete)
})

// update todo by id
router.put('/update/:id', async (req, res) => {
    const tUpdate = await Todo.updateOne(
        // { _id: req.params.id }, { $set: req.body }
        {
            author: "Cat",
            todo: "sleep"
        }
    )
    res.json(tUpdate)
})

module.exports = router 