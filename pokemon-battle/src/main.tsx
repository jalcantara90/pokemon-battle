import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Context from './Context';

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
