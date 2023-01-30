import {
    CHANGE_TEXT,
    ACTIVE_USER,
    FILL_QUIZ_STATE,
    FILL_STUDENT_STATE,
    CARD_CLICKED,
    TOGGLE_MENU,
    ADD_STUDENT_TO_QUIZ,
    DELETE_QUIZ,
    DELETE_STUDENT
} from "./action-types"



export const activeUser = (user) => {
    return {type: ACTIVE_USER, payload: user}
}

export const fillQuizState = (quizzes) => {
    return {type: FILL_QUIZ_STATE, payload: quizzes}
}

export const fillStudentState = (students) => {
    return {type: FILL_STUDENT_STATE, payload: students}
}

export const changeQuizText = (inputid,inputValue) =>  {
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

export const deleteQuiz = (quizid) => {
    return {type: DELETE_QUIZ,payload:quizid}
}

export const deleteStudent = (studentid) => {
    return {type: DELETE_STUDENT,payload:studentid}
}