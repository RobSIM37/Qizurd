import { combineReducers } from "redux";
import {
  ACTIVE_USER,
  // FILL_QUIZ_STATE,
  // FILL_STUDENT_STATE,
  // CARD_CLICKED,
  TOGGLE_MENU,
  ADD_STUDENT_TO_QUIZ,
  // DELETE_QUIZ,
  DELETE_STUDENT_FROM_QUIZ,
  CHANGE_TEXT,
  EDIT_QUIZ_QUESTION,
  ADD_QUIZ_QUESTION,
  CLEAR_QUIZ_FORM,
  ADD_STUDENT_TO_USER
} from "./action-types"



let emptyUser = {
  userName: "",
  id: "",
  quizzes: [],
  students: []
}

let hamburgerMenu = {
  menuSelections:
  ["Create Quiz",
  "Edit Quiz",
  "Delete Quiz",
  "Create Student",
  "Edit Student",
  "Delete Student",
  "Close"],
  menuOpen:false
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

const user = (state = emptyUser, action) => {
  switch(action.type){
    case ACTIVE_USER:
      return action.payload
    case ADD_STUDENT_TO_USER:
      console.log("hits the reducer")
      return {...state,students:action.payload}
    default:
      return state
  }
}

const quizForm = (state = emptyQuizForm, action) => {
  switch(action.type){
    case CHANGE_TEXT:
      return {...state, [action.payload.inputid]: action.payload.inputValue}
    case ADD_QUIZ_QUESTION:
      return {...state,questions:[...state.questions,{id:"",title:"",answer:""}]}
    case EDIT_QUIZ_QUESTION:
      const questionToEdit = state.questions[action.payload.id] 
      questionToEdit[action.payload.inputType] = action.payload.inputValue
      state.questions[action.payload.id] = questionToEdit
      return {...state,questions:[...state.questions]}
    case ADD_STUDENT_TO_QUIZ:
      return {...state, students: [...state.students, action.payload]}
    case DELETE_STUDENT_FROM_QUIZ:
      return {...state, students: [...state.students.filter(el => action.payload !== el.id)]}
    case CLEAR_QUIZ_FORM:
      return emptyQuizForm
    default:
      return state
  }
}

const menu = (state = hamburgerMenu, action) => {
  switch(action.type){
    case TOGGLE_MENU:
      return {
        ...state,
        menuOpen: action.payload
      }
    default:
      return state    
  }
}

const studentForm = (state = emptyStudentForm, action) => {
  switch(action.type){
    case CHANGE_TEXT:
      return {...state, [action.payload.inputid]: action.payload.inputValue} 
    default:
      return state
  }
}

// const userStudents = (state = initialStudents, action) => {
//   switch(action.type){
//     case FILL_STUDENT_STATE:
//       return action.payload
//     default:
//       return state
//   }
// }

// const quizzes = (state = initialQuizzes, action) => {
//   switch(action.type){
//     case FILL_QUIZ_STATE:
//       return action.payload
//     case CARD_CLICKED:
//       console.log(action.payload)
//       return state
//     case DELETE_QUIZ:
//       return state.filter(el => el.id !== parseInt(action.payload))
//     default:
//       return state
//   }
// }

export default combineReducers({user,quizForm,studentForm,menu})