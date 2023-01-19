import Header from "./components/Header"
import {createStore} from "redux"
import {Provider} from "react-redux"
import reducer from "./state/reducers"
import QuizList from "./components/quiz-components/QuizList"

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <QuizList></QuizList>
      </div>
    </Provider>
  );
}

export default App;
