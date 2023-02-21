const Question = require("../models/question");
const User = require("../models/user");
const data = require("../data/data");
const idUtils = require("../../utils/idUtils");

let users = [];

module.exports = {
    addUser: (user) => {
        users.push(user);
    },
    removeUser: (userId) => {
        users = users.filter(user=>user.id != userId);
    },
    getUser: (userId) => {
        return users.filter(user=>user.id == userId)[0];
    },
    getUserByName: (userName) => {
        return users.filter(user=>user.name == userName)[0];
    },
    getAllUserData: (idKey = "id") => {
        return users.map(user=>user.export(idKey));
    },
    buildUsersFromUserData: (userData) => {
        users = userData.map(u => new User(u));
        userData.forEach(user => user.quizzes.forEach(quiz => {
            const userObj = this.getUser(user.id)
            const studentsObjArr = quiz.students.map(student=>userObj.getStudent(student.id));
            const questionObjArr = quiz.questions.map(question => new Question(question));
            const quizObj = new Quiz(quiz);
            quizObj.import({
                quizTitle: quiz.quizTitle,
                description: quiz.description,
                questions: questionObjArr,
                students: studentsObjArr
            })
            userObj.addOrUpdateQuiz(quizObj);
        }))
    },
    createAuthToken: (userId) => {
        const authToken = idUtils(40);
        data.storeNewAuthToken(authToken, userId);
        return authToken;
    },
    checkAuthToken: (authToken) => {
        return data.checkAuthTokenValidity(authToken);
    }
}