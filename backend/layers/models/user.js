const Unique = require("./unique");

class User extends Unique {
    userName;
    #quizzes = [];
    #students = [];
    constructor (parameters){
        console.log("parameters:",parameters)
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
            id: super.id,
            id: super.id,
            quizzes: this.#quizzes.map(quiz=>quiz.export()),
            students: this.#students.map(student=>student.export())
        }
    }
    addOrUpdateQuiz(incommingQuiz){
        const quizIndex = this.#quizzes.map(quiz=>quiz.id).indexOf(incommingQuiz.id)
        if (quizIndex == -1) {
            this.#quizzes.push(quiz);
        } else {
            this.#quizzes[quizIndex] = incommingQuiz;
        }
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
    addOrUpdateStudent(newStudent){
        const studentIndex = this.#students.map(student => student.id).indexOf(newStudent.id);
        if (studentIndex == -1){
            this.#students.push(newStudent);
        } else {
            this.#students[studentIndex] = newStudent;
        }
    }
    deleteStudent(studentId){
        this.#students = this.#students.filter(student => student.id != studentId);
    }
    getStudent(studentId){
        return this.#students.filter(student=>student.id == studentId)[0];
    }
    getAllStudents(){
        return [...this.#students];
    }
}

module.exports = User;