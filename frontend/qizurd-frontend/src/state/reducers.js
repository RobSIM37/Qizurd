import { combineReducers } from "redux";
import {
  CARD_CLICKED
} from "./action-types"

// need to eventually add list of action types here.
// example: INPUT_CHANGE. see sprint 10 sprint challenge

let initialStudents = [
    {name: "Alex Jones",id:1,quizzes:[],},
    {name: "Freddy Mercury",id:2,quizzes:[],},
    {name: "Walter Disney",id:3,quizzes:[],},
    {name: "Tony Stark",id:4,quizzes:[],},
    {name: "Jonathon Coulton",id:5,quizzes:[],},
    {name: "Arther Dent",id:6,quizzes:[],},
    {name: "Donna Noble",id:7,quizzes:[],},
    {name: "John Smith",id:8,quizzes:[],}
  ]

let sampleQuestion = {
    question1: "sample 1",
    question2: "sample 2",
    question3: "sample 3",
    question4: "sample 4",
  }

let initialQuizzes = [
    {quizTitle:"100 facts about Monkeys!",id:1,description:"This is a description",questions:[sampleQuestion],pressed:false},
    {quizTitle:"How to know your monkey is plotting something.",id:2,description:"this is an even longer description",questions:[sampleQuestion],pressed:false},
    {quizTitle:"How to prevent monkey theft.",id:3,description:"we're gonna see how long we can make these without ruining how the card looks",questions:[sampleQuestion],pressed:false},
    {quizTitle:"signs your monkey has taken your identity",id:4,description:"t e s t i n g  t h e  l e n g t h  I  c a n  g o  w i t h  t h e s e",questions:[sampleQuestion],pressed:false},
    {quizTitle:"banana",id:5,description:"bananananannanananananannanaanananananananananananaa",questions:[sampleQuestion],pressed:false},
]

const students = (state = initialStudents, action) => {
    return state
}

const quizzes = (state = initialQuizzes, action) => {
  switch(action.type){
    case CARD_CLICKED:
      console.log(action.payload)
      return state
    default:
      return state
  }
}

export default combineReducers({students,quizzes})