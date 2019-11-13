import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login, searchMulti, insert, snapshotToArray } from '../../controller'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component{
  constructor(props){
    super(props)
    this.state={
      username: "",
      password: "",
      confirm_password: ""
    }
  }

  handleSubmit(){
    if(this.state.username === "" || this.state.password === "" || this.state.confirm_password === ""){
      alert("Please fill in the missing fields.");
    }else{
      if(this.state.password !== this.state.confirm_password){
        alert("Password and Password Confirmation doesn't match");
      }else{
        searchMulti({
          link: "users/",
          child: "username",
          search: this.state.username
        }).once('value',function(snapshot){
          if(snapshot.exists()){
            alert("Username already exists.");
          }else{
            insert({
              link: "users/",
              data: {
                username: this.state.username,
                password: this.state.password
              }
            }).once('value',function(snapshot){
              alert("Account creation successful.")
              this.props.dispatch(login(snapshotToArray(snapshot)[0]))
            }.bind(this))
          }
        }.bind(this))
      }
    }
  }

  render(){
    const { classes } = this.props;
    if(this.props.state.user !== null){
      return <Redirect to='/'  />
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HistoryOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="standard"
                  required
                  onChange={e=>{this.setState({username: e.target.value})}}
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  onChange={e=>{this.setState({password: e.target.value})}}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  onChange={e=>{this.setState({confirm_password: e.target.value})}}
                  fullWidth
                  name="password-confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password-confirm"
                  autoComplete="password-confirmation"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>{this.handleSubmit()}}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return state
}

const SignUpPage = connect(mapStateToProps)(SignUp)

export default withStyles(styles)(SignUpPage);