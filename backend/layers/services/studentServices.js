const userServices = require("./userServices");
const Student = require("../models/student");

module.exports = {
    addOrUpdateStudent: (userId, studentData) => {
        console.log("student data:",studentData)
        const user = userServices.getUserBy("_id",userId);
        const newStudent = new Student(studentData);
        user.addOrUpdateStudent(newStudent);
        return true;
    },
    deleteStudent: (userId, studentId) => {
        const user = userServices.getUserBy("_id",userId);
        user.deleteStudent(studentId);
        return true;
    },
    getStudent: (userId, studentId) => {
        const user = userServices.getUserBy("_id",userId);
        return user.getStudent(studentId);
    },
    getAllStudents: (userId) => {
        const user = userServices.getUserBy("_id",userId);
        return user.getAllStudents();
    },
    getAllStudentsInQuiz: (userId, quizId, sorted) => {
        const user = userServices.getUserBy("_id",userId);
        const quiz = user.getQuiz(quizId);
        if (sorted) {
            return this.sortStudentsByOutstandingQuizQuestions(quiz.getAllStudents(), quizId)
        } else {
            return quiz.getAllStudents();
        }
    },
    sortStudentsByOutstandingQuizQuestions: (students, quizId) => {
        return students.sort((studentA, studentB) => 
            studentA.getCorrectQuizResults(quizId).length - studentB.getCorrectQuizResults(quizId).length)
    },
    logStudentAnswer: (userId, studentId, quizId, questionId, correct) => {
        const user = userServices.getUserBy("_id",userId);
        const student = user.getStudent(studentId);
        student.logQuestionResult(quizId, questionId, correct);
        return true;
    }
}