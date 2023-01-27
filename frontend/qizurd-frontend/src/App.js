import "./App.css"
import Header from "./components/Header"
import {Routes,Route} from "react-router-dom"
import {connect} from "react-redux"
import QuizList from "./components/quiz-components/QuizList"
import QuizView from "./components/quiz-components/QuizView"
import CreateQuiz from "./components/form-components/CreateQuiz"
import EditQuiz from "./components/form-components/EditQuiz"
import CreateStudent from "./components/form-components/CreateStudent"
import StudentList from "./components/student-components/StudentList"
import HamburgerMenu from "./components/HamburgerMenu"


function App(props) {

  return (
      <div className="App">
        <Header></Header>
        {props.menuOpen && <HamburgerMenu/>}
        <Routes>
          <Route path="/quizzes" element={<QuizList clickHandlerid={"showDetails"}/>}/>
          <Route path="/quizzes/:id" element={<QuizView/>}/>
          <Route path="quiz/create-quiz" element={<CreateQuiz/>}/>
          <Route path="/quiz/edit-quiz" element={<QuizList clickHandlerid={"editQuiz"}/>}/>
          <Route path="/quiz/edit-quiz/:id" element={<EditQuiz/>}/>
          <Route path="/quiz/delete-quiz" element={<QuizList clickHandlerid={"deleteQuiz"}/>}/>
          <Route path="/student/create-student" element={<CreateStudent/>}/>
          <Route path="/student/delete-student" element={<StudentList clickHandlerid={"deleteStudent"}/>}/>
        </Routes>
      </div>
  );
}

const mapStateToProps = state => ({
  menuOpen: state.menu.menuOpen
})

export default connect(mapStateToProps,null)(App);
