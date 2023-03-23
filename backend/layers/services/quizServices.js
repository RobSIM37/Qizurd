const { getRandomArrayIndex } = require("../../utils/arrayUtils");

module.exports = {
    updateStudent: (quiz, student) => {
        const studentIndex = quiz.students.map(quizStudent => quizStudent.id).indexOf(student.id);
        if (studentIndex != -1) {
            quiz.students[studentIndex] = student;
        }
    },
    deleteStudent: (quiz, studentId) => {
        quiz.students = quiz.students.filter(student=>student.id !== studentId);
    },
    calculateStudentCompletion: (quiz, student) => {
        const correctAnswerCount = student.results.reduce((count, current)=>{
            current.quizId === quiz.id && current.correct ? ++count : count},0);
        student["completion"] = Math.floor(correctAnswerCount / quiz.questions.length * 100)
    },
    getRandomQuestion: (quiz, student) => {
        const correctQuestionIds = student.results.filter(result => result.correct).map(result => result.questionId);
        const availableQuestions = quiz.questions.filter(question=>correctQuestionIds.includes(question.id));
        const randomQuestionIndex = getRandomArrayIndex(availableQuestions);
        return availableQuestions[randomQuestionIndex];
    }
}