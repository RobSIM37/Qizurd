const userServices = require("./userServices");
const Student = require("../models/student");

module.exports = {
    addOrEditStudent: (userId, studentData) => {
        const user = userServices.getUser(userId);
        const newStudent = new Student(studentData);
        user.addStudent(newStudent);
        return newStudent;
    },
    deleteStudent: (userId, studentId) => {
        const user = userServices.getUser(userId);
        user.deleteStudent(studentId);
        return true;
    },
    getStudent: (userId, studentId) => {
        const user = userServices.getUser(userId);
        return user.getStudent(studentId);
    },
    getAllStudents: (userId) => {
        const user = userServices.getUser(userId);
        return user.getAllStudents();
    },
    getAllStudentsInQuiz: (userId, quizId, sorted) => {
        const user = userServices.getUser(userId);
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
    }
}