const express = require('express');
const router = express.Router();
const { verifyToken } = require("../tokenValidation")
const { verifyUserAndToken } = require("../userValidation")
const Todo = require('../models/Todos')

// Get all Todo route
router.get('/', verifyToken, async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

/* token verification test */
router.get("/verifytest", verifyToken, (req, res) => {
  res.send("Yaiii you are logged in! :3")
})

// create new Todo
router.post('/new', verifyToken, async (req, res) => {
  
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
router.delete('/delete/:id', verifyUserAndToken, async (req, res) => {
  await Todo.findByIdAndDelete({ _id : req.params.id })
  res.send()
})

// update todo by id
router.put('/update/:id', verifyUserAndToken, async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id }, 
    { $set: req.body }
  )
  res.send()
})
//get tasks by creator 
router.get('/taskByNickname/:nickname', verifyToken, async (req, res) => {
  Todo.find({
    creator: req.params.nickname
  })
  .then(TodoData => res.send(TodoData))
  .catch(error => console.log(error))
})

module.exports = router 