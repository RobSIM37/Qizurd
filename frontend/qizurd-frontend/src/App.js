import Header from "./components/Header"
import {Routes,Route,useNavigate} from "react-router-dom"
import {createStore} from "redux"
import {Provider} from "react-redux"
import reducer from "./state/reducers"
import QuizList from "./components/quiz-components/QuizList"
import QuizView from "./components/quiz-components/QuizView"

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/quizzes" element={<QuizList/>}/>
          <Route path="/quizzes/:id" element={<QuizView/>}/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
