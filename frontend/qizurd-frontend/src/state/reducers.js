import { combineReducers } from "redux";

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
    {quizTitle:"100 facts about Monkeys!",id:1,desription:"",questions:[sampleQuestion]},
    {quizTitle:"How to know your monkey is plotting something.",id:2,desription:"",questions:[sampleQuestion]},
    {quizTitle:"How to prevent monkey theft.",id:3,desription:"",questions:[sampleQuestion]},
    {quizTitle:"signs your monkey has taken your identity",id:4,desription:"",questions:[sampleQuestion]},
    {quizTitle:"banana",id:5,desription:"",questions:[sampleQuestion]},
]

const students = (state = initialStudents, action) => {
    return state
}

const quizzes = (state = initialQuizzes, action) => {
    return state
}

export default combineReducers({students,quizzes})