const quizServices = require("../services/quizServices");
const data = require("../data/data");

module.exports = {
    addQuiz: (req, res) => {
        const reqData = JSON.parse(req.body);
        if (data.isKnownId(reqData.userId)) {
            try {
                const addedQuiz = quizServices.addQuiz(reqData.userId, reqData.quizName);
                if (addedQuiz) {
                    res.status(200).send(JSON.stringify(addedQuiz.export()));
                } else {
                    res.status(400).send("unable to add quiz with information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to add quiz with information provided");
        }
    },

   getQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const requestedQuiz = quizServices.getQuiz(userId, quizId);
                if (requestedQuiz) {
                    res.status(200).send(JSON.stringify(requestedQuiz.export()));
                } else {
                    res.status(400).send("unable to provide quiz with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to provide quiz with the information provided");
        }
   },
   
   getAllQuizzes: (req, res) => {
        const userId = req.params.userId;
        if (data.isKnownId(userId)) {
            try {
                const requestedQuizzes = quizServices.getAllQuizzes(userId);
                if (requestedQuizzes) {
                    res.status(200).send(JSON.stringify(requestedQuizzes.map(quiz=>quiz.export())));
                } else {
                    res.status(400).send("unable to provide quizzes with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to provide quizzes with the information provided")
        }
   },

   deleteQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const deletedQuiz = quizServices.deleteQuiz(userId, quizId);
                if (deletedQuiz) {
                    res.status(200).send();
                } else {
                    res.status(400).send("unable to delete quiz with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to delete quiz with the information provided");
        }
   },

   addOrUpdateQuestion: (req, res) => {
        const reqData = JSON.parse(req.body);
        const userId = reqData.userId;
        const quizId = reqData.quizId;
        if (data.isKnownId(userId) && data.isKnownId(quizId)) {
            try {
                const addedQuestion = quizServices.addOrUpdateQuestion(userId, quizId, reqData);
                if (addedQuestion) {
                    res.status(200).send(JSON.stringify(addedQuestion.export()));
                } else {
                    res.status(400).send("unable to add question with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to add question with the information provided");
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
                    res.status(200).send(JSON.stringify(requestedQuestion.export()));
                } else {
                    res.status(400).send("unable to return question with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to return question with the information provided");
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
                    res.status(200).send();
                } else {
                    res.status(400).send("unable to return question with the information provided");
                }
            } catch {
                res.status(500).send("an unknown server error has prevented this transaction");
            }
        } else {
            res.status(400).send("unable to return question with the information provided");
        }
   }
}