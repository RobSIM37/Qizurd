const userServices = require("../services/userServices");
const quizServices = require("../services/quizServices");

module.exports = {
    addOrUpdateQuiz: async (req, res) => {
        const {userId, id, questions, students, quizTitle, description} = req.body;
        if (!userId) res.status(400).send({ message: "unable to add/update quiz" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            if (!user) res.status(400).send({ message: "unable to add/update quiz" });
            const quiz = quizServices.buildQuiz({id, quizTitle, description, questions, students});
            userServices.addOrUpdateQuiz(user,quiz);
            userServices.updateUser(user);
            res.status(200).send(user.quizzes);
        }
        catch (err) {
            console.log(err)
            res.status(400).send({ message: "unable to add/update quiz" });
        }
    },
    getQuiz: async (req, res) => {
        const {userId, quizId} = req.params;
        if (!userId || !quizId) res.status(400).send({ message: "unable to get quiz" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            const quiz = user.quizzes.filter(existingQuiz => existingQuiz.id === quizId)[0];
            if (!quiz) res.status(400).send({ message: "unable to get quiz" });
            res.status(200).send(quiz);
        }
        catch {
            res.status(400).send({ message: "unable to get quiz" });
        }
    },
    getAllQuizzes: async (req, res) => {
        const {userId} = req.params;
        if (!userId) res.status(400).send({ message: "unable to get quizzes" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            res.status(200).send(user.quizzes);
        }
        catch {
            res.status(400).send({ message: "unable to get quizzes" });
        }
    },
    deleteQuiz: async (req, res) => {
        const {userId, quizId} = req.params;
        if (!userId || !quizId) res.status(400).send({ message: "unable to delete quiz" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            user.quizzes = user.quizzes.filter(quiz => quiz.id !== quizId);
            userServices.updateUser(user);
            res.status(200).send(user.quizzes);
        }
        catch {
            res.status(400).send({ message: "unable to delete quiz" });
        }
    },
    getRankedListOfStudents: async (req, res) => {
        const {userId, quizId} = req.params;
        if (!userId || !quizId) res.status(400).send({ message: "unable to get students" });
        try {
            const user = userServices.getUserBy({"_id": userId});
            if (!user) res.status(400).send({ message: "unable to get students" });
            const quiz = user.quizzes.filter(existingQuiz => existingQuiz.id === quizId)[0];
            if (!quiz) res.status(400).send({ message: "unable to get students" });
            const sortedStudents = quiz.students.sort((a,b) => a.completion - b.completion);
            res.status(200).send(sortedStudents);
        }
        catch {
            res.status(400).send({ message: "unable to get students" });
        }
    },
    getQuestion: async (req, res) => {
        const {userId,quizId,questionId} = req.params;
        if (!userId || !quizId || !questionId) res.status(400).send({ message: "unable to get question" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            if (!user) res.status(400).send({ message: "unable to get question" });
            const quiz = user.quizzes.filter(existingQuiz => existingQuiz.id === quizId)[0];
            if (!quiz) res.status(400).send({ message: "unable to get question" });
            const question = quiz.questions.filter(existingQuestion=>existingQuestion.id === questionId)[0];
            if (!question) res.status(400).send({ message: "unable to get question" });
            res.status(200).send(question);
        }
        catch {
            res.status(400).send({ message: "unable to get question" });
        }
    },
    getRandomQuestionForStudent: async (req, res) => {
        const {userId,quizId,studentId} = req.params;
        if (!userId || !quizId || !studentId) res.status(400).send({ message: "unable to get question" });
        try {
            const user = await userServices.getUserBy({"_id": userId});
            if (!user) res.status(400).send({ message: "unable to get question" });
            const quiz = user.quizzes.filter(existingQuiz => existingQuiz.id === quizId)[0];
            if (!quiz) res.status(400).send({ message: "unable to get question" });
            const student = quiz.students.filter(existingStudents=>existingStudents.id === studentId)[0];
            if (!student) res.status(400).send({ message: "unable to get question" });
            const question = quizServices.getRandomQuestion(quiz, student);
            res.status(200).send(question);
        }
        catch {
            res.status(400).send({ message: "unable to get question" });
        }
    }
}