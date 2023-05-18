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
      req.body // What the Vue App is sending
      /* { // pass in body content to be stored in DB
          author:"Fox", 
          todo:"sleep"
        } */
    ); 
    const savedTodo = await newTodo.save() // mongo save method
    res.json(savedTodo) // respond with json to our post endpoint
  });

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
      { _id: req.params.id }, 
      
      { $set: req.body }
     /*  {
        author: "Fox",
        todo: "Sleep"
      } */
    )
    res.json(tUpdate)
  })

module.exports = router 