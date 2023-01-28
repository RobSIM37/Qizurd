import { combineReducers } from "redux";
import {
  ACTIVE_USER,
  CARD_CLICKED,
  REMOVE_STUDENT,
  TOGGLE_MENU,
  ADD_STUDENT,
  DELETE_QUIZ,
  DELETE_STUDENT
} from "./action-types"

// need to eventually add list of action types here.
// example: INPUT_CHANGE. see sprint 10 sprint challenge


//dummy data, data structure is not set in stone, and there is plenty to rework

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

let initialStudents = [
    {name: "Alex Jones",id:1,quizzes:[]},
    {name: "Freddy Mercury",id:2,quizzes:[]},
    {name: "Walter Disney",id:3,quizzes:[]},
    {name: "Tony Stark",id:4,quizzes:[]},
    {name: "Jonathon Coulton",id:5,quizzes:[]},
    {name: "Arther Dent",id:6,quizzes:[]},
    {name: "Donna Noble",id:7,quizzes:[]},
    {name: "John Smith",id:8,quizzes:[]}
  ]

let sampleQuestion = {
    question: "sample question",
    answer1: "sample 1",
    answer2: "sample 2",
    answer3: "sample 3",
    answer4: "sample 4",
  }

let initialQuizzes = [
    {quizTitle:"100 facts about Monkeys!",id:1,description:"This is a description",questions:[sampleQuestion,sampleQuestion,sampleQuestion],students:[...initialStudents]},
    {quizTitle:"How to know your monkey is plotting something.",id:2,description:"this is an even longer description",questions:[sampleQuestion],students:[...initialStudents]},
    {quizTitle:"How to prevent monkey theft.",id:3,description:"we're gonna see how long we can make these without ruining how the card looks",questions:[sampleQuestion],students:[...initialStudents]},
    {quizTitle:"signs your monkey has taken your identity",id:4,description:"the quick brown fox jumped the quick brown fox jumped the quick brown fox jumped the quick brown fox jumped the quick brown fox jumped",questions:[sampleQuestion],students:[...initialStudents]},
    {quizTitle:"banana",id:5,description:"bananananannanananananannanaanananananananananananaa",questions:[sampleQuestion],students:[{name: "Alex Jones",id:1,quizzes:[]}]},
]

const user = (state = emptyUser, action) => {
  switch(action.type){
    case ACTIVE_USER:
      return action.payload
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

const students = (state = initialStudents, action) => {
  switch(action.type){
    case REMOVE_STUDENT:
      console.log(state)
      const newArr = state.filter(el => el.id !== parseInt(action.payload))
       return newArr
    case ADD_STUDENT:
        console.log(action.payload)
        const objFromData = initialStudents.filter(el => el.id === parseInt(action.payload))[0]
        console.log(objFromData)
        return [...state, objFromData]
    case DELETE_STUDENT:
        return state.filter(el => el.id !== parseInt(action.payload))
    default:
      return state
  }
}

const quizzes = (state = initialQuizzes, action) => {
  switch(action.type){
    case CARD_CLICKED:
      console.log(action.payload)
      return state
    case DELETE_QUIZ:
      return state.filter(el => el.id !== parseInt(action.payload))
    default:
      return state
  }
}

export default combineReducers({user,menu,students,quizzes})