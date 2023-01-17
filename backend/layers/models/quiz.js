const Unique = require("./unique");

export class Quiz extends Unique {
    name;

    #questions = [];
    #students = [];

    constructor (name){
        super();
        if (name) {
            this.name = name;
        }
    }

    addQuestion(newQuestion){
        if (!this.#questions.map(question => question.id).includes(newQuestion.id)){
            this.#questions.push(newQuestion);
        }
    }

    enrollStudent(newStudent){
        if (!this.#students.map(student=>student.id).includes(newStudent.id)){
            this.#students.push(newStudent);
        }
    }
}