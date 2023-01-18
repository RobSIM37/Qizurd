const Unique = require("./unique");

export class Question extends Unique {
    
    questionText;
    answer;
    wrongAnswer;
    constructor (parameters){
        const {questionText,answer,wrongAnswer,existingId} = parameters;
        super(existingId);
        this.questionText = questionText;
        this.answer = answer;
        this.wrongAnswer = wrongAnswer;
    }
}