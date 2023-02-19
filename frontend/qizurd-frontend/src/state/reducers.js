import { combineReducers } from "redux";
import {
  ACTIVE_USER,
  ADD_STUDENT_TO_QUIZ,
  DELETE_QUIZ_FROM_USER,
  DELETE_STUDENT_FROM_QUIZ,
  CHANGE_TEXT,
  CHANGE_QUIZ_TEXT,
  EDIT_QUIZ_QUESTION,
  ADD_QUIZ_QUESTION,
  CLEAR_QUIZ_FORM,
  CLEAR_STUDENT_FORM,
  ADD_STUDENT_TO_USER,
  ADD_QUIZ_TO_USER,
  FILL_STUDENT_FORM,
  FILL_QUIZ_FORM,
  DELETE_QUESTION_FROM_QUIZ,
  DELETE_STUDENT_FROM_USER,
  GET_QUESTION,
  SENT_RESULT
} from "./action-types"

const RENDER_ID_MAX = 1000000

let emptyUser = {
  userName: "",
  id: "",
  quizzes: [],
  students: []
}

let emptyQuizForm = {
  id: null,
  quizTitle: "",
  description: "",
  questions: [],
  students: []
}

let emptyStudentForm = {
  firstName: "",
  lastName: "",
  id: null
}

let emptyQuestion = {
  questionText: "",
  answer: "",
  id: ""
}

const user = (state = emptyUser, action) => {
  switch(action.type){
    case ACTIVE_USER:
      return action.payload
    case ADD_STUDENT_TO_USER:
      return action.payload
    case ADD_QUIZ_TO_USER:
      return {...state,quizzes: action.payload}
    case DELETE_QUIZ_FROM_USER:
      return {...state,quizzes: action.payload}
    case DELETE_STUDENT_FROM_USER:
      return action.payload
    case SENT_RESULT:
      console.log("hit reducer",action.payload)
      return action.payload
    default:
      return state
  }
}

const quizForm = (state = emptyQuizForm, action) => {
  switch(action.type){
    case CHANGE_QUIZ_TEXT:
      return {...state, [action.payload.inputid]: action.payload.inputValue}
    case ADD_QUIZ_QUESTION:
      console.log(state)
      const updatedQuizQuestions = [...state.questions,{renderId: Math.floor(Math.random() * RENDER_ID_MAX),questionText:"", answer:""}]
      return {...state,questions:updatedQuizQuestions}
    case EDIT_QUIZ_QUESTION:
      const updatedArr = [...state.questions]
      updatedArr.forEach(el => {
        if(el.renderId === parseInt(action.payload.id)){
          el[action.payload.inputType] = action.payload.inputValue
        }
      })
      return {...state,questions:updatedArr}
    case ADD_STUDENT_TO_QUIZ:
      return {...state, students: [...state.students, action.payload]}
    case DELETE_STUDENT_FROM_QUIZ:
      return {...state, students: [...state.students.filter(el => action.payload !== el.id)]}
    case DELETE_QUESTION_FROM_QUIZ:
      return {...state, questions: [...state.questions.filter(el => action.payload !== el.renderId)]}
    case CLEAR_QUIZ_FORM:
      return emptyQuizForm
    case FILL_QUIZ_FORM:
      return action.payload
    default:
      return state
  }
}

const studentForm = (state = emptyStudentForm, action) => {
  switch(action.type){
    case CHANGE_TEXT:
      return {...state, [action.payload.inputid]: action.payload.inputValue}
    case FILL_STUDENT_FORM: 
      return action.payload
    case CLEAR_STUDENT_FORM:
      return emptyStudentForm 
    default:
      return state
  }
}

const question = (state = emptyQuestion, action) => {
  switch(action.type){
    case GET_QUESTION:
      console.log("reducer",action.payload)
      return action.payload
    default:
      return state
  }
}

export default combineReducers({user,quizForm,studentForm,question})