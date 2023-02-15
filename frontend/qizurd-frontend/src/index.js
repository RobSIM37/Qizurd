import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import reducer from './state/reducers';
import thunk from "redux-thunk"
import { ThemeProvider, createTheme } from '@mui/material';

const store = createStore(reducer, applyMiddleware(thunk))

const theme = createTheme({
  palette: {
    primary: {
      main: "#384D48"
    },
    background:{
      default: "#567670"
    }
  },
  typography: {
    fontFamily: "'Vollkorn', serif",
    headerFont: {
      fontFamily: "'Vollkorn', serif"
    },
    h1: {
      fontSize: "3rem"
    }
  },
  spacing: 10
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //BrowserRouter wraps the App to allow for routing
  <ThemeProvider theme={theme}>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
