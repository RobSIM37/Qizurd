const Unique = require("./unique");

export class Question extends Unique {
    
    questionText;
    answer;
    wrongAnswer;
    constructor (parameters){
        const {questionText,answer,wrongAnswer,id} = parameters;
        super(id);
        this.questionText = questionText;
        this.answer = answer;
        this.wrongAnswer = wrongAnswer;
    }
    export(){
        return {
            text: this.questionText,
            id: this.#uuid,
            answer: this.answer,
            wrongAnswer: this.wrongAnswer
        }
    }
}