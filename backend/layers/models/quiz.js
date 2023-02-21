const Unique = require("./unique");

class Quiz extends Unique {

    quizTitle;
    description;
    #questions = [];
    #students = [];

    constructor (parameters){
        const {quizTitle, description, id} = parameters
        super(id);
        this.quizTitle = quizTitle;
        this.description = description;
    }
    import(data){
        this.quizTitle = data.quizTitle;
        this.description = data.description;
        this.#questions = data.questions;
        this.#students = data.students;
    }
    export(){
        return {
            quizTitle: this.quizTitle,
            description: this.description,
            id: super.id,
            questions: this.#questions.map(question=>question.export()),
            students: this.#students.map(student=>student.export(this))
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
    updateStudent(updatedStudent){
        const updatedStudentIndex = this.#students.map(student=>student.id).indexOf(updatedStudent.id);
        this.#students[updatedStudentIndex] = updatedStudent;
    }
    dropStudent(studentId){
        this.#students = this.#students.filter(student => student.id != studentId);
    }
    addStudents(studentArr){
        this.#students = [...this.#students, ...studentArr]
    }
    getAllStudents(){
        return [...this.#students];
    }
    getAllStudentsRanked(){
        return [...this.#students].sort(
            (a,b) => a.getCorrectQuizResults(super.id).length
                    - b.getCorrectQuizResults(super.id).length
        )
    }
}

module.exports = Quiz;