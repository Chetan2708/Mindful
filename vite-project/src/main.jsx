import React from 'react'
import ReactDOM from "react-dom";
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store.js';
import { Provider } from 'react-redux';

// Extend the Chakra UI theme
const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white', 
      },
    },
  },
});
ReactDOM.render(
    
      <ChakraProvider theme={customTheme}>
           <Provider store={store}>
        <App />
           </Provider>
      </ChakraProvider>
    
  ,
  document.getElementById('root')
);
