const userServices = require("../services/userServices");
const Quiz = require("../models/quiz");
const Question = require("../models/question");

module.exports = {
    addQuiz: (userId, quizName) => {
        const user = userServices.getUser(userId);
        const newQuiz = new Quiz({name: quizName});
        user.addQuiz(newQuiz);
        return newQuiz;
    },
    getQuiz: (userId, quizId) => {
        const user = userServices.getUser(userId);
        return user.getQuiz(quizId);
    },
    getAllQuizzes: (userId) => {
        const user = userServices.getUser(userId);
        return user.getAllQuizzes();
    },
    deleteQuiz: (userId, quizId) => {
        const user = userServices.getUser(userId);
        user.deleteQuiz(quizId);
        return true;
    },
    addOrUpdateQuestion: (userId, quizId, questionData) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        const newQuestion = new Question(questionData);
        quiz.updateQuestion(newQuestion);
        return newQuestion
    },
    getQuestion: (userId, quizId, questionId) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        return quiz.getQuestion(questionId);
    },
    deleteQuestion: (userId, quizId, questionId) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        quiz.deleteQuestion(questionId);
        return true;
    }
}