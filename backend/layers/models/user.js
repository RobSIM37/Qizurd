const Unique = require("./unique");

export class User extends Unique {
    userName;
    #quizzes = [];
    #students = [];
    constructor (parameters){
        const {userName, existingId} = parameters;
        super(existingId);
        this.userName = userName;
    }
    addQuiz(quiz){
        this.#quizzes.push(quiz);
    }
    addStudent(student){
        this.#students.push(student);
    }
}