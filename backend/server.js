const express = require("express")
var cors = require('cors')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

app.use(cors( { 
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
console.log("pineapple")

// Create out express app

// handle the CORS plus middleware
/* app.use(function(req, res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
}) */

// database things
const uri = "mongodb+srv://TinyFox:12345@leagueapiuni.18g90cd.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json())

//Routes 
app.get("/", (res, req) => {
    res.send("Home page OwO")
})

const TodosRoute = require('./routes/Todos');
app.use('/todos', TodosRoute)

const AuthRoute = require('./routes/Auth');
app.use('/', AuthRoute)

// Start Server
app.listen(3000, () => {
    console.log("Listening at port 3000")
})