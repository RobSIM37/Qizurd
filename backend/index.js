const express = require('express');
const server = express();
const bodyParser = require("body-parser")
const cors = require('cors')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors());

const data = require("./layers/data/data");
const timeUtils = require("./utils/timeUtils");

const quizCtrl = require("./layers/controllers/quizController");
const userCtrl = require("./layers/controllers/usersController");
const studentCtrl = require("./layers/controllers/studentController");

const userServices = require("./layers/services/userServices");

const loadDataAndBuildUsers = async () => {
    await data.loadDataFromDB();
    userServices.buildUsersFromUserData(data.getAllUserData());
}

loadDataAndBuildUsers();

const exportUsersAndSaveToDB = () => {
    data.setAllUserData(userServices.getAllUserData("_id"));
    data.saveDataToDB()
}

setInterval(()=>{exportUsersAndSaveToDB},timeUtils.convertToMilliseconds(1,"day"));
process.on("SIGINT", ()=>{exportUsersAndSaveToDB(); process.exit()});

const PORT = 8025;

server.post("/",userCtrl.userLogin);
server.post("/register",userCtrl.registerUser);

server.post("/quizzes", quizCtrl.addOrUpdateQuiz);
server.get("/quizzes/:userId/:quizId",quizCtrl.getQuiz);
server.get("/quizzes/:userId", quizCtrl.getAllQuizzes);
server.delete("quizzes/:userId/:quizId", quizCtrl.deleteQuiz);
server.post("/questions", quizCtrl.addOrUpdateQuestion);
server.get("/questions/:userId/:quizId/:questionId",quizCtrl.getQuestion);
server.get("/questions/random/:userId/:quizId/:studentId",quizCtrl.getRandomQuestionForStudent);
server.delete("/questions/:userId/:quizId/:questionId",quizCtrl.deleteQuestion);

server.post("/students", studentCtrl.addOrUpdateStudent);
server.delete("/students/:userId/:studentId", studentCtrl.deleteStudent);
server.get("/students/:userId",studentCtrl.allStudents);
server.post("/students/answer",studentCtrl.logStudentAnswer);

server.listen(PORT, ()=>{console.log(`Server up and listening on port ${PORT}`)});