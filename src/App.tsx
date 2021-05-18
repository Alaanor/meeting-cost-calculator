import React from 'react';
import './App.css';
import CostCalculator from "./components/cost-calculator";

function App() {
  return (
    <div className="App">
      <h1>Meeting cost calculator</h1>
      <div className="Card">
        <CostCalculator className="CostCalculator"/>
      </div>
    </div>
  );
}

export default App;
