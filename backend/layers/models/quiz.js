const Unique = require("./unique");

class Quiz extends Unique {

    name;
    description;
    #questions = [];
    #students = [];

    constructor (parameters){
        const {name, description, id} = parameters
        super(id);
        this.name = name;
        this.description = description;
    }
    import(data){
        this.name = data.name;
        this.#questions = data.questions;
        this.#students = data.students;
    }
    export(){
        return {
            name: this.name,
            id: super.id,
            questions: this.#questions.map(question=>question.export()),
            students: this.#students.map(student=>student.export())
        }
    }
    getQuestion(questionId){
        return this.#questions.filter(question=>question.id == questionId)[0];
    }
    getAllQuestions(){
        return [...this.#questions];
    }
    addOrUpdateQuestion(newQuestion){
        const questionIndex = this.#questions.map(question=>question.id).indexOf(newQuestion.id);
        if (questionIndex == -1) {
            this.#questions.push(newQuestion);
        } else {
            this.#questions[questionIndex] = newQuestion;
        }
    }
    addQuestions(questionsArr){
        this.#questions = [...this.#questions, ...questionsArr];
    }
    deleteQuestion(questionId){
        this.#questions = this.#questions.filter(question=>question.id != questionId);
    }
    enrollStudent(newStudent){
         if (!this.#students.map(student=>student.id).includes(newStudent.id)){
            this.#students.push(newStudent);
        }
    }
    addStudents(studentArr){
        this.#students = [...this.#students, ...studentArr]
    }
    getAllStudents(){
        return [...this.#students];
    }
}

module.exports = Quiz;