const Unique = require("./unique");

export class Student extends Unique {
    firstName;
    lastName;
    #results = [];
    
    constructor (parameters){
        const {firstName, lastName, existingId} = parameters
        super(existingId);
        this.firstName = firstName;
        this.lastName = lastName;
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