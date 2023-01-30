const userServices = require("./userServices");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const arrUtil = require("../../utils/arrayUtils");
module.exports = {
    addOrEditQuiz: (userId, quizData) => {
        const user = userServices.getUser(userId);
        const quiz = new Quiz(quizData);
        user.addOrEditQuiz(quiz);
        return true;
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
        quiz.addOrUpdateQuestion(newQuestion);
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
    },
    getAllQuestions: (userId, quizId) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        return quiz.getAllQuestions();
    },
    enrollStudent: (userId, quizId, studentId) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        const student = user.getStudent(studentId);
        quiz.enrollStudent(student);
        return true;
    },
    getRandomQuestionForStudent: (userId, quizId, studentId) => {
        const user = userServices.getUser(userId);
        const quiz = user.getQuiz(quizId);
        const student = user.getStudent(studentId);
        const correctQuestionIds = student.getCorrectQuizResults(quizId).map(result=>result.questionId);
        const allQuestions = quiz.getAllQuestions();
        const outstandingQuestionsForStudent = allQuestions.filter(question=>!correctQuestionIds.includes(question.id));
        const randomIndex = arrUtil.getRandomArrayIndex(outstandingQuestionsForStudent);
        return outstandingQuestionsForStudent[randomIndex];
    }
}