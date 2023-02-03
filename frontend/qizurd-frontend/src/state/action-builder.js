import axios from "axios"
import {
    CHANGE_TEXT,
    ACTIVE_USER,
    FILL_QUIZ_STATE,
    FILL_STUDENT_STATE,
    CARD_CLICKED,
    TOGGLE_MENU,
    ADD_STUDENT_TO_QUIZ,
    DELETE_QUIZ,
    DELETE_STUDENT_FROM_QUIZ,
    EDIT_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION,
    CLEAR_QUIZ_FORM,
    ADD_STUDENT_TO_USER
} from "./action-types"


export const postQuiz = (userid,quiz) => dispatch => {
    axios.post("http://localhost:8025/quizzes")
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

export const cardClicked = (id) => {
    return {type: CARD_CLICKED,payload: id}
}

export const menuToggle = (boolToChangeTo) => {
    return {type: TOGGLE_MENU,payload:boolToChangeTo}
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

export const clearQuizForm = () => {
    return {type: CLEAR_QUIZ_FORM}
}