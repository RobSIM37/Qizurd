const quizServices = require("../services/quizServices");
const data = require("../data/data");

module.exports = {
    addOrUpdateQuiz: (req, res) => {
        const reqData = req.body;
        if (data.isKnownId(reqData.userId)) {
            try {
                const addedQuiz = quizServices.addOrUpdateQuiz(reqData);
                if (addedQuiz) {
                    const allQuizzes = quizServices.getAllQuizzes(reqData.userId);
                    res.status(200).send(allQuizzes.map(quiz=>quiz.export()));
                } else {
                    res.status(400).send({message:"unable to add quiz with information provided"});
                }
            } catch (err){ 
                console.log(err)
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to add quiz with information provided"});
        }
    },

   getQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const requestedQuiz = quizServices.getQuiz(userId, quizId);
                if (requestedQuiz) {
                    res.status(200).send(requestedQuiz.export());
                } else {
                    res.status(400).send({message:"unable to provide quiz with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to provide quiz with the information provided"});
        }
   },
   
   getAllQuizzes: (req, res) => {
        const userId = req.params.userId;
        if (data.isKnownId(userId)) {
            try {
                const requestedQuizzes = quizServices.getAllQuizzes(userId);
                if (requestedQuizzes) {
                    res.status(200).send(requestedQuizzes.map(quiz=>quiz.export()));
                } else {
                    res.status(400).send({message:"unable to provide quizzes with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to provide quizzes with the information provided"});
        }
   },

   deleteQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const deletedQuiz = quizServices.deleteQuiz(userId, quizId);
                if (deletedQuiz) {
                    const remainingQuizzes = quizServices.getAllQuizzes(userId);
                    res.status(200).send(remainingQuizzes.map(quiz=>quiz.export()));
                } else {
                    res.status(400).send({message:"unable to delete quiz with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to delete quiz with the information provided"});
        }
   },

   addOrUpdateQuestion: (req, res) => {
        const reqData = req.body;
        const userId = reqData.userId;
        const quizId = reqData.quizId;
        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const addedQuestion = quizServices.addOrUpdateQuestion(userId, quizId, reqData);
                if (addedQuestion) {
                    res.status(200).send(addedQuestion.export());
                } else {
                    res.status(400).send({message:"unable to add question with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to add question with the information provided"});
        }
   },

   getQuestion: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const questionId = req.params.questionId;

        if (data.isKnownId(userId) && data.isKnownId(quizId) && data.isKnownId(questionId)) {
            try {
                const requestedQuestion = quizServices.getQuestion(userId, quizId, questionId);
                if (requestedQuestion) {
                    res.status(200).send(requestedQuestion.export());
                } else {
                    res.status(400).send({message:"unable to return question with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to return question with the information provided"});
        }
   },

   getRandomQuestionForStudent: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const studentId = req.params.studentId;
        if (data.isKnownId(userId) && data.isKnownId(quizId) && data.isKnownId(studentId)) {
            try {
                const requestedQuestion = quizServices.getRandomQuestionForStudent(userId, quizId, studentId);
                if (requestedQuestion) {
                    res.status(200).send(requestedQuestion.export());
                } else {
                    res.status(400).send({message:"unable to return question with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to return question with the information provided"});
        }
   },

   deleteQuestion: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const questionId = req.params.questionId;

        if (data.isKnownId(userId) && data.isKnownId(quizId) && data.isKnownId(questionId)) {
            try {
                const deletedQuestion = quizServices.deleteQuestion(userId, quizId, questionId);
                if (deletedQuestion) {
                    const remainingQuestions = quizServices.getAllQuestions(userId, quizId)
                    res.status(200).send(remainingQuestions.map(question=>question.export()));
                } else {
                    res.status(400).send({message:"unable to return question with the information provided"});
                }
            } catch {
                res.status(500).send({message:"an unknown server error has prevented this transaction"});
            }
        } else {
            res.status(400).send({message:"unable to return question with the information provided"});
        }
   }
}