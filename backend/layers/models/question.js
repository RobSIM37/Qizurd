const Unique = require("./unique");

export class Question extends Unique {
    
    questionText;
    answer;
    wrongAnswer;
    constructor (questionText,answer,wrongAnswer){
        super();
        if (questionText) {
            this.questionText = questionText;
        }
        if (answer) {
            this.answer = answer;
        }
        if (wrongAnswer) {
            this.wrongAnswer = wrongAnswer;
        }
    }
}