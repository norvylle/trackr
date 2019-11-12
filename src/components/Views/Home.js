import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Tracker from './Tracker';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(8, 2),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 0.5,
    padding: theme.spacing(3),
  },
});

class Home extends Component{
  
  render(){
    const { classes } = this.props;
    // if(false){
    //   return <Redirect to='/login'  />
    // }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              Trackr
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Router>
            <div className={classes.toolbar}>
              <Route exact={true} path="/" component={Tracker}/>
            </div>
          </Router>
        </main>
      </div>
    );
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);