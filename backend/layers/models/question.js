const Unique = require("./unique");

class Question extends Unique {
    
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
            id: super.id,
            answer: this.answer,
            wrongAnswer: this.wrongAnswer
        }
    }
}

module.exports = Question