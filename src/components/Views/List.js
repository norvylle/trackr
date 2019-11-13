import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Typography, Tooltip, Fab } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { update, remove, searchMulti, snapshotToArray} from '../../controller/';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionPanelDetails: {
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flex: 1,
    marginTop: theme.spacing(1),
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
})

function groupByDate(array){
  let obj = {}
  array.forEach((value)=>{
    if(obj[value.date] === undefined){
      obj[value.date] = [];
    }
    obj[value.date].push(value);
  })
  return obj
}

class List extends Component{
  constructor(props){
    super(props)
    this.state={
      all: null
    }
  }

  componentWillMount(){
    searchMulti({
      link: "check_ins/",
      child: "username",
      search: "user"
    }).on("value",function(snapshot){
      this.setState({all: groupByDate(snapshotToArray(snapshot))})
    }.bind(this))
  }

  handleEdit = (val) => {

  }

  handleDelete = (val) => {
    if(window.confirm("Delete this activity?")){
      remove({link: "check_ins/"+val.key})
      .then(()=>{this.forceUpdate()})
    }
  }

  render(){
    const { classes } = this.props;
    if(this.state.all === null){
      return(
        <div>
          Loading...
        </div>
      )
    }
    if(Object.entries(this.state.all).length === 0 && this.state.all.constructor === Object){
      return(
        <div>
          Empty.
        </div>
      )
    }
    return(
      <div className={classes.root}>
        {
          Object.keys(this.state.all).map((key, index)=>{
            return(
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary>
                  <Typography>
                    {key}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  {
                    this.state.all[key].map((val, index)=>{
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
                              {val.date}
                            </Typography>
                          </div>
                          <div className={classes.paperRightContainer}>
                            <Tooltip title="edit" aria-label="edit">
                              <Fab size="medium" aria-label="edit" className={classes.editDelete} onClick={() => this.handleEdit(val)}>
                                <EditIcon/>
                              </Fab>
                            </Tooltip>
                            <Tooltip title="delete" aria-label="delete">
                              <Fab size="medium" aria-label="delete" color="secondary" className={classes.editDelete} onClick={() => this.handleDelete(val)}>
                                <DeleteIcon/>
                              </Fab>
                            </Tooltip>
                          </div>
                        </Paper>
                      )
                    })
                  }
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);