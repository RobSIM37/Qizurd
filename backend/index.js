const express = require('express');
const server = express();
const cors = require('cors')

server.using(cors());

const quizCtrl = require("./layers/controllers/quizController");
const userCtrl = require("./layers/controllers/usersController");

const PORT = 8025;

server.post("/",userCtrl.userLogin);
server.post("/register",userCtrl.registerUser);
server.get("/students/:userId/:quizId",quizCtrl.getQuiz);

server.listen(PORT, ()=>{console.log(`Server up and listening on port ${PORT}`)})