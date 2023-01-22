import {
    CARD_CLICKED,
    TOGGLE_MENU,
    REMOVE_STUDENT,
    ADD_STUDENT
} from "./action-types"

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