const Unique = require("./unique");
const Quiz = require("./quiz");
const Student = require("./student");

class User extends Unique {
    name;
    #quizzes = [];
    #students = [];
    constructor (parameters){
        const {name, id, _id, quizzes, students} = parameters;
        if (_id) {
            super(_id);
        } else {
            super(id);
        }
        this.name = name;
        if (quizzes) {
            this.#quizzes = quizzes.map(quizData => new Quiz(quizData));
        }
        if (students) {
            this.#students = students.map(studentData => new Student(studentData));
        }
    }
    import(data){
        this.name = data.name;
        this.#quizzes = data.quizzes;
        this.#students = data.students;
    }
    export(idKey = "id"){
        const userData = {
            name: this.name,
            quizzes: this.#quizzes.map(quiz=>quiz.export()),
            students: this.#students.map(student=>student.export())
        }
        userData[idKey] = super.id;
        return userData;
    }
    addOrUpdateQuiz(incommingQuiz){
        const quizIndex = this.#quizzes.map(quiz=>quiz.id).indexOf(incommingQuiz.id)
        if (quizIndex == -1) {
            this.#quizzes.push(incommingQuiz);
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