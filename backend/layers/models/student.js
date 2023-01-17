const Unique = require("./unique");

export class Student extends Unique {
    firstName;
    lastName;
    #results = [];
    
    constructor (firstName, lastName) {
        super();
        if (firstName) {
            this.firstName = firstName;
        }
        if (lastName) {
            this.lastName = lastName;
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