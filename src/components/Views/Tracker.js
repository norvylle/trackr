import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DatePicker } from '@material-ui/pickers';
import { TextField, Button, Paper, Typography, Fab, Tooltip } from "@material-ui/core";
import CreatableSelect from 'react-select/creatable';
import DeleteIcon from '@material-ui/icons/Delete';
import { insert, remove, searchMulti, snapshotToArray, searchAll } from '../../controller'
import { connect } from 'react-redux';

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
  delete: {
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
      selector_tags: [],
      activity: ""
    }
  }

  handleSelect = (newValue) => {
    if(newValue === null){
      this.setState({tags: []})
    }else{
      this.setState({tags: [newValue]})
    }
  };

  handleCreateOption = (label) => {
    if(label[0] !== "#"){
      label = "#" + label.split(" ")[0]
    }
    this.setState({tags: [{label, value: label}]})
  }

  handleSubmit = () => {
    if(this.state.activity !== "" && this.state.tags.length > 0){
      insert({
        link: "check_ins/",
        data: {
          date: this.state.date.toDateString(),
          hours: parseFloat(this.state.hours),
          tag: this.state.tags[0].value,
          activity: this.state.activity,
          username: this.props.state.user.username
        }
      }).once('value', (snapshot) => {
        this.resetState()
      })
    }else{
      alert("Please fill in the missing fields.");
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

  handleDelete = (val) => {
    if(window.confirm("Delete this activity?")){
      remove({link: "check_ins/"+val.key})
      .then(()=>{this.forceUpdate()})
    }
  }

  componentWillMount(){
    searchMulti({
      link: "check_ins/",
      child: "username",
      search: this.props.state.user.username
    }).on("value",function(snapshot){
      this.setState({all: snapshotToArray(snapshot)})
    }.bind(this))

    searchAll({
      link: "check_ins/",
      child: "tag",
    }).on("value",function(snapshot){
      let arr =  new Set(snapshotToArray(snapshot).map((val)=>{return val.tag}))
      arr = Array.from(arr).map((val)=>{return {label: val, value: val}})
      this.setState({selector_tags: arr})
    }.bind(this))
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
            inputProps={{ min: "0.1", step: "0.1", max: "24" }}
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
            inputProps={{ maxLength: 40 }}
            value={this.state.activity}
            onChange={e => this.setState({activity: e.target.value})}
          />
          <CreatableSelect
            isClearable
            value={this.state.tags}
            onChange={this.handleSelect}
            options={this.state.selector_tags}
            onCreateOption={this.handleCreateOption}
            className={classes.selectField}
          />
          <Button variant="contained" color="primaryarray map to objects" className={classes.button} onClick={this.handleSubmit}>
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
                        {val.tag}
                      </Typography>
                      <Typography variant="subtitle2" className={classes.date}>
                        {val.date}
                      </Typography>
                    </div>
                    <div className={classes.paperRightContainer}>
                      <Tooltip title="delete" aria-label="delete">
                        <Fab size="medium" aria-label="delete" color="secondary" className={classes.delete} onClick={() => this.handleDelete(val)}>
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

const mapStateToProps = state => {
  return state
}

const TrackerPage = connect(mapStateToProps)(Tracker)

export default withStyles(styles)(TrackerPage);