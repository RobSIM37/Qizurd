import axios from "axios"
import {
    CHANGE_TEXT,
    CHANGE_QUIZ_TEXT,
    ACTIVE_USER,
    FILL_QUIZ_STATE,
    FILL_STUDENT_STATE,
    CARD_CLICKED,
    ADD_STUDENT_TO_QUIZ,
    ADD_QUIZ_TO_USER,
    DELETE_QUIZ,
    DELETE_STUDENT_FROM_QUIZ,
    EDIT_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION,
    CLEAR_QUIZ_FORM,
    CLEAR_STUDENT_FORM,
    ADD_STUDENT_TO_USER,
    FILL_STUDENT_FORM,
    FILL_QUIZ_FORM,
    DELETE_QUESTION_FROM_QUIZ
} from "./action-types"


export const postQuiz = (quiz) => dispatch => {
    axios.post("http://localhost:8025/quizzes",quiz).then(res => {
        console.log("here", res.data)
        dispatch({type:ADD_QUIZ_TO_USER,payload:res.data})
    }).catch(err => console.log(err))
}

export const postStudent = (student) => dispatch => {
    axios.post("http://localhost:8025/students",student).then(res => {
        dispatch({type:ADD_STUDENT_TO_USER,payload:res.data})
    }).catch(err => console.log(err))
}

export const activeUser = (user) => {
    return {type: ACTIVE_USER, payload: user}
}

export const fillQuizState = (quizzes) => {
    return {type: FILL_QUIZ_STATE, payload: quizzes}
}

export const fillStudentState = (students) => {
    return {type: FILL_STUDENT_STATE, payload: students}
}

export const changeInputText = (inputid,inputValue) =>  {
    return {type: CHANGE_TEXT, payload: {inputid,inputValue}}
}

export const changeQuizText = (inputid,inputValue) => {
    return {type:CHANGE_QUIZ_TEXT, payload:{inputid,inputValue}}
}

export const cardClicked = (id) => {
    return {type: CARD_CLICKED,payload: id}
}

export const addStudentToQuiz = (student) => {
    return {type: ADD_STUDENT_TO_QUIZ,payload:student}
}

export const addQuizQuestion = () => {
    return {type:ADD_QUIZ_QUESTION}
}

export const editQuizQuestion = (id,inputType,inputValue) => {
    return {type: EDIT_QUIZ_QUESTION, payload: {id,inputType,inputValue}}
}

export const deleteQuiz = (quizid) => {
    return {type: DELETE_QUIZ,payload:quizid}
}

export const deleteStudentFromQuiz = (studentid) => {
    return {type: DELETE_STUDENT_FROM_QUIZ,payload:studentid}
}

export const deleteQuestionFromQuiz = (quizRenderId) => {
    return {type:DELETE_QUESTION_FROM_QUIZ,payload:quizRenderId}
}

export const clearQuizForm = () => {
    return {type: CLEAR_QUIZ_FORM}
}

export const clearStudentForm = () => {
    return {type:CLEAR_STUDENT_FORM}
}

export const fillStudentForm = (student) => {
    return {type:FILL_STUDENT_FORM,payload:student}
}

export const fillQuizForm = (quiz) => {
    return {type:FILL_QUIZ_FORM,payload:quiz}
}