const Unique = require("./unique");

class Student extends Unique {
    firstName;
    lastName;
    #results = [];
    
    constructor (parameters){
        const {firstName, lastName, id, results} = parameters;
        super(id);
        this.firstName = firstName;
        this.lastName = lastName;
        if (results) {
            this.#results = results;
        }
    }
    import(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.#results = data.results;
    }
    export(quiz=null) {
        const exportData = {
            firstName: this.firstName,
            lastName: this.lastName,
            id: super.id,
            results: this.#results
        }
        if (quiz) {
            exportData["completion"] = Math.floor(
                this.getCorrectQuizResults(quiz.id).length / quiz.getAllQuestions().length * 100
                )
        }
        return exportData;
    }
    logQuestionResult (quizId, questionId, correct) {
        this.#results.push({quizId, questionId, correct});
    }
    getAllQuizResults (quizId) {
        return this.#results.filter(result=>result.quizId == quizId);
    }
    getCorrectQuizResults (quizId) {
        return this.getAllQuizResults(quizId).filter(result=>result.correct);
    }
}

module.exports = Student;