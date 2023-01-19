import Header from "./components/Header"
import {createStore} from "./redux"
import {Provider} from "react-redux"
import {reducer} from "./state/reducers"

store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
      </div>
    </Provider>
  );
}

export default App;
