import { deleteQuiz } from "../controllers/quizController";

const Unique = require("./unique");

export class User extends Unique {
    userName;
    #quizzes = [];
    #students = [];
    constructor (parameters){
        const {userName, id} = parameters;
        super(id);
        this.userName = userName;
    }
    import(data){
        this.userName = data.userName;
        this.#quizzes = data.quizzes;
        this.#students = data.students;
    }
    export(){
        return {
            userName: this.userName,
            id: this.#uuid,
            quizzes: this.#quizzes.map(quiz=>quiz.export()),
            students: this.#students.map(student=>student.export())
        }
    }
    addQuiz(quiz){
        this.#quizzes.push(quiz);
    }
    getQuiz(quizId){
        return this.#quizzes.filter(quiz=>quiz.id == quizId)[0];
    }
    getAllQuizzes(){
        return [...this.#quizzes];
    }
    deleteQuiz(quizId){
        this.#quizzes = this.#quizzes.filter(quiz=>quiz.id != quizId);
    }
    addStudent(student){
        this.#students.push(student);
    }
}