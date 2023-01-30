import {
    CHANGE_TEXT,
    ACTIVE_USER,
    CARD_CLICKED,
    TOGGLE_MENU,
    REMOVE_STUDENT,
    ADD_STUDENT,
    DELETE_QUIZ,
    DELETE_STUDENT
} from "./action-types"
import axios from "axios"



export const activeUser = (user) => {
    return {type: ACTIVE_USER, payload: user}
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

export const removeStudent = (studentid) => {
    return {type: REMOVE_STUDENT,payload: studentid}
}

export const addStudent = (studentid) => {
    return {type: ADD_STUDENT,payload: studentid}
}

export const deleteQuiz = (quizid) => {
    return {type: DELETE_QUIZ,payload:quizid}
}

export const deleteStudent = (studentid) => {
    return {type: DELETE_STUDENT,payload:studentid}
}