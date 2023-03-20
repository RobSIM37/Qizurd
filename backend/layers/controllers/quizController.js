const quizServices = require("../services/quizServices");

module.exports = {
    addOrUpdateQuiz: (req, res) => {
        const reqData = req.body;
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
    },
   getQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

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
   },
   getAllQuizzes: (req, res) => {
        const userId = req.params.userId;
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
   },
   deleteQuiz: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        try {
            const deletedQuiz = quizServices.deleteQuiz(userId, quizId);
            if (deletedQuiz) {
                const remainingQuizzes = quizServices.getAllQuizzes(userId);
                res.status(200).send(remainingQuizzes.map(quiz=>quiz.export()));
            } else {
                res.status(400).send({message:"unable to delete quiz with the information provided"});
            }
        } catch (err){
            console.log(err);
            res.status(500).send({message:"an unknown server error has prevented this transaction"});
        }
   },
   addOrUpdateQuestion: (req, res) => {
        const reqData = req.body;
        const userId = reqData.userId;
        const quizId = reqData.quizId;
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
   },
   getQuestion: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const questionId = req.params.questionId;

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
   },
   getRandomQuestionForStudent: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const studentId = req.params.studentId;
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
   },
   deleteQuestion: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;
        const questionId = req.params.questionId;

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
   },
   getRankedListOfStudents: (req, res) => {
        const userId = req.params.userId;
        const quizId = req.params.quizId;

        try {
            const students = quizServices.getRankedListOfStudents(userId, quizId);
            if (students) {
                res.status(200).send(students.map(student=>
                    {return {...student.export(),
                                complete: quizServices.completePercentage(userId,quizId,student.id)}
                    }));
            } else {
                res.status(400).send({message:"unable to return students with the information provided"});
            }
        } catch {
            res.status(500).send({message:"an unknown server error has prevented this transaction"});
        }
   }
}