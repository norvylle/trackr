import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Login, Create, Home } from './components';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Route exact={true} path="/" component={Login}/>
          <Route exact={true} path="/create" component={Create}/>
          <Route exact={true} path="/home" component={Home}/>
          {/*          
          <Route exact={true} path="/user/view" component={View}/>
          
          <Route exact={true} path="/user/add" component={Add}/>
          <Route exact={true} path="/user/edit" component={Home}/>
          <Route exact={true} path="/user/delete" component={Home}/> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
