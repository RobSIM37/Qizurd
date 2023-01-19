import logo from './logo.svg';
import './App.css';

let students = [
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

let quizzes = [
  {quizTitle:"100 facts about Monkeys!",id:1,desription:"",questions:[sampleQuestion]},
  {quizTitle:"How to know your monkey is plotting something.",id:2,desription:"",questions:[sampleQuestion]},
  {quizTitle:"How to prevent monkey theft.",id:3,desription:"",questions:[sampleQuestion]},
  {quizTitle:"signs your monkey has taken your identity",id:4,desription:"",questions:[sampleQuestion]},
  {quizTitle:"banana",id:5,desription:"",questions:[sampleQuestion]},
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
