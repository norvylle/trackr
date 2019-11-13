import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Tracker from './Tracker';
import List from './List';
import { Link } from '@material-ui/core';

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
  title: {
    flexGrow: 0.9,
    marginLeft: theme.spacing(2)
  },
  toolbars: {
    marginRight: theme.spacing(2),
  }
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
            <Typography variant="h5" noWrap className={classes.title}>
              Trackr
            </Typography>
            <Link href="/" color="inherit">
              <Typography variant="subtitle1" className={classes.toolbars}>
                  Home
              </Typography>
            </Link>
            <Link href="/activity" color="inherit">
              <Typography variant="subtitle1" className={classes.toolbars}>
                Activity
              </Typography>
            </Link>
            <Link href="/report" color="inherit">
              <Typography variant="subtitle1" className={classes.toolbars}>
                Report
              </Typography>
            </Link>
            <Link href="/login" color="inherit">
              <Typography variant="subtitle1" className={classes.toolbars}>
                Sign out
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Router>
            <div className={classes.toolbar}>
              <Route exact={true} path="/" component={Tracker}/>
              <Route exact={true} path="/activity" component={List}/>
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