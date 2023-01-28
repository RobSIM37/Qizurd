const Unique = require("./unique");

class Student extends Unique {
    firstName;
    lastName;
    #results = [];
    
    constructor (parameters){
        const {firstName, lastName, id} = parameters
        super(id);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    import(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.#results = data.results;
    }
    export() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            id: super.id,
            results: this.#results
        }
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

module.exports = Student