import "./App.css"
import Header from "./components/Header"
import {Routes,Route} from "react-router-dom"
import {connect} from "react-redux"
import { CssBaseline } from "@mui/material"
import QuizList from "./components/quiz-components/QuizList"
import QuizDetails from "./components/quiz-components/QuizDetails"
import CreateQuiz from "./components/form-components/CreateQuiz"
import CreateStudent from "./components/form-components/CreateStudent"
import StudentList from "./components/student-components/StudentList"
import Loginpage from "./components/login-components/Loginpage"
import Registerpage from "./components/login-components/Registerpage"
import QuizQuestion from "./components/quiz-components/QuizQuestion"


function App(props) {

  return (
      <CssBaseline className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Loginpage/>}/>
          <Route path="/register" element={<Registerpage/>}/>
          <Route path="/quizzes" element={<QuizList clickHandlerid={"showDetails"}/>}/>
          <Route path="/quizzes/:id" element={<QuizDetails/>}/>
          <Route path="/quiz/create-quiz" element={<CreateQuiz/>}/>
          <Route path="/quiz/edit-quiz" element={<QuizList clickHandlerid={"editQuiz"}/>}/>
          <Route path="/student/create-student" element={<CreateStudent/>}/>
          <Route path="/student/edit-student" element={<StudentList clickHandlerid={"editStudent"}/>}/>
          <Route path="/quizzes/:id/:studentId" element={<QuizQuestion/>}/>
        </Routes>
      </CssBaseline>
  );
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps,null)(App);
