import {
    USER_REGISTER,
    USER_LOGIN,
    CARD_CLICKED,
    TOGGLE_MENU,
    REMOVE_STUDENT,
    ADD_STUDENT,
    DELETE_QUIZ,
    DELETE_STUDENT
} from "./action-types"
import axios from "axios"



export const userLogin = (loginData) => {
    return {type: USER_LOGIN, }
}

export const userRegister = () => dispatch => (registerData => {
    axios.post("localhost:8020/register",registerData).then(res => {
        dispatch({type: USER_REGISTER, payload: res.data})
    })
})

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