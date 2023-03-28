import axios from "axios"
import {
    CHANGE_TEXT,
    CHANGE_QUIZ_TEXT,
    ACTIVE_USER,
    ADD_STUDENT_TO_QUIZ,
    ADD_QUIZ_TO_USER,
    DELETE_QUIZ_FROM_USER,
    DELETE_STUDENT_FROM_QUIZ,
    EDIT_QUIZ_QUESTION,
    ADD_QUIZ_QUESTION,
    CLEAR_QUIZ_FORM,
    CLEAR_STUDENT_FORM,
    ADD_STUDENT_TO_USER,
    FILL_STUDENT_FORM,
    FILL_QUIZ_FORM,
    DELETE_QUESTION_FROM_QUIZ,
    DELETE_STUDENT_FROM_USER,
    GET_QUESTION,
    SENT_RESULT,
    SET_ACTIVE_QUIZ
} from "./action-types"

const rootHTML = "https://qizurd-backend-robsim37.vercel.app/";

export const postQuiz = (quiz) => dispatch => {
    axios.post(`${rootHTML}quizzes`,quiz).then(res => {
        console.log("here", res.data)
        dispatch({type:ADD_QUIZ_TO_USER,payload:res.data})
    }).catch(err => console.log(err))
}

export const postStudent = (student) => dispatch => {
    console.log("post request obj:",student)
    axios.post(`${rootHTML}students`,student).then(res => {
        dispatch({type:ADD_STUDENT_TO_USER,payload:res.data})
    }).catch(err => console.log(err))
}

export const deleteQuiz = (params) => dispatch => {
    axios.delete(`${rootHTML}quizzes/${params.userId}/${params.quizId}`).then(res => {
        dispatch({type:DELETE_QUIZ_FROM_USER,payload:res.data})
    }).catch(err => console.log(err)) 
}

export const deleteStudent = (params) => dispatch => {
    axios.delete(`${rootHTML}students/${params.userId}/${params.studentId}`).then(res => {
        dispatch({type:DELETE_STUDENT_FROM_USER,payload:res.data})
    }).catch(err => console.log(err))
}

export const getQuestion = (params) => dispatch => {
    axios.get(`${rootHTML}questions/random/${params.userId}/${params.quizId}/${params.studentId}`).then(res => {
        dispatch({type:GET_QUESTION,payload:res.data})
    }).catch(err => console.log(err))
}

export const sendResult = (params) => dispatch => {
    axios.post(`${rootHTML}students/answer`,params).then(res => {
        dispatch({type:SENT_RESULT,payload:res.data})
    }).catch(err => console.log(err))
}

export const activeUser = (user) => {
    return {type: ACTIVE_USER, payload: user}
}

export const changeInputText = (inputid,inputValue) =>  {
    return {type: CHANGE_TEXT, payload: {inputid,inputValue}}
}

export const changeQuizText = (inputid,inputValue) => {
    return {type:CHANGE_QUIZ_TEXT, payload:{inputid,inputValue}}
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

export const setActiveQuiz = (quizId) => {
    return {type:SET_ACTIVE_QUIZ,payload:quizId}
}