const userServices = require("../services/userServices");
const idUtils = require("../../utils/idUtils");
const quizServices = require("../services/quizServices");

module.exports = {
    addOrUpdateStudent: async (req, res) => {
        const {userId, firstName, lastName, id, results} = req.body;
        if (!userId) res.status(400).send({ message: "unable to add/update student" });
        try {
            const user = await userServices.getUserBy({"_id":userId});
            const student = {
                id, firstName, lastName, results
            }
            if (!student.id) {
                student.id = idUtils();
            }
            userServices.addOrUpdateStudent(user, student);
            user.quizzes.forEach(quiz => quizServices.updateStudent(quiz,student));
            userServices.updateUser(user);
            res.status(200).send(user);
        }
        catch (err) {
            res.status(400).send({ message: "unable to add/update student" });
        }
    },
    deleteStudent: async (req, res) => {
        const {userId, studentId} = req.params;
        if (!userId) res.status(400).send({ message: "unable to delete student"});
        try {
            const user = await userServices.getUserBy({"_id": userId});
            user.students = user.students.filter(userStudent => userStudent.id !== studentId)
            user.quizzes.forEach(quiz=>quizServices.deleteStudent(quiz,studentId));
            userServices.updateUser(user);
            res.status(200).send(user);
        }
        catch {
            res.status(400).send({ message: "unable to delete student"})
        }
    },
    allStudents: async (req, res) => {
        const {userId} = req.params;
        if (!userId) res.status(400).send({ message: "unable to get students"});
        try {
            const user = await userServices.getUserBy({"_id": userId});
            res.status(200).send(user.students);
        }
        catch {
            res.status(400).send({ message: "unable to get students"})
        }
    },
    logStudentAnswer: async (req, res) => {
        const {userId, quizId, questionId, studentId, correct} = req.body;
        if (!userId) res.status(400).send({ message: "unable to log answer"});
        try {
            const user = await userServices.getUserBy({"_id": userId});
            const quiz = user.quizzes.filter(quiz=>quiz.id === quizId)[0];
            if (!quiz) res.status(400).send({ message: "unable to log answer"})
            const student = quiz.students.filter(students => students.id === studentId)[0];
            if (!student) res.status(400).send({ message: "unable to log answer"})
            student.results.push({quizId, questionId, correct});
            quizServices.calculateStudentCompletion(quiz, student);
            userServices.updateUser(user);
            res.status(200).send(user)
        }
        catch {
            res.status(400).send({ message: "unable to log answer"})
        }
    }
}