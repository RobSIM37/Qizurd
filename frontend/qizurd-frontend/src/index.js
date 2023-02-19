import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
  <ThemeProvider theme={theme}>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </ThemeProvider>
  
);
