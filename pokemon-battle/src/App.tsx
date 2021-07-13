import React from 'react'
import './App.css'
import { TrainerComponent } from './trainer/TrainerComponent';
import { Router, Link } from '@reach/router';
import {BattleComponent} from './battle/BattleComponent';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Create trainer</Link>
        <Link to="battle">Battle</Link>
      </nav>
      <Router>
        <TrainerComponent path="/" />
        <BattleComponent path="battle" />
      </Router>
    </div>
  )
}

export default App
