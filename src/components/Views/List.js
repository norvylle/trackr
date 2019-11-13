import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Typography, Tooltip, Fab, Modal } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { update, remove, searchMulti, snapshotToArray} from '../../controller/';

const styles = theme => ({
  panel: {
    width: "500px",
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
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  hashtags: {
    color: "blue"
  },
  date: {
    color: "gray"
  },
  paperLeftContainer: {
    width: "70%"
  },
  paperRightContainer: {
    width: "30%"
  },
  editDelete: {
    marginRight: theme.spacing(1.5)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
      all: null,
      open: false
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
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleDelete = (val) => {
    if(window.confirm("Delete this activity?")){
      remove({link: "check_ins/"+val.key})
      .then(()=>{this.forceUpdate()})
    }
  }

  render(){
    const { classes } = this.props;
    // if(Object.entries(this.state.all).length === 0 && this.state.all.constructor === Object){
    //   return(
    //     <div>
    //       Empty.
    //     </div>
    //   )
    // }
    return(
      <div>
        <Typography variant="h4" style={{ marginBottom: "2rem"}}>
          Activity List
        </Typography>
        {
          this.state.all === null ? <div>Loading...</div> :
          Object.keys(this.state.all).map((key, index)=>{
            return(
              <ExpansionPanel key={index} className={classes.panel}>
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
                            <Typography variant="subtitle1" component="p">
                              {val.activity+", "+val.hours+(val.hours > 1 ? " hrs" : " hr")}
                            </Typography>
                            <Typography component="p" className={classes.hashtags}>
                              {val.tag}
                            </Typography>
                            <Typography variant="caption" className={classes.date}>
                              {val.date}
                            </Typography>
                          </div>
                          <div className={classes.paperRightContainer}>
                            <Tooltip title="edit" aria-label="edit">
                              <Fab size="small" aria-label="edit" className={classes.editDelete} onClick={() => this.handleEdit(val)}>
                                <EditIcon/>
                              </Fab>
                            </Tooltip>
                            <Tooltip title="delete" aria-label="delete">
                              <Fab size="small" aria-label="delete" color="secondary" className={classes.editDelete} onClick={() => this.handleDelete(val)}>
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <div className={classes.modalPaper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </div>
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);