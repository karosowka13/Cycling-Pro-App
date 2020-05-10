import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import WelcomPage from './containers/WelcomPage/WelcomPage';

function App() {
  return (
    <Router>
      <div className="App">
        <WelcomPage />
      </div>
    </Router>
  );
}

export default App;
