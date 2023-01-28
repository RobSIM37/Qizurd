const express = require('express');
const server = express();
const bodyParser = require("body-parser")
const cors = require('cors')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors());

const quizCtrl = require("./layers/controllers/quizController");
const userCtrl = require("./layers/controllers/usersController");

const PORT = 8025;

server.post("/",userCtrl.userLogin);
server.post("/register",userCtrl.registerUser);
server.get("/students/:userId/:quizId",quizCtrl.getQuiz);

server.listen(PORT, ()=>{console.log(`Server up and listening on port ${PORT}`)})