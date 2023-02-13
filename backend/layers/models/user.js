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
        console.log("quizzes:",this.#quizzes)
        console.log("quiz count:", this.#quizzes.length, "student count:", this.#students.length)
        const userData = {
            name: this.name,
            quizzes: this.#quizzes.map(quiz=>quiz.export()),
            students: this.#students.map(student=>student.export())
        }
        userData[idKey] = super.id;
        return userData;
    }
    addOrUpdateQuiz(incomingQuiz){
        console.log("incoming quiz:", incomingQuiz)
        const quizIndex = this.#quizzes.map(quiz=>quiz.id).indexOf(incomingQuiz.id)
        if (quizIndex == -1) {
            this.#quizzes.push(incomingQuiz);
        } else {
            this.#quizzes[quizIndex] = incomingQuiz;
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
            this.#quizzes = this.#quizzes.map(quiz => quiz.updateStudent(newStudent));
        }
    }
    deleteStudent(studentId){
        this.#students = this.#students.filter(student => student.id != studentId);
        this.#quizzes = this.#quizzes.map(quiz => quiz.dropStudent(studentId))
    }
    getStudent(studentId){
        return this.#students.filter(student=>student.id == studentId)[0];
    }
    getAllStudents(){
        return [...this.#students];
    }
}

module.exports = User;