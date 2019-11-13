import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Login, Create, Home } from './components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider } from 'react-redux';
import { store, persistor } from './controller/index';
import { PersistGate } from 'redux-persist/integration/react'


function App() {
  useEffect(() => {
    document.title = "Trackr"
 }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div>
            <Router>
              <div>
                <Route exact={true} path="/login" component={Login}/>
                <Route exact={true} path="/create" component={Create}/>
                <Route exact={true} path="/" component={Home}/>
                <Route exact={true} path="/activity" component={Home}/>
                <Route exact={true} path="/report" component={Home}/>
              </div>
            </Router>
          </div>
        </MuiPickersUtilsProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
