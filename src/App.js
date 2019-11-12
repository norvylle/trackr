import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Login, Create, Home } from './components';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Route exact={true} path="/login" component={Login}/>
          <Route exact={true} path="/create" component={Create}/>
          <Route exact={true} path="/" component={Home}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
