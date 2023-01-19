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
    import(data){
        this.userName = data.userName;
        this.#quizzes = data.quizzes;
        this.#students = data.students;
    }
    addQuiz(quiz){
        this.#quizzes.push(quiz);
    }
    addStudent(student){
        this.#students.push(student);
    }
}