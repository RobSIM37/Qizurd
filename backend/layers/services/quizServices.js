const userServices = require("./userServices");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const arrUtil = require("../../utils/arrayUtils");

module.exports = {
    addOrUpdateQuiz: (reqData) => {
        const user = userServices.getUserBy("_id",reqData.userId);
        const quiz = new Quiz(reqData);
        quiz.addStudents(reqData.students.map(student => user.getStudent(student.id)));
        quiz.addQuestions(reqData.questions.map(question => new Question(question)));
        user.addOrUpdateQuiz(quiz);
        userServices.updateUser(user.export("_id"))
        return true;
    },
    getQuiz: (userId, quizId) => {
        const user = userServices.getUserBy("_id",userId);
        return user.getQuiz(quizId);
    },
    getAllQuizzes: (userId) => {
        const user = userServices.getUserBy("_id",userId);
        return user.getAllQuizzes();
    },
    deleteQuiz: (userId, quizId) => {
        const user = userServices.getUserBy("_id",userId);
        user.deleteQuiz(quizId);
        userServices.updateUser(user.export("_id"))
        return true;
    },
    addOrUpdateQuestion: (userId, quizId, questionData) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        const newQuestion = new Question(questionData);
        quiz.addOrUpdateQuestion(newQuestion);
        userServices.updateUser(user.export("_id"))
        return newQuestion
    },
    getQuestion: (userId, quizId, questionId) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        return quiz.getQuestion(questionId);
    },
    deleteQuestion: (userId, quizId, questionId) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        quiz.deleteQuestion(questionId);
        userServices.updateUser(user.export("_id"))
        return true;
    },
    getAllQuestions: (userId, quizId) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        return quiz.getAllQuestions();
    },
    getRandomQuestionForStudent: (userId, quizId, studentId) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        const student = user.getStudent(studentId);
        const correctQuestionIds = student.getCorrectQuizResults(quizId).map(result=>result.questionId);
        const allQuestions = quiz.getAllQuestions();
        let outstandingQuestionsForStudent = allQuestions.filter(question=>!correctQuestionIds.includes(question.id));
        if (outstandingQuestionsForStudent.length == 0) {
            outstandingQuestionsForStudent = allQuestions;
        }
        const randomIndex = arrUtil.getRandomArrayIndex(outstandingQuestionsForStudent);
        return outstandingQuestionsForStudent[randomIndex];
    },
    getRankedListOfStudents: (userId, quizId) => {
        const user = userServices.getUserBy("_id",userId)
        const quiz = user.getQuiz(quizId);
        return quiz.getAllStudentsRanked();
    },
    completePercentage: (userId, quizId, studentId) => {
        const user = userServices.getUserBy("_id",userId)
        const quiz = user.getQuiz(quizId);
        const student = user.getStudent(studentId);
        return Math.floor(student.getCorrectQuizResults(quizId).length / quiz.getAllQuestions().length);
    }
}