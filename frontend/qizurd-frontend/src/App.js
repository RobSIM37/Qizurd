import Header from "./components/Header"
import {Routes,Route} from "react-router-dom"
import {connect} from "react-redux"
import QuizList from "./components/quiz-components/QuizList"
import QuizView from "./components/quiz-components/QuizView"
import HamburgerMenu from "./components/HamburgerMenu"

function App(props) {
  return (
      <div className="App">
        <Header></Header>
        {props.menuOpen && <HamburgerMenu/>}
        <Routes>
          <Route path="/quizzes" element={<QuizList/>}/>
          <Route path="/quizzes/:id" element={<QuizView/>}/>
        </Routes>
      </div>
  );
}

const mapStateToProps = state => ({
  menuOpen: state.menu.menuOpen
})

export default connect(mapStateToProps,null)(App);
