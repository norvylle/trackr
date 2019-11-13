import React, { Component } from "react";
import { searchMulti, snapshotToArray } from '../../controller/';
import { TagCloud } from "react-tagcloud";
import { Tooltip, Typography } from "@material-ui/core";
import { connect } from 'react-redux';

function cloudTag(array){
  let obj = {}
  array.forEach((value)=>{
    if(obj[value.tag] === undefined){
      obj[value.tag] = [];
    }
    obj[value.tag].push(value);
  })
  return Object.keys(obj).map((val)=> {
    let total = obj[val].reduce((prev, current)=>{return { hours: parseFloat(prev.hours) + parseFloat(current.hours)} })
    return {value: val, count: total.hours.toFixed(2) } 
  })
  
}

const customRenderer = (tag, size, color) => {
  const fontSize = size + 'px'
  const key = tag.key || tag.value
  const style = { ...styles, color, fontSize }
  return (
    <Tooltip title={tag.count} aria-label="count">
      <span className="tag-cloud-tag" style={style} key={key}>
        {tag.value}
      </span>
    </Tooltip>
  )
}

const styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block',
}

class Report extends Component {
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
      search: this.props.state.user.username
    }).on("value",function(snapshot){
      this.setState({all: cloudTag(snapshotToArray(snapshot))})
    }.bind(this))
  }
  
  render() {
    return (
      <div>
        <Typography variant="h4" style={{ marginBottom: "2rem"}}>
          Word Cloud Visualization
        </Typography>
        {
          this.state.all === null ? <div>Loading...</div> :
          <TagCloud
          minSize={20}
          maxSize={80}
          tags={this.state.all}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
          renderer={customRenderer}
        />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const ReportPage = connect(mapStateToProps)(Report)

export default ReportPage;