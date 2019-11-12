import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import { TextField, Button, Paper, Typography, Fab, Tooltip } from "@material-ui/core";
import CreatableSelect from 'react-select/creatable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const tags = [ {label:'#hello', value: '#hello'}, {label: '#world', value: '#world'}]

const styles = theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flex: 1,
    marginTop: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  textAreaField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 320,
  },
  dateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  selectField: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 320,
  },
  button: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(15)
  },
  leftContainer: {
    width: "40%"
  },
  rightContainer: {
    width: "60%"
  },
  trackerContainer: {
    display: "flex",
    flex: 1
  },
  hashtags: {
    color: "blue"
  },
  date: {
    color: "light gray"
  },
  paperLeftContainer: {
    width: "80%"
  },
  paperRightContainer: {
    width: "20%"
  },
  editDelete: {
    marginRight: theme.spacing(1.5)
  }
});

class Tracker extends Component{
  constructor(props){
    super(props)
    this.state={
      all: [],
      date: new Date(),
      hours: 0.1,
      tags: [],
      activity: ""
    }
  }

  handleSelect = (newValue) => {
    if(newValue === null){
      newValue = []
    }
    this.setState({tags: newValue})
  };

  handleCreateOption = (label) => {
    if(label[0] !== "#"){
      label = "#" + label.split(" ")[0]
    }
    this.setState({tags: [...this.state.tags, {label, value: label}]})
  }

  handleSubmit = () => {
    if(this.state.activity !== "" && this.state.tags.length > 0){
      this.setState({
        all: [
          ...this.state.all, 
          { 
            date: this.state.date,
            hours: this.state.hours,
            tags: this.state.tags,
            activity: this.state.activity
          } 
        ]
      }, this.resetState)
    }else{
      alert("Please fill in missing fields");
    }
  }

  resetState = () => {
    this.setState({
      date: new Date(),
      hours: 0.1,
      tags: [],
      activity: ""
    })
  }

  handleEdit = (val, index) => {
    this.setState({
      date: val.date,
      hours: val.hours,
      tags: val.tags,
      activity: val.activity
    }, () => { 
      this.state.all.splice(index,1) //delete action
      this.forceUpdate()
    })
  }

  handleDelete = (val, index) => {
    if(window.confirm("Delete this activity?")){
      this.state.all.splice(index,1) //delete action
      this.forceUpdate()
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.trackerContainer}>
        <div className={classes.leftContainer}>
          <DatePicker
            margin="normal"
            label="Date"
            format="MM/dd/yyyy"
            value={this.state.date}
            onChange={e => this.setState({date: e})}
            className={classes.dateField}
            disableFuture
            autoOk
          />
          <TextField
            label="No. of Hours"
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            inputProps={{ min: "0.1", step: "0.1" }}
            value={this.state.hours}
            onChange={e => this.setState({hours: e.target.value})}
          />
          <TextField
            label="Activity"
            className={classes.textAreaField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 45 }}
            value={this.state.activity}
            onChange={e => this.setState({activity: e.target.value})}
          />
          <CreatableSelect
            isMulti
            value={this.state.tags}
            onChange={this.handleSelect}
            options={tags}
            onCreateOption={this.handleCreateOption}
            className={classes.selectField}
          />
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
        <div className={classes.rightContainer}>
            <Typography variant="h4">
              Activity List:
            </Typography>
            {
              this.state.all.map((val, index) => {
                return(
                  <Paper className={classes.paper} key={index}>
                    <div className={classes.paperLeftContainer}>
                      <Typography variant="h5" component="p">
                        {val.activity+", "+val.hours+(val.hours > 1 ? " hrs" : " hr")}
                      </Typography>
                      <Typography component="p" className={classes.hashtags}>
                        {val.tags.map(data => (data.value)).join(" ")}
                      </Typography>
                      <Typography variant="subtitle2">
                        {val.date.toDateString()}
                      </Typography>
                    </div>
                    <div className={classes.paperRightContainer}>
                      <Tooltip title="edit" aria-label="edit">
                        <Fab size="medium" aria-label="edit" className={classes.editDelete} onClick={() => this.handleEdit(val, index)}>
                          <EditIcon/>
                        </Fab>
                      </Tooltip>
                      <Tooltip title="delete" aria-label="delete">
                        <Fab size="medium" aria-label="delete" color="secondary" className={classes.editDelete} onClick={() => this.handleDelete(val, index)}>
                          <DeleteIcon/>
                        </Fab>
                      </Tooltip>
                    </div>
                  </Paper>
                )
              })
            }
        </div>
      </div>
    );
  }
}

Tracker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tracker);